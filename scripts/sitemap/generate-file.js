const fs = require('fs');
const path = require('path');

// 递归函数来遍历文件夹
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}
// 获取全部文件列表
function getFileList(dir, reg) {
    const list = [];
    walkDir(dir, function (filePath) {
        if (filePath.match(reg)) {
            list.push(filePath);
        }
    });
    return list;
}

// 这个函数将源码写入文件
function createSitemap(name, dir, reg, outputFile) {
    const fileList = getFileList(dir, reg);

    // 准备
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    // 目录结构
    const contents = [
        `${name} 组件源代码目录为 ${dir}, 包含如下文件`,
        ...fileList.map(i => '- ' + i),
        '\n',
    ];
    fs.writeFileSync(outputFile, contents.join('\n'));

    // 每个文件内容
    for (const filePath of fileList) {
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' }).trim();
        const fileType = path.extname(filePath).substring(1);
        const contents = [filePath + ' 源代码如下', '```' + fileType, fileContent, '```', '\n'];
        fs.appendFileSync(outputFile, contents.join('\n'));
    }
}

// 执行函数
const name = 'button';
createSitemap(
    name,
    `packages/arcodesign/components/${name}/`,
    /.(ts|tsx|js|jsx|less|md)$/,
    `sites/sitemap/component ${name}.txt`,
);
