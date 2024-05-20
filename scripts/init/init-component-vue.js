const { copyFolder, changeFile } = require('./utils');
const path = require('path');
const childProcess = require('child_process');
const utils = require('../utils');

const copyPath = 'scripts/init/_vue-comp-template_';
const compPathName = 'packages/arcodesign-vue/components';
const rootPath = path.resolve(__dirname, '../../', compPathName)
const compName = utils.getFolderName(process.argv[2]);
const srcPath = path.join(rootPath, compName);

copyFolder({
    srcPath,
    copyPath,
});

childProcess.execSync(`cd ${srcPath} && mv Comp.vue ${utils.getCompName(compName)}.vue`);

changeFile(srcPath, compName);

