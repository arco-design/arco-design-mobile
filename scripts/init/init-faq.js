const fs = require('fs-extra');
const path = require('path');
const utils = require('../utils');

const copyPath = 'scripts/init/_faq-template_';
const compPathName = 'packages/arcodesign/components';
const rootPath = path.resolve(__dirname, '../../', compPathName)
const compName = utils.getFolderName(process.argv[2]);
const srcPath = path.join(rootPath, compName);

// 复制 FAQ 文件
function copyFaq({
    srcPath,
    copyPath,
    errorTip = '请指定文件名，格式：npm run add-faq [compName]',
    existsTops = '当前组件的 FAQ 已存在，可去组件目录下直接添加'
}) {
    if (!process.argv[2]) {
        console.error(errorTip);
        return;
    }
    const mdSrcPath = path.join(srcPath, 'FAQ.md');
    const enMdSrcPath = path.join(srcPath, 'FAQ.en-US.md');
    const mdCopyPath = path.join(copyPath, 'FAQ.md');
    const enMdCopyPath = path.join(copyPath, 'FAQ.en-US.md');
    if (fs.existsSync(mdSrcPath) || fs.existsSync(enMdSrcPath)) {
        console.error(existsTops);
        return;
    }
    fs.writeFileSync(mdSrcPath, fs.readFileSync(mdCopyPath, 'utf8'));
    fs.writeFileSync(enMdSrcPath, fs.readFileSync(enMdCopyPath, 'utf8'));
}

copyFaq({
    srcPath,
    copyPath,
});
