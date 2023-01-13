const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');
const utils = require('../utils');

function changeFile(filePath, compName) {
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach((fileName) => {
            const fileDir = path.join(filePath, fileName);
            fs.stat(fileDir, (error,stats) => {
                if (error) {
                    console.error(err);
                    return;
                }
                if (stats.isDirectory()) {
                    changeFile(fileDir, compName);
                } else {
                    const content = fs.readFileSync(fileDir, 'utf8');
                    fs.writeFile(
                        fileDir,
                        content.replace(/\$COMP\$/g, utils.getCompName(compName)).replace(/\$comp\$/g, compName),
                        () => {
                            console.log(`>>> File added: ${fileDir}`);
                        },
                    );
                }
            })
        });
    });
}

// 复制文件夹
function copyFolder({
    srcPath,
    copyPath,
    errorTip = '请指定组件名，格式：npm run add [compName]',
    existsTip = '组件已存在，换个名字吧~'
}) {
    if (!process.argv[2]) {
        console.error(errorTip);
        return;
    }
    if (fs.existsSync(srcPath)) {
        console.error(existsTip);
        return;
    }
    fs.mkdirpSync(srcPath);
    fs.copySync(copyPath, srcPath);
}

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
    console.log(mdSrcPath, mdCopyPath, ' , mdCopyPath');
    if (fs.existsSync(mdSrcPath) || fs.existsSync(enMdSrcPath)) {
        console.error(existsTops);
        return;
    }
    fs.writeFileSync(mdSrcPath, fs.readFileSync(mdCopyPath, 'utf8'));
    fs.writeFileSync(enMdSrcPath, fs.readFileSync(enMdCopyPath, 'utf8'));
}

module.exports = { copyFolder, changeFile, copyFaq };
