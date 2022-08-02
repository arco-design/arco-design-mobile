const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');
const axios = require('axios');

function getCdnBaseUrl(file, version) {
    return `https://unpkg.com/@arco-design/mobile-react@${version}/dist/${file}`;
}

(async function getLatestVersion() {
    const arcoPackage = path.resolve(__dirname, '../../packages/arcodesign');
    const widgetsPackage = path.resolve(__dirname, '../../packages/common-widgets');
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
        const { data } = await(axios.get(`https://registry.npmjs.org/@arco-design/mobile-react`));
        const versions = Object.keys(data.versions);
        if (!versions.includes(version)) {
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
    Promise.all(['README.md', 'README.en-US.md'].map(file => {
        return new Promise(resolve => {
            const readmePath = path.resolve(arcoPackage, file);
            const readmeStr = fs.readFileSync(readmePath, 'utf8');
            let newReadme = readmeStr.replace(/```\s+<link[\s\S]+<\/script>\s+```/, `\`\`\`\n${newCdn}\n\`\`\``);
            fs.writeFile(readmePath, newReadme, () => { resolve(readmePath) });
        })
    })).then(res => {
        const rootPath = path.resolve(__dirname, '../..');
        const packageJsonPath = path.resolve(arcoPackage, 'package.json');
        const widgetsPackagePath = path.resolve(widgetsPackage, 'package.json');
        childProcess.execSync(`cd ${rootPath} && ${res.map(readmePath => ` git add ${readmePath} `).join('&&')} && git add ${packageJsonPath} && git add ${widgetsPackagePath} && git commit -m "build: update readme" && git push origin main`, {
            stdio: 'inherit'
        });
        console.log(`\n 更新 README CDN 地址成功`);
    }, () => {
        console.log(`\n 更新 README CDN 地址失败`)
    });
}());
