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

// 这个函数将链接写入Markdown文件
function createSitemap(dir, reg, outputFile) {
    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ];
    for (const filePath of getFileList(dir, reg)) {
        // 将文件路径转换为链接
        const link = `https://raw.githubusercontent.com/arco-design/arco-design-mobile/main/${filePath}`;
        sitemap.push('<url>', `<loc>${link}</loc>`, '</url>');
    }
    sitemap.push('</urlset>');

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, sitemap.join('\n'));
}
// 这个函数将链接写入Markdown文件
function createSiteTxt(dir, reg, outputFile) {
    const sitemap = [];
    for (const filePath of getFileList(dir, reg)) {
        // 将文件路径转换为链接
        const link = `https://raw.githubusercontent.com/arco-design/arco-design-mobile/main/${filePath}`;
        sitemap.push(link);
    }

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, sitemap.join('\n'));
}

// 要遍历的文件夹路径
const targetDir = './packages/arcodesign/components/';

// 执行函数
createSitemap(targetDir, /.(tsx|ts|less)$/, `sites/sitemap/component-button-source.xml`);
createSiteTxt(targetDir, /.(tsx|ts|less)$/, `sites/sitemap/component-button-files.txt`);
