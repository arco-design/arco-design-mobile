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

module.exports = { copyFolder, changeFile };
