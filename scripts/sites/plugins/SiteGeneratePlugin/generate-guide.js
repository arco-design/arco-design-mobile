const fs = require('fs-extra');
const path = require('path');
const generateChangelog = require('./generate-changelog');
const generateTokenPage = require('./generate-token-page');
const { renderSiteMdSource } = require('./helpers');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');

let readmeRoutes = {};

function generateGuide({
    guidePagePath,
    srcPath,
    tokenInfo,
    extraMdPath = path.resolve('sites/pc/static/md'),
    languages = ['ch']
} = {}) {
    readmeRoutes = {};
    // 解析其他文件夹下的md文件
    const siteMdNames = fs.existsSync(extraMdPath) ? fs.readdirSync(extraMdPath).filter(name => {
        return fs.lstatSync(path.join(extraMdPath, name)).isFile() && /\.md$/.test(name);
    }) : [];
    let mdEntryImportStr = '';
    let mdEntryDocsStr = '';
    // 组件库README
    languages.forEach(lang => {
        const fileSuffix = languageUtils.lang2SuffixMap[lang] || '';
        const dashFileSuffix= fileSuffix ? `-${fileSuffix}` : '';
        const upperFileSuffix = fileSuffix ? utils.getCompName(fileSuffix) : '';
        const dotFileSuffix = fileSuffix ? `.${fileSuffix}` : '';
        generateMdPage(path.join(srcPath, `README${dotFileSuffix}.md`), 'README', guidePagePath, lang, dashFileSuffix);
        mdEntryImportStr += `import ReadMe${upperFileSuffix} from './README${dashFileSuffix}';\n`;
        mdEntryDocsStr += `    'readme${dashFileSuffix}': ReadMe${upperFileSuffix},\n`;
    });

    // 组件库CHANGELOG
    const changelogPath = path.join(srcPath, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
        languages.forEach(lang => {
            const fileSuffix = languageUtils.lang2SuffixMap[lang] || '';
            const dashFileSuffix= fileSuffix ? `-${fileSuffix}` : '';
            const upperFileSuffix = fileSuffix ? utils.getCompName(fileSuffix) : '';
            const outputPath = path.join(guidePagePath, `Changelog${dashFileSuffix}.tsx`);
            generateChangelog(changelogPath, outputPath, lang);
            mdEntryImportStr += `import Changelog${upperFileSuffix} from './Changelog${dashFileSuffix}';\n`;
            mdEntryDocsStr += `    'changelog${dashFileSuffix}': Changelog${upperFileSuffix},\n`;
            const item = {
                name: lang === 'en' ? utils.getUpperTitle(localeMap.changelog[lang]) : localeMap.changelog[lang],
                key: `changelog`,
            };
            !readmeRoutes[lang] && (readmeRoutes[lang] = []);
            readmeRoutes[lang].push(item);
        });
    }

    if (tokenInfo) {
        languages.forEach(lang => {
            const fileSuffix = languageUtils.lang2SuffixMap[lang] || '';
            const dashFileSuffix= fileSuffix ? `-${fileSuffix}` : '';
            const upperFileSuffix = fileSuffix ? utils.getCompName(fileSuffix) : '';
            const outputPath = path.join(guidePagePath, `TokenPage${dashFileSuffix}.tsx`);
            generateTokenPage(tokenInfo, outputPath, lang);
            mdEntryImportStr += `import TokenPage${upperFileSuffix} from './TokenPage${dashFileSuffix}';\n`;
            mdEntryDocsStr += `    'tokens${dashFileSuffix}': TokenPage${upperFileSuffix},\n`;
            readmeRoutes[lang].push({
                name: lang === 'en' ? utils.getUpperTitle(localeMap.variableDescription[lang]) : localeMap.variableDescription[lang],
                key: `tokens`,
            })
        });
    }

    // 其他md文档
    siteMdNames.forEach(mdName => {
        const curMdFilename = mdName.replace('.md', '');
        const lang = languages.find(lang => {
            const suffix = languageUtils.lang2SuffixMap[lang];
            return curMdFilename.endsWith(`-${suffix}`) || curMdFilename.endsWith(`.${suffix}`);
        }) || 'ch';
        const fileSuffix = languageUtils.lang2SuffixMap[lang] || '';
        const mdFilename =  fileSuffix ? curMdFilename.slice(0, curMdFilename.length - fileSuffix.length - 1) : curMdFilename;
        const dashFileSuffix = fileSuffix ? `-${fileSuffix}` : fileSuffix;
        const dashMdFileName = fileSuffix ? `${mdFilename}-${fileSuffix}` : mdFilename;
        const compName = utils.getCompName(dashMdFileName);
        mdEntryImportStr += `import ${compName} from './${dashMdFileName}';\n`;
        mdEntryDocsStr += `    '${dashMdFileName}': ${compName},\n`;
        generateMdPage(path.join(extraMdPath, mdName), mdFilename, guidePagePath, lang, dashFileSuffix);
    });

    // 写README entry文件
    const mdEntryStr = `${mdEntryImportStr}
const docs = {\n${mdEntryDocsStr}};
export default docs;\n`;
    fs.writeFile(path.join(guidePagePath, 'index.ts'), mdEntryStr, () => {
        console.log('>>> Write sites docs entry file finished.');
    });

    // 写readme routes文件
    languages.forEach(lang => {
        const fileSuffix = languageUtils.lang2SuffixMap[lang] || '';
        const dashFileSuffix= fileSuffix ? `-${fileSuffix}` : '';
        fs.writeFile(
            path.join(guidePagePath, `index${dashFileSuffix}.json`),
            JSON.stringify(readmeRoutes[lang], null, 4),
            () => {
                console.log('>>> Write sites doc entry json file finished');
            },
        );
    });
}
/**
 * tsx文件生成--「开发指南」部分
 * @param {解析文件位置} filePath
 * @param {存储文件名} mdFilename
 * @param {存储文件路径} siteMdPath
 */
function generateMdPage(filePath, mdFilename, siteMdPath, language = 'ch', fileSuffix = '') {
    const md = fs.readFileSync(filePath, 'utf8');
    const mdSplit = md.split(/=====+/);
    const { source: nav, name } = renderSiteMdSource(mdSplit[0], language);
    const { source: description } = renderSiteMdSource(mdSplit[1] || '', language);

    const mdFileStr = `import React from 'react';

    export default function MarkDownFile() {
        return (
            <div className="pc-site-wrapper">
                <div
                    className="demo-doc-intro"
                    dangerouslySetInnerHTML={{ __html: ${JSON.stringify(nav)} }}
                />
                <div
                    className="demo-doc-description"
                    id="${mdFilename}"
                    dangerouslySetInnerHTML={{ __html: ${JSON.stringify(description)} }}
                />
            </div>
        );
    }
    `;
    fs.writeFile(path.join(siteMdPath, `${mdFilename}${fileSuffix}.tsx`), mdFileStr, () => {
        console.log(`>>> Write sites markdown file finished: ` + mdFilename);
    });
    const routeInfo = {
        name,
        key: mdFilename.toLowerCase(),
    };
    !readmeRoutes[language] && (readmeRoutes[language] = []);
    readmeRoutes[language].push(routeInfo);
}

module.exports = {
    generateGuide,
    generateMdPage,
    readmeRoutes,
};
