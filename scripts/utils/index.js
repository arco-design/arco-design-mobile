const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');

const utils = {
    getFolderName(str) {
        return str.replace(/(.)([A-Z])/g, '$1-$2').toLowerCase();
    },

    getCompName(str, isSmallHump) {
        const base = isSmallHump ? str.replace(/^(.)/, (_, p1) => p1.toLowerCase()) : str.replace(/^(.)/, (_, p1) => p1.toUpperCase());
        return base.replace(/-(.)/g, (_, p1) => p1.toUpperCase());
    },
    // 单字首字母大写
    getUpperTitle(str) {
        return str.replace(/^\S/, s => s.toUpperCase());
    },
    // 短语首字母大写
    getUpperPhase(str) {
        return str.toLowerCase().replace(/\b(\w)|\s(\w)/g, s => s.toUpperCase());
    },
    getAllComps(compPath, compFilter = []) {
        return fs.readdirSync(compPath).filter(name => {
            // 内部工具js不处理
            const nameValid =
                !/^_/.test(name) && fs.lstatSync(path.join(compPath, name)).isDirectory();
            if (!nameValid) {
                return false;
            }
            if (compFilter && compFilter.length) {
                return compFilter.includes(name);
            }
            return name;
        });
    },
    getReadMeTextByLang(text, language = 'ch') {
        const defaultText = text.replace(/\@\w+\{.*?\}/g, '');
        const regTest = /\@(\w+)\{(.*?)\}/g;
        const textMap = {default: defaultText};
        while(r = regTest.exec(text)) {
            if(r.length < 3) {
                continue;
            }
            textMap[r[1]] =  r[1] in textMap ? `${textMap[r[1]]} ${r[2].trim()}`: r[2].trim();
        }
        return language in textMap || language !== 'ch' ? (textMap[language] || textMap.default) : textMap.default;
    },
    // 替换 less 变量.@{prefix} -> .arco
    replaceStyleLessVars(less) {
        return less.replace(/@\{prefix\}/g, 'arco');
    },
    formatTsCode(code) {
        return prettier.format(code, {
            parser: 'babel',
            tabWidth: 4
        });
    },
    formatLessCode(code) {
        return prettier.format(code, {
            parser: 'less',
            tabWidth: 4
        });
    }
};

module.exports = utils;
