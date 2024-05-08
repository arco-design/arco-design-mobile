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

// 获取某个目录下所有的源代码
function getCode(dir, reg) {
    const fileList = getFileList(dir, reg);

    // 目录结构
    const contents = [
        `The source code directory is ${dir}, which contains the following files`,
        ...fileList.map(i => '- ' + i),
        '\n',
    ];

    // 每个文件内容
    for (const filePath of fileList) {
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' }).trim();
        const fileType = path.extname(filePath).substring(1);
        contents.push(`Code for ${filePath}`, '```' + fileType, fileContent, '```', '\n');
    }
    return contents.join('\n');
}

const codes = [
    // Notify 组件
    `Notify component React source code:`,
    getCode(`packages/arcodesign/components/notify/`, /.(ts|tsx|js|jsx|less|md)$/),
    `Notify component Vue source code:`,
    getCode(`packages/arcodesign-vue/components/notify/`, /.(vue|ts|tsx|js|jsx|less|md)$/),
    // Cell 组件
    `Cell component React source code:`,
    getCode(`packages/arcodesign/components/cell/`, /.(ts|tsx|js|jsx|less|md)$/),
    `Cell component Vue source code:`,
    getCode(`packages/arcodesign-vue/components/cell/`, /.(vue|ts|tsx|js|jsx|less|md)$/),
    // Helper 文件
    `Helpers files React source code:`,
    getCode(`packages/arcodesign/components/_helpers/`, /.(ts|tsx|js|jsx|less|md)$/),
    // Loading 组件
    `Loading component React source code:`,
    getCode(`packages/arcodesign/components/loading/`, /.(ts|tsx|js|jsx|less|md)$/),
    '',
    '请根据以上源码参考，完成 Vue 版本的 Loading 组件，你需要先完成目录结构的设计，然后编写逐个文件的内容',
];

// 准备
const outputFile = `sites/sitemap/component loading code.txt`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, codes.join('\n'));
