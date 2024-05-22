import _ from 'lodash';
import { statSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

///// 辅助函数 /////
// 递归函数来遍历文件夹
function walkDir(dir, callback) {
    readdirSync(dir).forEach(f => {
        let dirPath = join(dir, f);
        let isDirectory = statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(join(dir, f));
    });
}

// 源代码相关处理类，获取文件列表
class Code {
    constructor(dir, fileReg) {
        this._dir = dir;
        this._fileReg = fileReg;
    }
    // 获取文件列表
    fileList() {
        const fileList = [];
        walkDir(this._dir, filePath => {
            if (filePath.match(this._fileReg)) {
                fileList.push(filePath);
            }
        });
        return fileList;
    }

    // 获取目录内容
    directory() {
        const fileList = this.fileList();

        // 生成目录结构
        const contents = [
            `The source code directory is ${this._dir}, which contains the following files:`,
            ...fileList.map(i => '- ' + i),
            '\n',
        ];

        return contents.join(',');
    }

    // 获取目录内容和文件内容
    directoryAndContent() {
        const fileList = this.fileList();

        // 生成目录结构
        const contents = [
            `The source code directory is ${this.fileList}, which contains the following files:`,
            ...fileList.map(i => '- ' + i),
            '\n',
        ];

        // 生成每个文件内容
        for (const filePath of fileList) {
            const fileContent = readFileSync(filePath, { encoding: 'utf-8' }).trim();
            contents.push(`Code for ${filePath}: `, fileContent, '\n');
        }
        return contents.join('\n');
    }
}

// React 源代码
export class ReactCode extends Code {
    constructor(comp) {
        const dir = `packages/arcodesign/components/${_.snakeCase(comp)}/`;
        const fileReg = /.(ts|tsx|js|jsx|less)$/;
        super(dir, fileReg);
    }
}

// Vue 源代码
export class VueCode extends Code {
    constructor(comp) {
        const dir = `packages/arcodesign-vue/components/${_.snakeCase(comp)}/`;
        const fileReg = /.(vue|ts|js|less)$/;
        super(dir, fileReg);
    }
}
