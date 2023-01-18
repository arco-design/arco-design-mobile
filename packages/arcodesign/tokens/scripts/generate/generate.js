const fs = require('fs-extra');
const path = require('path');
const rootPath = path.resolve(__dirname, '../../');
const { execSync } = require('child_process');

function getRem(px, baseFontSize) {
    const num = Math.round((px / Number(baseFontSize)) * 1000000) / 1000000;
    return num ? `${num}rem` : num;
}
function getDescTextByLang(text) {
    const texts = text.split(/\@\w+/g).map(val => val.trim());
    const langs = text.match(/\@\w+/g);
    if(!langs || texts.length < 2) {
        return {
            ch: text
        };
    }
    const langMap = {ch: texts[0] || texts[1]};
    const pos = texts.length - langs.length;
    langs.map((lang, index) => {
        const curLang = lang.slice(1);
        const curText = texts[pos + index];
        langMap[curLang] = (curLang in langMap) ? `${langMap[curLang]}} ${curText}` : curText;
    });
    return langMap;
}

function getDescInfoByCommentContent(comment) {
    if (/@ignore/.test(comment || '')) {
        return { ignore: true };
    }
    let desc = '';
    let override = '';
    const overrideReg = /\n\s*\*\s+@override\s([\s\S]*?)\n/;
    const match = (comment || '').match(overrideReg);
    if (match && match[1]) {
        override = getVarsKey(match[1].trim());
    }
    desc = comment.replace(overrideReg, '').replace(/\n\s*\*\s+/g, '').trim();
    const localeDesc = getDescTextByLang(desc);
    return { override, localeDesc, desc: localeDesc.ch};
}

function getTokenDescByComment(tokenName, appName, tokenContent, coreTokenContent) {
    const reg = new RegExp(`\\/\\*\\*(((?!\\*\\/)[\\s\\S])*)\\*\\/\\s*${tokenName}`);
    const match = tokenContent.match(reg);
    if (match && match[1]) {
        return getDescInfoByCommentContent(match[1]);
    } else if (appName !== 'arcodesign') {
        const coreMatch = coreTokenContent.match(reg);
        if (coreMatch && coreMatch[1]) {
            return getDescInfoByCommentContent(coreMatch[1]);
        }
    }
    return {
        desc: '',
        override: '',
    };
}

function formatDarkKey(key) {
    return `dark${key[0].toUpperCase()}${key.slice(1)}`;
}

function generateThemeVars(token) {
    // 因为允许后续覆盖，所以选择遍历两次
    const res = {};
    const globalReg = /^@global@(.*)$/;
    Object.entries(token).forEach(([key, value]) => {
        if (value === undefined) {
            throw new Error(`Variable ${key} is undefined.`);
        }
        if (typeof value === 'object') {
            value.light && (res[key] = value.light);
            value.dark && (res[formatDarkKey(key)] = value.dark);
        } else if (value.match(globalReg)) {
            const match = value.match(globalReg)[1];
            if (token[match] && typeof token[match] === 'object') {
                res[formatDarkKey(key)] = `@global@${formatDarkKey(match)}`;
            }
            res[key] = value;
        } else {
            res[key] = value;
        }
    });
    return res;
}

function getVarsKey(key) {
    return key.replace(/([A-Z])/g, (_, p1) => `-${p1.toLowerCase()}`).toLowerCase();
}

function fileTypeIncluded(outputFilter, type) {
    if (Array.isArray(outputFilter) && outputFilter.length) {
        return outputFilter.includes(type);
    }
    return true;
}

