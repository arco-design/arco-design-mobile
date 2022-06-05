const path = require('path');
const childProcess = require('child_process');
const { generateGuide } = require('./generate-guide');
const { generateComponents } = require('./generate-components');
const rootPath = path.resolve(__dirname, '../../../../');

function generateSite({
    compPageFolder = 'sites/pc/pages/components',
    guidePageFolder = 'sites/pc/pages/guide',
    resourcePageFolder = 'sites/pc/pages/resource',
    srcFolder = 'packages/arcodesign',
    languages = ['ch', 'en'],
    tokenInfo,
    latestVersion = '0.0.0',
} = {}) {
    const srcPath = path.join(rootPath, srcFolder);
    const compSrcPath = path.join(rootPath, srcFolder, 'components');
    const compPagePath = path.join(rootPath, compPageFolder);
    const guidePagePath = path.join(rootPath, guidePageFolder);
    const resourcePagePath = path.join(rootPath, resourcePageFolder);
    // 更新内容
    childProcess.execSync(`rm -rf ${compPagePath} && mkdir -p ${compPagePath}`);
    childProcess.execSync(`rm -rf ${guidePagePath} && mkdir -p ${guidePagePath}`);
    childProcess.execSync(`rm -rf ${resourcePagePath} && mkdir -p ${resourcePagePath}`);

    generateGuide(guidePagePath, srcPath, tokenInfo, path.resolve('sites/pc/static/md'), languages);
    languages.map(lang => {
        generateComponents(compSrcPath, compPagePath, lang, latestVersion);
    });
}

module.exports = {
    generateSite,
};
