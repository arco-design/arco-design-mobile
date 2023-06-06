const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const rootPath = path.resolve(__dirname, '../../../../');

const siteFolder = 'sites/mobile/pages/components';
const compositeCompFolder = 'sites/mobile/pages/composite-comp';
const compositeFolder = 'sites/composite-comp';
const srcFolder = 'packages/arcodesign';
const packageName = '@arco-design/mobile-react';
const compFolder = path.posix.join(srcFolder, 'components');
const compPath = path.join(rootPath, compFolder);
const sitePath = path.join(rootPath, siteFolder);
const compositeCompPath = path.join(rootPath, compositeCompFolder);
const compositePath = path.join(rootPath, compositeFolder);

function renderSource({ comp, demoName, depsCompSet, language, compileEnv, demoPath, sitePath }) {
    if (!/^\w+.*\w+$/g.test(demoName)) return;
    const docPath = path.join(sitePath, comp);
    const demo = fs.readFileSync(path.join(demoPath, `${demoName}.md`), 'utf8');
    const renderer = new marked.Renderer();
    const reg = new RegExp(packageName, 'g');

    let order = 0;

    renderer.code = code => {
        const filename = `_${utils.getCompName(demoName)}`;
        const content = `import React from 'react';
${code.replace(reg, `../../../../../${compFolder}`).replace(/\/esm\//g, '/')}`;

        fs.mkdirpSync(docPath);
        const demoFileName = compileEnv === 'vite' ? `${filename}.jsx` : `${filename}.js`;
        const demoFilePath = path.join(docPath, demoFileName);
        fs.writeFile(demoFilePath, content);

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

function generateRootDemo(depsCompSet) {
    fs.removeSync(`${compFolder}/index.ts`);
    fs.removeSync(`${compFolder}/style.ts`);

    const compNames = fs.readdirSync(compPath).filter(name => {
        const compDirPath = path.join(compPath, name);
        return fs.lstatSync(compDirPath).isDirectory();
    });
    let compEntryStr = '';
    let styleEntryStr = `import '../style/public.less';\n`;
    compNames.forEach(comp => {
        // 内部工具js不处理
        if (/^_/.test(comp)) {
            return;
        }

        depsCompSet.add(comp);
    });


    [...depsCompSet]
        .filter(e => e)
        .forEach(e => {
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

    fs.writeFile(path.join(compPath, `index.ts`), compEntryStr, () => {
        console.log('>>> Write components entry file finished.');
    });

    fs.writeFile(path.join(compPath, 'style.ts'), styleEntryStr, () => {
        console.log('>>> Write components style entry file finished.');
    });
}

function generateSiteDemo({
    compileComps = [],
    language = 'ch',
    depsCompSet,
    compileEnv
} = {}) {
    const readmeRoutes = {};
    let compNames;
    if (compileComps.length) {
        compNames = compileComps;
    } else {
        compNames = fs.readdirSync(compPath).filter(name => fs.lstatSync(path.join(compPath, name)).isDirectory());
    }

    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const demoCompSet = new Set();
    let compDocsImportStr = '';
    let compDocsStr = '';

    const promises = compNames.map(comp => {
        return new Promise((resolve) => {
            // 内部工具js不处理
            if (/^_/.test(comp)) {
                return resolve();
            }

            depsCompSet.add(comp);

            const docPath = path.join(sitePath, comp);
            const demoPath = path.join(compPath, comp, 'demo');
            // 读取示例md文件并解析为组件
            let demos = null;
            try {
                demos = fs.readdirSync(demoPath);
            } catch (e) {
                return resolve();
            }
            const demoSource = [];
            let importStr = `import React from 'react';\n`;

            demos.forEach(name => {
                if (name.indexOf('.md') < 0) {
                    return resolve();
                }
                const demoName = name.replace('.md', '');
                const importDemoName = utils.getCompName(demoName);
                const { order, source } = renderSource({
                    comp,
                    demoName,
                    depsCompSet,
                    language,
                    compileEnv,
                    demoPath,
                    sitePath
                });
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
                    importStr += `import '../../../../../${compFolder}/${comp}/demo/style/${style}';\n`;
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
            fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, resolve);
        });
    });

    Promise.all(promises).then(() => {
        console.log(`>>> Generate ${language} demo files finished`);
    });

    if (!compileComps.length) {
        [...demoCompSet].forEach(e => {
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
            console.log(`>>> Write ${language} demo entry file finished.`);
        });

        const readmeInfoStr = JSON.stringify(readmeRoutes, null, 4);
        fs.writeFile(path.join(sitePath, `route${tsxFileSuffix}.ts`), `export default ${readmeInfoStr}`, () => {
            console.log(`>>> Write ${language} home route file finished`);
        });
    }
}

function generateSiteCompositeDemo({
    language,
    depsCompSet,
    compileEnv
}) {
    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const compNames = fs.readdirSync(compositePath).filter(name => fs.lstatSync(path.join(compositePath, name)).isDirectory());
    const demoCompSet = new Set();
    const compRoutes = [];
    let compDocsImportStr = '';
    let compDocsStr = '';
    const promises = compNames.map(comp => {
        return new Promise(resolve => {
            const routeInfo = {
                name: comp,
                key: comp,
            };
            compRoutes.push(routeInfo);
            const docPath = path.join(compositeCompPath, comp);
            const demoPath = path.join(compositePath, comp);
            // 读取示例md文件并解析为组件
            let demos = null;
            try {
                demos = fs.readdirSync(demoPath);
            } catch (e) {
                return resolve();
            }
            const demoSource = [];
            let importStr = `import React from 'react';\n`;
            demos.forEach(name => {
                if (name.indexOf('.md') < 0 || name.indexOf('README') >= 0) {
                    return;
                }
                const demoName = name.replace('.md', '');
                const importDemoName = utils.getCompName(demoName);
                const { order, source } = renderSource({
                    comp,
                    demoName,
                    depsCompSet,
                    language,
                    compileEnv,
                    demoPath,
                    sitePath: compositeCompPath
                });
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
                if (demoSource.length) {
                    demoCompSet.add(comp);
                }
            });

            demoSource.sort((a, b) => a.order - b.order);

            const demoStylePath = path.join(demoPath, 'style');
            if (fs.existsSync(demoStylePath)) {
                const styles = fs.readdirSync(demoStylePath);
                styles.forEach(style => {
                    if (!/.less$/.test(style)) {
                        return;
                    }
                    importStr += `import '../../../../composite-comp/${comp}/style/${style}';\n`;
                });
            }
            // 文件名作为组件名称
            const entry = `${importStr}
    export default function Demo() {
        return (
            <div className="arcodesign-mobile-demo">
                <div className="arcodesign-mobile-demo-nav">
                    <div className="arcodesign-mobile-demo-nav-inner">
                        ${comp}
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
            fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), entry, resolve);
        });
    });

    Promise.all(promises).then(() => {
        console.log(`>>> Generate ${language} composite demo files finished`);
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
    fs.writeFile(path.join(compositeCompPath, `index${tsxFileSuffix}.tsx`), docEntryStr, () => {
        console.log(`>>> Write ${language} composite demo file finished`);
    });

    const compInfoStr = JSON.stringify(compRoutes, null, 4);
    fs.writeFile(path.join(compositeCompPath, `route${tsxFileSuffix}.ts`), `export default ${compInfoStr}`, () => {
        console.log(`>>> Write ${language} composite home route file finished`);
    });
}

function generateDemo({
    languages = ['ch', 'en'],
    compileComps = [],
    compileEnv = 'webpack',
} = {}) {
    const depsCompSet = new Set();
    if (compileComps.length) {
        compileComps.forEach(comp => {
            const compPath = path.join(sitePath, comp);
            fs.removeSync(compPath);
        });
    } else {
        fs.removeSync(sitePath);
    }
    fs.removeSync(compositeCompPath);
    console.log(`>>> Clean demo files finished.`);
    console.log(`>>> Start generate demo files...`);
    console.log(`>>> Start generate demo entry files...`);
    languages.forEach(language => {
        generateSiteCompositeDemo({ depsCompSet, language, compileEnv });
        generateSiteDemo({ depsCompSet, language, compileComps, compileEnv });
    });
    if (compileComps.length) {
        generateRootDemo(depsCompSet);
    }
}

module.exports = generateDemo;
