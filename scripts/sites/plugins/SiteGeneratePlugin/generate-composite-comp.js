const fs = require('fs-extra');
const path = require('path');
const { renderComponentsHeader, renderComponentsDemos } = require('./utils');
const { transferLessToCSS } = require('./helpers');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');

function generateCompositeComponents({
    compSrcPath,
    compPagePath,
    language,
    latestVersion,
    compileCSSSource
}) {
    const compNames = fs.readdirSync(path.join(compSrcPath)).filter(name => {
        return fs.lstatSync(path.join(compSrcPath, name)).isDirectory();
    });
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    let compDocsImportStr = '';
    let compDocsStr = '';
    const compRoutes = [];
    compNames.forEach(comp => {
        // 拼装 route json
        const routeInfo = {
            name: comp,
            key: comp,
        };
        compRoutes.push(routeInfo);

        // 渲染文档站头部
        const readmeStr = renderComponentsHeader({
            compSrcPath,
            comp,
            mdSuffix,
            language,
        });

        // 渲染文档站 demo 内容部分
        const demoPath = path.join(compSrcPath, comp);
        const { demoSource = [], lessSources = {} } = renderComponentsDemos({
            demoSrcPath: demoPath,
            comp,
            language,
            latestVersion,
        });

        // demo less过一遍less-loader，转为css
        transferLessToCSS(lessSources, !compileCSSSource)
            .then(cssSources => {
                const cssSourceEntries = Object.entries(cssSources);
                fs.writeFileSync(path.join(docPath, `css-source.js`), utils.formatTsCode(`
                    export default {
                        ${cssSourceEntries.map(source => `'${source[0]}': '${source[1]}'`).join(',')}
                    };
                `));
            });

        // 创建 demo 目录写入 index 文件
        const entry = utils.formatTsCode(`
            import React from 'react';
            ${Object.keys(lessSources).length ? `import cssSources from './css-source';` : ''}
            import Code from '../../../entry/code';
            import { LanguageSupport } from '../../../../utils/language';
            interface IProps {
                language?: LanguageSupport;
            }
            export default function Demo({ language = LanguageSupport.CH}: IProps) {
                return (
                    <div className="pc-site-wrapper">
                        ${readmeStr[0] || ''}
                        <div className="pc-site-content" id="demo-${comp}">
                            ${demoSource.map(demo => demo.source).join('')}
                        </div>
                    </div>
                );
            }`);
        const docPath = path.join(compPagePath, comp);
        fs.mkdirpSync(docPath);
        fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, () => {
            console.log(`>>> Write sites file finished: ` + comp);
        });

        // 拼接组件入口文件内容
        if (demoSource.length) {
            const importName = utils.getCompName(comp);
            const route = utils.getFolderName(comp);
            compDocsImportStr += `import ${importName} from './${comp}${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';`;
            compDocsStr += `'${route}': ${importName},`;
        }

    });

    // 写入入口文件
    const docEntryStr = utils.formatTsCode(
        `${compDocsImportStr}
        const docs = {\n${compDocsStr}};
        export default docs;`);
    fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.ts`), docEntryStr, () => {
        console.log('>>> Write sites entry file finished.');
    });

    fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.json`), JSON.stringify(compRoutes, null, 4), () => {
        console.log('>>> Write sites entry json finished.');
    });
}

module.exports = {
    generateCompositeComponents,
};
