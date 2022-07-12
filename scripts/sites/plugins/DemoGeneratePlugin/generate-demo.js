const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const child_process = require('child_process');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const rootPath = path.resolve(__dirname, '../../../../');

function renderSource(
    packageName,
    sitePath,
    compFolder,
    docPath,
    demoPath,
    comp,
    demoName,
    depsCompSet,
    language = 'ch'
) {
    if (!/^\w+.*\w+$/g.test(demoName)) return;
    const renderer = new marked.Renderer();
    const demo = fs.readFileSync(path.join(demoPath, `${demoName}.md`), 'utf8');
    let order = 0;
    const reg = new RegExp(packageName, 'g');
    renderer.code = code => {
        const filename = `_${utils.getCompName(demoName)}`;
        const content = `import React from 'react';
${code.replace(reg, `../../../${compFolder}`).replace(/\/esm\//g, '/')}`;

        fs.mkdirpSync(`${sitePath}/${comp}`);
        fs.writeFile(path.join(docPath, `${filename}.js`), content, () => {
            // console.log(`>>> Write demo file finished: ${comp}/${filename}`);
        });

        const res = [...code.matchAll(/import {([^}]+)} from '@arco-design\/mobile-react';/g)];
        if (res && res[0]) {
            res[0][1].split(',').forEach(e => {
                depsCompSet.add(utils.getFolderName(e.trim()));
            });
        }
        return '__CODE_RENDERER__';
    };

    renderer.heading = (text, level) => {
        if (level === 2) {
            return `
            <div className="arcodesign-mobile-title">${utils.getReadMeTextByLang(text, language)}</div>`;
        }
        if (level === 4) {
            order = Number(text) || 0;
        }
        return '';
    };
    renderer.paragraph = text => {
        return `<p>${utils.getReadMeTextByLang(text, language)}</p>`;
    };
    const result = marked(demo, { renderer });
    return {
        order,
        source: result,
    };
}

function getReadmeInfo(readmePath, language = 'ch') {
    let readme = '';
    try {
        readme = fs.readFileSync(readmePath, 'utf8');
    } catch (e) {
        return {
            title: '',
        };
    }
    const renderer = new marked.Renderer();
    let title = '';
    let type = localeMap.others[language];
    renderer.heading = (text, level) => {
        if (level === 1) {
            title = text;
        }
        if (level === 3 && text) {
            type = text;
        }
        return '';
    };
    marked(readme, { renderer });
    return {
        title,
        type,
    };
}

