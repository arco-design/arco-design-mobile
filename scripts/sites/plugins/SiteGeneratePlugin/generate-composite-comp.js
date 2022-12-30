const fs = require('fs-extra');
const path = require('path');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const { renderDemoSource, renderNavIntro } = require('./helpers');

function generateCompositeComponents(compSrcPath, compPagePath, language, latestVersion) {
    const compNames = fs.readdirSync(path.join(compSrcPath)).filter(name => {
        return fs.lstatSync(path.join(compSrcPath, name)).isDirectory();
    });
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    let compDocsImportStr = '';
    let compDocsStr = '';
    const compRoutes = [];
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    compNames.forEach(comp => {
        const routeInfo = {
            name: comp,
            key: comp,
        };
        compRoutes.push(routeInfo);
        const docPath = path.join(compPagePath, comp);
        const demoPath = path.join(compSrcPath, comp);
        let demos = null;
        try {
            demos = fs.readdirSync(path.join(demoPath));
        } catch (e) {
            return;
        }
        const demoSource = [];


        // 组件内容填充
        let readmeStr = [];
        try {
            const readme = fs.readFileSync(path.join(compSrcPath, comp, `README${mdSuffix}.md`), 'utf8');
            const { source: introSource, } = renderNavIntro(readme, localeMap.compositeComp[language], localeMap.others[language]);
            readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                introSource,
            )} }} />`;
        } catch (e) {
            readmeStr = [];
        }

        demos.forEach(name => {
            if (name.indexOf('.md') < 0 || name.indexOf('README') >= 0) {
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
    generateCompositeComponents,
};
