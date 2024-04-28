const path = require('path');

const rootPath = path.resolve(__dirname, '../../../../../');
const srcFolder = 'packages/arcodesign-vue';
const srcPath = path.join(rootPath, srcFolder);
const compFolder = path.join(srcFolder, 'components');
const compPath = path.join(rootPath, compFolder);
const sitePath = path.join(rootPath, 'sites/mobile-vue/pages/components');
const utilsPackageName = '@arco-design/mobile-utils';
const utilsFolder = 'packages/common-widgets';

module.exports = {
    rootPath,
    srcPath,
    compFolder,
    compPath,
    sitePath,
    utilsPackageName,
    utilsFolder,
};