function generateRootDemo({
    srcFolder = 'packages/arcodesign',
    filterComp = [],
} = {}, depsCompSet) {
    const compFolder = srcFolder + '/components';
    fs.removeSync(`${compFolder}/index.ts`);
    fs.removeSync(`${compFolder}/style.ts`);
    const normalizeFilterComp = Array.isArray(filterComp)
        ? [...filterComp]
        : [];

    const compPath = path.join(rootPath, compFolder);
    const compNames = fs.readdirSync(path.join(compPath)).filter(name => {
        return fs.lstatSync(path.join(compPath, name)).isDirectory();
    });
    let compEntryStr = '';
    let styleEntryStr = `import '../style/public.less';\n`;
    compNames.forEach(comp => {
        // 内部工具js不处理
        if (/^_/.test(comp)) {
            return;
        }

        if (
            !comp.includes('icon') &&
            normalizeFilterComp.length &&
            !normalizeFilterComp.includes(comp)
        ) {
            return;
        }

        depsCompSet.add(comp);
    });


    [...depsCompSet]
        .filter(e => e)
        .map(e => {
            if (!(e.includes('icon') || ['locale'].includes(e))) {
                // 组件src入口文件内容
                compEntryStr += `export { default as ${utils.getCompName(e)} } from './${e}';\n`;

                // 组件样式入口文件内容
                const stylePath = path.join(compPath, e, 'style/index.ts');
                if (fs.existsSync(stylePath)) {
                    styleEntryStr += `import './${e}/style';\n`;
                }
            }
        });


    fs.writeFile(path.join(rootPath, compFolder, `index.ts`), compEntryStr, () => {
        console.log('>>> Write components entry file finished.');
    });

    fs.writeFile(path.join(rootPath, compFolder, 'style.ts'), styleEntryStr, () => {
        console.log('>>> Write components style entry file finished.');
    });
}
function generateSiteDemo({
    siteFolder = 'sites/pages',
    srcFolder = 'packages/arcodesign',
    packageName = '@arco-design/mobile-react',
    filterComp = [],
    language = 'ch',
    depsCompSet,
} = {}) {
    const readmeRoutes = {};
    const compFolder = srcFolder + '/components';
    const normalizeFilterComp = Array.isArray(filterComp)
        ? [...filterComp]
        : [];
    const sitePath = path.join(rootPath, siteFolder);
    const compPath = path.join(rootPath, compFolder);
    const compNames = fs.readdirSync(path.join(compPath)).filter(name => {
        return fs.lstatSync(path.join(compPath, name)).isDirectory();
    });
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const demoCompSet = new Set();
    let compDocsImportStr = '';
    let compDocsStr = '';

    compNames.forEach(comp => {
        // 内部工具js不处理
        if (/^_/.test(comp)) {
            return;
        }

        if (
            !comp.includes('icon') &&
            normalizeFilterComp.length &&
            !normalizeFilterComp.includes(comp)
        ) {
            return;
        }

        depsCompSet.add(comp);

        const docPath = path.join(sitePath, comp);
        const demoPath = path.join(compPath, comp, 'demo');
        // 读取示例md文件并解析为组件
        let demos = null;
        try {
            demos = fs.readdirSync(path.join(demoPath));
        } catch (e) {
            return;
        }
        const demoSource = [];
        let importStr = `import React from 'react';\n`;
        demos.forEach(name => {
            if (name.indexOf('.md') < 0) {
                return;
            }
            const demoName = name.replace('.md', '');
            const importDemoName = utils.getCompName(demoName);
            const { order, source } = renderSource(
                packageName,
                sitePath,
                compFolder,
                docPath,
                demoPath,
                comp,
                demoName,
                depsCompSet,
                language
            );
            importStr += `import ${importDemoName} from './_${importDemoName}';\n`;
            demoSource.push({
                order,
                source: source.replace(
                    /__CODE_RENDERER__/,
                    `
            <div className="arcodesign-mobile-demo-content" id="demo-order-${order}">
                <${importDemoName} />
            </div>`,
                ),
            });
        });

        demoSource.sort((a, b) => a.order - b.order);

        const demoStylePath = path.join(demoPath, 'style');
        if (fs.existsSync(demoStylePath)) {
            const styles = fs.readdirSync(demoStylePath);
            styles.forEach(style => {
                if (!/.less$/.test(style)) {
                    return;
                }
                importStr += `import '../../../${compFolder}/${comp}/demo/style/${style}';\n`;
            });
        }
        const readmeInfo = getReadmeInfo(path.join(compPath, comp, `README${mdSuffix}.md`));
        const typeRoute = readmeRoutes[readmeInfo.type];
        const routeInfo = {
            name: readmeInfo.title,
            key: comp,
        };
        if (typeRoute && typeRoute.length) {
            readmeRoutes[readmeInfo.type].push(routeInfo);
        } else {
            readmeRoutes[readmeInfo.type] = [routeInfo];
        }
        // 读取readme获取组件名称
        const entry = `${importStr}
export default function Demo() {
    return (
        <div className="arcodesign-mobile-demo">
            <div className="arcodesign-mobile-demo-nav">
                <div className="arcodesign-mobile-demo-nav-inner">
                    ${readmeInfo.title}
                </div>
            </div>
            ${demoSource.map(demo => demo.source).join('\n')}
        </div>
    );
}
`;
        if (demoSource.length) {
            demoCompSet.add(comp);
        }
        fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, () => {
            // console.log(`>>> Write demo file finished: ` + comp);
        });
    });

    [...demoCompSet].map(e => {
        // 入口文件内容填充
        const importName = utils.getCompName(e);
        const route = utils.getFolderName(e);
        compDocsImportStr += `import ${importName} from './${e}${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
        compDocsStr += `    '${route}': ${importName},\n`;
    });
    const docEntryStr = `${compDocsImportStr}
const docs = {\n${compDocsStr}};

export default docs;
`;
    fs.writeFile(path.join(sitePath, `index${tsxFileSuffix}.ts`), docEntryStr, () => {
        console.log('>>> Write demo entry file finished.');
    });

    const readmeInfoStr = JSON.stringify(readmeRoutes, null, 4);
    fs.writeFile(path.join(sitePath, `route${tsxFileSuffix}.ts`), `export default ${readmeInfoStr}`, () => {
        console.log('>>> Write home route file finished');
    });
}
function generateDemo(options = {
    siteFolder: 'sites/pages',
    srcFolder: 'packages/arcodesign',
    packageName: '@arco-design/mobile-react',
    filterComp: [],
    languages: ['ch', 'en']
}) {
    const { siteFolder = 'sites/pages', languages = ['ch', 'en'], ...restParams } = options;
    const depsCompSet = new Set();
    const sitePath = path.join(rootPath, siteFolder);
    console.log(`>>> Start generate demo files...`);
    fs.removeSync(sitePath);
    console.log(`>>> Clean demo files finished.`);
    console.log(`>>> Start generate demo entry files...`);
    languages.map(lang => generateSiteDemo({ ...restParams, depsCompSet, siteFolder, language: lang }));
    console.log(`>>> Generate demo entry files finished.`);
    generateRootDemo(options, depsCompSet);
    console.log(`>>> Generate demo files finished.`);
}

module.exports = generateDemo;
