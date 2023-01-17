const { copyFolder, changeFile } = require('./utils');
const path = require('path');
const utils = require('../utils');

const copyPath = 'scripts/init/_composite-template_';
const compPathName = 'sites/composite-comp';
const rootPath = path.resolve(__dirname, '../../', compPathName)
const compName = utils.getFolderName(process.argv[2]);
const srcPath = path.join(rootPath, compName);

copyFolder({
    srcPath,
    copyPath,
    errorTip: '请指定组件名，格式：npm run add-composite [compName]',
});

changeFile(srcPath, compName);
