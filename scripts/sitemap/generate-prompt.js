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
function getSource(dir, reg) {
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
        contents.push(
            `The source code of the file ${filePath} is as follows:`,
            '```' + fileType,
            fileContent,
            '```',
            '\n',
        );
    }
    return contents.join('\n');
}

const prompts = [
    // `你是 Arco Design Mobile 前端组件库专家，非常熟悉组件库源码和前端 React 、Vue 框架，特别擅长根据 react 版本源码编写 vue 版本的代码`,
    `You are a front-end engineer, focusing on the development of Arco Design Mobile, a front-end UI component library. You are very familiar with the source code of this component library. You are also proficient in using the front-end React and Vue frameworks. You are best at writing Vue version code based on the React version source code.`,
    '',
    `Below is the source code of the React version of the Notify component`,
    getSource(`packages/arcodesign/components/notify/`, /.(ts|tsx|js|jsx|less|md)$/),
    `Below is the source code of the Vue version of the Notify component`,
    getSource(`packages/arcodesign-vue/components/notify/`, /.(vue|ts|tsx|js|jsx|less|md)$/),
    '',
    `Below is the source code of the React version of the Cell component`,
    getSource(`packages/arcodesign/components/cell/`, /.(ts|tsx|js|jsx|less|md)$/),
    `Below is the source code of the Vue version of the Cell component`,
    getSource(`packages/arcodesign-vue/components/cell/`, /.(vue|ts|tsx|js|jsx|less|md)$/),
    '',
    `Below is the source code of the React version of the Button component`,
    getSource(`packages/arcodesign/components/button/`, /.(ts|tsx|js|jsx|less|md)$/),
    '',
    // `请根据 Notify 和 Cell 组件源代码示例，根据 Button React 版本的代码，编写 Button 组件 Vue 版本的代码，你需要先完成目录结构的设计，后面我将一步一步询问你每个文件的源码内容`,
    `Please write the Vue version of the Button component based on the React version of the Button component source code. For code specifications and naming styles, you can refer to the Notify and Cell component source codes of the two versions. You need to complete the directory structure design first, and then tell me the source code of each file.`,

    // 请注意
    `Please note: Write the code according to Vue 3.2. You do not need to analyze the code. Just reply to the directory structure and code content directly`,
];

// 准备
const outputFile = `sites/sitemap/component button prompt.txt`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, prompts.join('\n'));
