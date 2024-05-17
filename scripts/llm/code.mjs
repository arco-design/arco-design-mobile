import { statSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// 递归函数来遍历文件夹
function walkDir(dir, callback) {
    readdirSync(dir).forEach(f => {
        let dirPath = join(dir, f);
        let isDirectory = statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(join(dir, f));
    });
}

export class SourceCode {
    // 获取全部文件列表
    getFileList(dir, reg) {
        const list = [];
        walkDir(dir, function (filePath) {
            if (filePath.match(reg)) {
                list.push(filePath);
            }
        });
        return list;
    }

    getDirectoryContent(dir, reg) {}

    // 获取某个目录下所有的源代码
    getCodeContent(dir, reg) {
        const fileList = this.getFileList(dir, reg);

        // 生成目录结构
        const contents = [
            `The source code directory is ${dir}, which contains the following files:`,
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
