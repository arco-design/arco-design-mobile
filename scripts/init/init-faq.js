const { copyFaq } = require('./utils');
const path = require('path');
const utils = require('../utils');

const copyPath = 'scripts/init/_faq-template_';
const compPathName = 'packages/arcodesign/components';
const rootPath = path.join(path.resolve(__dirname, '../../'), compPathName);
const compName = utils.getFolderName(process.argv[2]);
const srcPath = path.join(rootPath, compName);

copyFaq({
    srcPath,
    copyPath,
});