function generateToken({ appName = 'arcodesign', outputFilter } = {}) {
    const tokenRootPath = path.join(rootPath, 'src', appName);
    if (!fs.existsSync(tokenRootPath)) {
        return;
    }
    const coreTokenContent = fs.readFileSync(path.join(rootPath, 'src/arcodesign/default/index.js'), 'utf-8');
    const tokenOutputRootPath = path.join(rootPath, 'app', appName);
    fs.removeSync(tokenOutputRootPath);
    fs.mkdirpSync(tokenOutputRootPath);
    const themes = fs.readdirSync(tokenRootPath).filter(name => {
        return fs.lstatSync(path.join(tokenRootPath, name)).isDirectory();
    });
    const themeEntry = [];
    const tokenInfo = {};
    themes.forEach(theme => {
        tokenInfo[theme] = {};
        themeEntry.push(`exports.${theme} = require('./${theme}').default;`);
        const tokenPath = path.join(tokenRootPath, theme);
        const tokenOutputPath = path.join(tokenOutputRootPath, theme);
        fs.mkdirpSync(tokenOutputPath);
        const tokenFile = path.join(tokenPath, 'index.js');
        const tokenContent = fs.readFileSync(tokenFile, 'utf-8');
        delete require.cache[tokenFile];
        const token = generateThemeVars(require(tokenFile).default);
        let cssVars = '';
        let lessVars = '';
        let dtsVars = '';
        let jsVars = '';
        const allTokens = Object.keys(token);
        allTokens.forEach(key => {
            const remReg = /@getRem@([-\.\d]+)/g;
            const globalReg = /@global@(\S+)/g;
            const cssKey = getVarsKey(key);
            const lessValue = token[key]
                .replace(remReg, `~\`pxtorem($1)\``)
                .replace(globalReg, (_, $1) => `@${getVarsKey($1)}`);
            const staticValue = token[key]
                .replace(remReg, (_, $1) => getRem($1, token.baseFontSize))
                .replace(globalReg, (_, $1) => `${token[$1]}`);
            cssVars += `    --${cssKey}: ${token[key]
                .replace(remReg, `~\`pxtorem($1)\``)
                .replace(globalReg, (_, $1) => `var(--${getVarsKey($1)})`)};\n`;
            lessVars += `@${cssKey}: ${lessValue};\n`;
            dtsVars += `    '${cssKey}': string;\n`;
            jsVars += `    "${cssKey}": \`${staticValue}\`,\n`;
            const descInfo = getTokenDescByComment(key, appName, tokenContent, coreTokenContent);
            if (!descInfo.ignore) {
                tokenInfo[theme][key] = {
                    cssKey,
                    desc: descInfo.desc,
                    override: descInfo.override,
                    value: lessValue,
                    jsValue: token[key],
                    staticValue,
                    localeDesc: descInfo.localeDesc
                };
            }
        });
        tokenInfo[theme] = Object.keys(tokenInfo[theme]).sort().reduce(
            (obj, key) => {
                obj[key] = tokenInfo[theme][key];
                return obj;
            },
            {}
        );
        if (fileTypeIncluded(outputFilter, 'css')) {
            fs.writeFile(
                path.join(tokenOutputPath, 'css-variables.less'),
                `@import '../../../mixin/index.less';\n\n:root when (@use-css-vars = 1) {\n${cssVars}}\n`,
                () => console.log(`>>> [${appName}/${theme}] Token css generate finished`),
            );
        }
        if (fileTypeIncluded(outputFilter, 'less')) {
            fs.writeFile(
                path.join(tokenOutputPath, 'index.less'),
                `@import '../../../mixin/pxtorem.less';\n\n${lessVars}\n`,
                () => console.log(`>>> [${appName}/${theme}] Token less generate finished`),
            );
        }
        const humpName = appName.replace(/-/g, '').replace(/^(.)/, (_, p1) => p1.toUpperCase());
        const dtsContent = `export declare function getRem(px: number, baseFontSize: number): string;
export interface ${humpName}Token extends Record<string, string> {\n${dtsVars}}
declare const tokens: ${humpName}Token;
export default tokens;`;
        if (fileTypeIncluded(outputFilter, 'dts')) {
            fs.writeFile(path.join(tokenOutputPath, 'index.d.ts'), dtsContent, () => {
                console.log(`>>> [${appName}/${theme}] Token d.ts generate finished`);
            });
        }
        if (fileTypeIncluded(outputFilter, 'js')) {
            fs.writeFile(
                path.join(tokenOutputPath, 'index.js'),
                `export ${getRem.toString()}
    const tokens = {\n${jsVars}};\nexport default tokens;`,
                () => {
                    console.log(`>>> [${appName}/${theme}] Token js rewrite finished`);
                    execSync(`npx gulp --cwd ${rootPath} es6 --app ${appName}`);
                },
            );
        }
        if (fileTypeIncluded(outputFilter, 'json')) {
            fs.writeFile(path.join(tokenOutputPath, 'index.json'), JSON.stringify(tokenInfo[theme], null, 4), () => {
                console.log(`>>> [${appName}/${theme}] Token json generate finished`);
            });
        }
    });
    if (fileTypeIncluded(outputFilter, 'js')) {
        fs.writeFile(path.join(tokenOutputRootPath, 'index.js'), `${themeEntry.join('\n')}\n`, () => {
            console.log(`>>> [${appName}] Token entry generate finished`);
        });
    }
    return { tokenInfo };
}

module.exports = generateToken;
