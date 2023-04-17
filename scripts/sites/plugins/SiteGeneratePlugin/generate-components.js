const fs = require('fs-extra');
const { resolve } = require('path');
const path = require('path');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const { renderNavIntro, renderReadmeTable} = require('./helpers');
const { renderComponentsDemos, renderComponentsFAQ } = require('./utils');

function generateComponents({
    compSrcPath,
    compPagePath,
    language,
    latestVersion,
    compileComps
} = {}) {
    let compNames = [];
    if (compileComps && compileComps.length) {
        compNames = compileComps;
    } else {
        compNames = fs.readdirSync(path.join(compSrcPath)).filter(name => {
            return fs.lstatSync(path.join(compSrcPath, name)).isDirectory();
        });
    }
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const importName = utils.getCompName(`icon${tsxFileSuffix}`);
    let compDocsImportStr = `import ${importName} from './icon${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
    let compDocsStr = `    'icon': ${importName},\n`;
    const compRoutes = {};
    const promises = compNames.map(comp => {
        return new Promise(resolve => {
            // 内部工具js不处理
            if (/^_/.test(comp)) {
                return resolve();
            }

            // 组件readme内容填充，readmeStr[0]为demo之前内容，readmeStr[1]为demo之后内容，中间用分割线隔开
            let readmeStr = [];
            try {
                const readme = fs.readFileSync(path.join(compSrcPath, comp, `README${mdSuffix}.md`), 'utf8');
                const readmeSplit = readme.split(/=====+/);
                const { source: introSource, name, type } = renderNavIntro(readmeSplit[0], localeMap.components[language], localeMap.others[language]);
                const { source: propsSource } = renderReadmeTable(readmeSplit[1], language);
                readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                    introSource,
                )} }} />`;
                readmeStr[1] = `<div className="demo-props" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                    propsSource,
                )} }} />`;
                const compRoute = {
                    name,
                    key: utils.getFolderName(comp),
                };
                if (!compRoutes[type]) {
                    compRoutes[type] = [compRoute];
                } else {
                    compRoutes[type].push(compRoute);
                }
            } catch (e) {
                readmeStr = [];
            }

            // 渲染文档站 demo 内容部分
            const demoPath = path.join(compSrcPath, comp, 'demo');
            const demoSource = renderComponentsDemos({
                demoSrcPath: demoPath,
                comp,
                language,
                latestVersion,
            }) || [];

            // 渲染文档站 faq 内容部分
            const faqNodeStr = renderComponentsFAQ({
                faqSrcPath: path.join(compSrcPath, comp, `FAQ${mdSuffix}.md`),
                language,
            })

            // 创建 demo 目录写入 index 文件
            const entry = `import React from 'react';
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
        ${demoSource.map(demo => demo.source).join(`\n${' '.repeat(12)}`)}
        ${readmeStr[1] || ''}
        ${faqNodeStr || ''}
    </div>
</div>
);
}
`;
            const docPath = path.join(compPagePath, comp);
            fs.mkdirpSync(docPath);
            fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, () => {
                resolve(`>>> Write sites file finished: ${comp}`);
            });

            // 拼接组件入口文件内容
            if (demoSource.length) {
                const importName = utils.getCompName(comp);
                const route = utils.getFolderName(comp);
                compDocsImportStr += `import ${importName} from './${comp}${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
                compDocsStr += `    '${route}': ${importName},\n`;
            }
        });
        
    });

    // 全量编译，重写入口 index.ts index.json 文件
    if (!compileComps.length) {
        
        promises.push([new Promise(resolve => {
            const docEntryStr = `${compDocsImportStr}
    const docs = {\n${compDocsStr}};

    export default docs;
    `;
            fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.ts`), docEntryStr, () => {
                resolve('>>> Write sites entry file finished.');
            });
        }), new Promise(resolve => {
            fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.json`), JSON.stringify(compRoutes, null, 4), () => {
                resolve('>>> Write sites entry json finished.');
            });
        })]);
    }

    Promise.all(promises).then(() => {
        console.log('>>> generate components success');
    });
}

module.exports = {
    generateComponents,
};
