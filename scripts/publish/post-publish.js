const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

function getCdnBaseUrl(file, version) {
    return `https://unpkg.com/browse/@arco-design/mobile-react@${version}/dist/${file}`;
}

(function getLatestVersion() {
    const arcoPackage = path.resolve(__dirname, '../../packages/arcodesign');
    let version = '';
    try {
        const packStr = fs.readFileSync(path.resolve(arcoPackage, 'package.json'), 'utf8');
        const pack = JSON.parse(packStr);
        version = pack.version;
    } catch (e) {
        throw new Error(`检测当前版本失败：${e.message || e}`);
    }

    // 检查外网npm包版本是否为最新
    try {
        const npmVersion = childProcess.execSync('npm show @arco-design/mobile-react version --registry https://registry.npmjs.org/').toString().trim();
        console.log('version-npmVersion: ', version, npmVersion);
        if (version !== npmVersion) {
            throw '检测到 npm 包未成功发布，请检查 pipeline 结果';
        }
    } catch (e) {
        throw new Error(e || 'npm 版本获取失败');
    }

    let newCdn = '';
    console.log(`\n压缩产物通过unpkg上传到cdn，产物地址：`);
    [{
        file: 'style.min.css',
        tag: `<link ref="stylesheet" href="$url$">\n`
    }, {
        file: 'index.min.js',
        tag: `<script src="$url$"></script>`
    }].forEach(type => {
        const cdnUrl = getCdnBaseUrl(type.file, version);
        newCdn += type.tag.replace('$url$', cdnUrl);
        console.log(cdnUrl);
    });
    
    const readmePath = path.resolve(arcoPackage, 'README.md');
    const packageJsonPath = path.resolve(arcoPackage, 'package.json');
    const readmeStr = fs.readFileSync(readmePath, 'utf8');
    let newReadme = readmeStr.replace(/```\s+<link[\s\S]+<\/script>\s+```/, `\`\`\`\n${newCdn}\n\`\`\``);
    fs.writeFile(readmePath, newReadme, () => {
        const rootPath = path.resolve(__dirname, '../..');
        // TODO: git push
        childProcess.execSync(`cd ${rootPath} && git add ${readmePath} && git add ${packageJsonPath} && git commit -m "build: update readme" -n`, {
            stdio: 'inherit'
        });
        console.log(`\n 更新 README CDN 地址成功`);
    });
}());