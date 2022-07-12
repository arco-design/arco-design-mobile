const fs = require('fs-extra');
const path = require('path');
const utils = require('../../../utils');
const childProcess = require('child_process');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const { renderDemoSource, renderNavIntro, renderReadmeTable } = require('./helpers');

function generateComponents(compSrcPath, compPagePath, language, latestVersion) {
    const compNames = fs.readdirSync(path.join(compSrcPath)).filter(name => {
        return fs.lstatSync(path.join(compSrcPath, name)).isDirectory();
    });
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const importName = utils.getCompName(`icon${tsxFileSuffix}`);
    let compDocsImportStr = `import ${importName} from './icon${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
    let compDocsStr = `    'icon': ${importName},\n`;

    const compRoutes = {};

    compNames.forEach(comp => {
        if (comp === 'locale') {
            return;
        }
        // 内部工具js不处理
        if (/^_/.test(comp)) {
            return;
        }

        const docPath = path.join(compPagePath, comp);

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

        // demo代码展示填充
        const demoPath = path.join(compSrcPath, comp, 'demo');
        let demos = null;
        try {
            demos = fs.readdirSync(path.join(demoPath));
        } catch (e) {
            return;
        }
        const demoSource = [];
        demos.forEach(name => {
            if (name.indexOf('.md') < 0) {
                return;
            }
            const demoName = name.replace('.md', '');
            const { order, source, codeSource, title } = renderDemoSource(demoPath, demoName, language || 'ch');
            demoSource.push({
                order,
                source: `<Code codeSource="${encodeURIComponent(
                    codeSource
                )}" version="${latestVersion}" compKey="${comp}" demoKey="demo-${comp}" name="${title}" code={<div className="demo-code-wrapper" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                    source,
                )} }} />} language={language || LanguageSupport.CH} />`,
            });
        });

        demoSource.sort((a, b) => a.order - b.order);

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
            </div>
        </div>
    );
}
`;
        fs.mkdirpSync(docPath);
        fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, () => {
            console.log(`>>> Write sites file finished: ` + comp);
        });

        // 入口文件内容填充
        if (demoSource.length) {
            const importName = utils.getCompName(comp);
            const route = utils.getFolderName(comp);
            compDocsImportStr += `import ${importName} from './${comp}${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
            compDocsStr += `    '${route}': ${importName},\n`;
        }
    });
    const docEntryStr = `${compDocsImportStr}
const docs = {\n${compDocsStr}};

export default docs;
`;
    fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.ts`), docEntryStr, () => {
        console.log('>>> Write sites entry file finished.');
    });

    fs.writeFile(path.join(compPagePath, `index${tsxFileSuffix}.json`), JSON.stringify(compRoutes, null, 4), () => {
        console.log('>>> Write sites entry json finished.');
    });
}

module.exports = {
    generateComponents,
};
