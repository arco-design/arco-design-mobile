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
    //<?xml version="1.0" encoding="UTF-8"?>

    // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    //     <url>
    //         <loc>http://www.example.com/</loc>

    //         <lastmod>2005-01-01</lastmod>

    //         <changefreq>monthly</changefreq>

    //         <priority>0.8</priority>
    //     </url>
    // </urlset>;
    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ];
    for (const filePath of getFileList(dir, reg)) {
        // 将文件路径转换为链接
        const link = `https://raw.githubusercontent.com/arco-design/arco-design-mobile/main/${filePath}`;
        // const link = `https://cdn.jsdelivr.net/gh/arco-design/arco-design-mobile/${filePath}`;
        // sitemap.push(`<div><a href="${link}">${filePath}</a></div>`);
        // sitemap.push(link);
        sitemap.push('<url>', `<loc>${link}</loc>`, '</url>');
    }
    sitemap.push('</urlset>');

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, sitemap.join('\n'));
}

// 要遍历的文件夹路径
const targetDir = './packages/arcodesign/components/';

// 执行函数
createSitemap(targetDir, /.(tsx)$/, `sites/sitemap/component-button-source.xml`);
