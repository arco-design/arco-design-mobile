const path = require('path');
const { generateGuide } = require('./generate-guide');
const { generateComponents } = require('./generate-components');
const { generateCompositeComponents } = require('./generate-composite-comp');
const rootPath = path.resolve(__dirname, '../../../../');
const fs = require('fs-extra');

function generateSite({
    compPageFolder = 'sites/pc/pages/components',
    guidePageFolder = 'sites/pc/pages/guide',
    resourcePageFolder = 'sites/pc/pages/resource',
    srcFolder = 'packages/arcodesign',
    languages = ['ch', 'en'],
    tokenInfo,
    latestVersion = '0.0.0',
    compositeSrc = 'sites/composite-comp',
    compositeComp = 'sites/pc/pages/composite-comp',
} = {}) {
    const srcPath = path.join(rootPath, srcFolder);
    const compSrcPath = path.join(rootPath, srcFolder, 'components');
    const compPagePath = path.join(rootPath, compPageFolder);
    const guidePagePath = path.join(rootPath, guidePageFolder);
    const resourcePagePath = path.join(rootPath, resourcePageFolder);
    const compositeCompPath = path.join(rootPath, compositeComp);
    const compositeSrcPath = path.join(rootPath, compositeSrc);
    // 更新内容

    fs.removeSync(compPagePath);
    fs.removeSync(guidePagePath);
    fs.removeSync(resourcePagePath);
    fs.mkdirpSync(compPagePath);
    fs.mkdirpSync(guidePagePath);
    fs.mkdirpSync(resourcePagePath);

    generateGuide(guidePagePath, srcPath, tokenInfo, path.resolve('sites/pc/static/md'), languages);
    languages.map(lang => {
        generateCompositeComponents(compositeSrcPath, compositeCompPath, lang, latestVersion);
        generateComponents(compSrcPath, compPagePath, lang, latestVersion);
    });
}

module.exports = {
    generateSite,
};
