const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');
const utils = require('../utils');
const rootPath = path.resolve(__dirname, '../../');
const compPathName = 'packages/arcodesign/components';
const compPath = path.join(rootPath, compPathName);

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

function copyFile() {
    if (!process.argv[2]) {
        console.error('请指定组件名，格式：npm run add -- [compName]');
        return;
    }
    const compName = utils.getFolderName(process.argv[2]);
    const newCompPath = path.join(compPath, compName);
    if (fs.existsSync(newCompPath)) {
        console.error('组件已存在，换个名字吧~');
        return;
    }
    fs.mkdirpSync(`${compPathName}/${compName}`);
    fs.copySync('scripts/init/_template_', `${compPathName}/${compName}`);
    changeFile(newCompPath, compName);
}

copyFile();
