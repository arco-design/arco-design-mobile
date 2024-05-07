const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const utils = require('../../../../utils');
const languageUtils = require('../../../../utils/language');
const localeMap = require('../../../../utils/language.json');
const { compFolder, compPath, sitePath, compPackageName, utilsPackageName, utilsFolder } = require('../utils/path');

function renderSource({
    comp,
    demoName,
    language,
    demoPath,
    sitePath,
}) {
    if (!/^\w+.*\w+$/g.test(demoName)) return;
    const docPath = path.join(sitePath, comp);
    // 是当前组件且不是当前开发 demo 不用设置渲染内容
    const demo = fs.readFileSync(path.join(demoPath, `${demoName}.md`), 'utf8');
    const renderer = new marked.Renderer();
    const compNpmReg = new RegExp(compPackageName, 'g');
    const utilsNpmReg = new RegExp(utilsPackageName, 'g');

    let order = 0;

    renderer.code = (code, info) => {
        if (info === 'vue') {
            const filename = `_${utils.getCompName(demoName)}`;
            const content = code
                .replace(/(<style.*?>)/g, `$1\n@import '../../../../../packages/arcodesign-vue/style/mixin.less';`)
                .replace(compNpmReg, `../../../../../${compFolder}`)
                .replace(utilsNpmReg, `../../../../../${utilsFolder}`)
                .replace(/\/esm\//g, '/');
            fs.mkdirpSync(docPath);
            const demoFileName = `${filename}.vue`;
            const demoFilePath = path.join(docPath, demoFileName);
            fs.writeFile(demoFilePath, content);
            return '__CODE_RENDERER__';
        }
        return '';
    };

    renderer.heading = (text, level) => {
        if (level === 2) {
            return `
            <div class="arcodesign-mobile-title">${utils.getReadMeTextByLang(text, language)}</div>`;
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

function generateSiteDemo({
    compileComps = [],
    language = 'ch',
} = {}) {
    const readmeRoutes = {};
    let compNames;
    if (compileComps.length) {
        compNames = compileComps;
    } else {
        compNames = utils.getAllComps(compPath);
    }

    const suffix = language in languageUtils.lang2SuffixMap ? languageUtils.lang2SuffixMap[language] : '';
    const mdSuffix = suffix ? `.${suffix}` : suffix;
    const tsxFileSuffix = suffix ? `-${suffix}` : suffix;
    const demoCompSet = new Set();
    let compDocsImportStr = '';
    let compDocsStr = '';

    const promises = compNames.map(comp => {
        return new Promise((resolve) => {
            const docPath = path.join(sitePath, comp);
            const demoPath = path.join(compPath, comp, '__demo__');
            // 读取示例md文件并解析为组件
            let demos = null;
            try {
                demos = fs.readdirSync(demoPath);
            } catch (e) {
                return resolve();
            }
            const demoSource = [];
            let importStr = '';

            demos.forEach(name => {
                if (name.indexOf('.md') < 0) {
                    return;
                }
                const demoName = name.replace('.md', '');
                const importDemoName = utils.getCompName(demoName);
                const { order, source } = renderSource({
                    comp,
                    demoName,
                    language,
                    demoPath,
                    sitePath,
                });
                importStr += `import ${importDemoName} from './_${importDemoName}.vue';`;
                demoSource.push({
                    order,
                    source: source.replace(
                        /__CODE_RENDERER__/,
                        `
                <div class="arcodesign-mobile-demo-content" id="demo-order-${order}">
                    <${importDemoName} />
                </div>`,
                    ),
                });
            });

            demoSource.sort((a, b) => a.order - b.order);

            // 引入 demo 目录下公共 style
            let importLessStr = '';
            const demoStylePath = path.join(demoPath, 'style');
            if (fs.existsSync(demoStylePath)) {
                const styles = fs.readdirSync(demoStylePath);
                styles.forEach(style => {
                    if (!/.less$/.test(style)) {
                        return;
                    }
                    importLessStr += `@import '../../../../../${compFolder}/${comp}/__demo__/style/${style}';`;
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
            const entry = `\
<script setup lang="ts">
${importStr}
</script>
<template>
    <div className="arcodesign-mobile-demo">
        <div className="arcodesign-mobile-demo-nav">
            <div className="arcodesign-mobile-demo-nav-inner">
                ${readmeInfo.title}
            </div>
        </div>
        ${demoSource.map(demo => demo.source).join('')}
    </div>
</template>
<style lang="less" scoped>
${importLessStr}
</style>`;

            if (demoSource.length) {
                demoCompSet.add(comp);
            }
            fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.vue`), entry, resolve);
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
            compDocsImportStr += `import ${importName} from './${e}${tsxFileSuffix ? `/index${tsxFileSuffix}.vue` : '/index.vue'}';`;
            compDocsStr += `'${route}': ${importName},`;
        });
        const docEntryStr = utils.formatTsCode(`
            ${compDocsImportStr}
            const docs = {${compDocsStr}};
            export default docs;`);

        fs.writeFile(path.join(sitePath, `index${tsxFileSuffix}.ts`), docEntryStr, () => {
            console.log(`>>> Write ${language} demo entry file finished.`);
        });

        const readmeInfoStr = JSON.stringify(readmeRoutes, null, 4);
        fs.writeFile(path.join(sitePath, `route${tsxFileSuffix}.ts`), `export default ${readmeInfoStr}`, () => {
            console.log(`>>> Write ${language} home route file finished`);
        });
    }
}

function generateDemo({
    languages = ['ch', 'en'],
    compileComps = [],
} = {}) {
    if (compileComps.length) {
        compileComps.forEach(comp => {
            const compPath = path.join(sitePath, comp);
            fs.removeSync(compPath);
        });
    } else {
        fs.removeSync(sitePath);
    }
    console.log(`>>> Clean demo files finished.`);
    console.log(`>>> Start generate demo files...`);
    console.log(`>>> Start generate demo entry files...`);
    languages.forEach(language => {
        generateSiteDemo({ language, compileComps });
    });
}

module.exports = generateDemo;
