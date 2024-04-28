const path = require('path');
const fs = require('fs-extra');
const { generateComponents } = require('../../../plugins/SiteGeneratePlugin/generate-components');
const { generateGuide } = require('../../../plugins/SiteGeneratePlugin/generate-guide');
const { rootPath, srcPath, compPath } = require('../utils/path');

function generateSite({
    compPageFolder = 'sites/pc/pages-vue/components',
    guidePageFolder = 'sites/pc/pages-vue/guide',
    languages = ['ch', 'en'],
    tokenInfo,
    latestVersion = '0.0.0',
    compileComps = [],
} = {}) {
    const compPagePath = path.join(rootPath, compPageFolder);
    const guidePagePath = path.join(rootPath, guidePageFolder);
    // 单组件编译
    if (compileComps.length) {
        compileComps.forEach(comp => {
            fs.removeSync(path.join(compPagePath, comp));
        });
    } else {
        fs.removeSync(compPagePath);
        fs.mkdirpSync(compPagePath);
    }
    fs.removeSync(guidePagePath);
    fs.mkdirpSync(guidePagePath);

    generateGuide({
        guidePagePath,
        srcPath,
        tokenInfo,
        extraMdPath: path.resolve('sites/pc/static/md-vue'),
        languages,
    });

    languages.forEach(language => {
        generateComponents({
            compSrcPath: compPath,
            compPagePath,
            language,
            latestVersion,
            compileComps,
            demoDir: '__demo__',
            isVue: true,
        });
    });
}

module.exports = generateSite;
