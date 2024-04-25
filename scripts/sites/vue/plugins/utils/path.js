const path = require('path');

const rootPath = path.resolve(__dirname, '../../../../../');
const compFolder = 'packages/arcodesign-vue/components';
const compPath = path.join(rootPath, compFolder);
const sitePath = path.join(rootPath, 'sites/mobile-vue/pages/components');
const utilsPackageName = '@arco-design/mobile-utils';
const utilsFolder = 'packages/common-widgets';

module.exports = {
    rootPath,
    compFolder,
    compPath,
    sitePath,
    utilsPackageName,
    utilsFolder,
};
