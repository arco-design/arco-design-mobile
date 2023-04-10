const { copyFolder, changeFile } = require('./utils');
const path = require('path');
const utils = require('../utils');

const copyPath = 'scripts/init/_comp-template_';
const compPathName = 'packages/arcodesign/components';
const rootPath = path.resolve(__dirname, '../../', compPathName)
const compName = utils.getFolderName(process.argv[2]);
const srcPath = path.join(rootPath, compName);

copyFolder({
    srcPath,
    copyPath,
});

changeFile(srcPath, compName);
