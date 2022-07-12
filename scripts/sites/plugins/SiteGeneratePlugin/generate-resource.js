const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const { renderNavIntro, renderReadmeTable } = require('./helpers');
const { marked } = require('marked');
const prism = require('../../../../sites/pc/static/js/prism');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');


function readFileName (path) {
    const pathName = path.replace(/\.readme.*\.md/i, '');
    const matchRes = path.match(/\.readme(.*)\.md/i);
    if(matchRes.length > 1) {
        const fileSuffix = matchRes[1].replace(/\./, '-')
        const lang = fileSuffix.slice(1) in languageUtils.suffix2LangMap ? languageUtils.suffix2LangMap[fileSuffix.slice(1)] : 'ch';
        return { pathName, fileSuffix, language: lang };
    }
    return { pathName, fileSuffix: '' }
}
function generateResource(resourcePagePath, docPath) {
    let resourceImportStr = '';
    let resourceDocStr = '';
    const resourceRoutes = {};
    // 公用开发资源
    const hooksSourceMdPath = path.join(docPath, 'hooks');
    const utilsSourceMdPath = path.join(docPath, 'utils');
    const mixinSourceMdPath = path.join(docPath, 'mixin');
    const hooksSourceOutput = path.join(resourcePagePath, 'hooks');
    const utilsSourceOutput = path.join(resourcePagePath, 'utils');
    const mixinSourceOutput = path.join(resourcePagePath, 'mixin');
    fs.removeSync(resourcePagePath)
    fs.mkdirpSync(hooksSourceOutput);
    fs.mkdirpSync(utilsSourceOutput);
    fs.mkdirpSync(mixinSourceOutput);
    const hooksSource = fs.readdirSync(hooksSourceMdPath);
    const utilsSource = fs.readdirSync(utilsSourceMdPath);
    const mixinSource = fs.readdirSync(mixinSourceMdPath);
    hooksSource.forEach(hook => {
        const { pathName: mdFileName, fileSuffix: tsxFileSuffix, language } = readFileName(hook.slice());
        const { importStr, docStr } = generateResourcePage(
            path.join(hooksSourceMdPath, hook),
            mdFileName,
            path.join(hooksSourceOutput, mdFileName),
            resourceRoutes,
            'hooks',
            {
                tsxFileSuffix,
                language
            }
        );
        resourceImportStr += importStr;
        resourceDocStr += docStr;
    });
    utilsSource.forEach(util => {
        const { pathName, fileSuffix: tsxFileSuffix, language } = readFileName(util.slice());
        const mdFileName = pathName.replace(/-(\w)/g, function (_, $1) {
                return $1.toUpperCase();
            });
        const { importStr, docStr } = generateResourcePage(
            path.join(utilsSourceMdPath, util),
            mdFileName,
            path.join(utilsSourceOutput, mdFileName),
            resourceRoutes,
            'utils',
            {
                tsxFileSuffix,
                language
            }
        );
        resourceImportStr += importStr;
        resourceDocStr += docStr;
    });
    mixinSource.forEach(mixin => {
        const { pathName: mdFileName, fileSuffix: tsxFileSuffix, language } = readFileName(mixin.slice());
        const { importStr, docStr } = generateResourcePage(
            path.join(mixinSourceMdPath, mixin),
            mdFileName,
            path.join(mixinSourceOutput, mdFileName),
            resourceRoutes,
            'mixin',
            {
                tsxFileSuffix,
                language
            }
        );
        resourceImportStr += importStr;
        resourceDocStr += docStr;
    });
    const resourceEntryStr = `${resourceImportStr}
const docs = {\n${resourceDocStr}};

export default docs;
`;
    // 写公用开发资源routes文件
    fs.writeFile(
        path.join(resourcePagePath, `index.json`),
        JSON.stringify(resourceRoutes, null, 4),
        () => {
            console.log('>>> Write sites resource route file finished');
        },
    );
    fs.writeFile(path.join(resourcePagePath, `index.ts`), resourceEntryStr, () => {
        console.log('>>> Write sites resource route file finished');
    });
}

// demo部分
function renderFuncSource(md) {
    if (!md) {
        return {
            source: '',
        };
    }
    const renderer = new marked.Renderer();
    let codeSource = '';
    renderer.code = code => {
        codeSource = code;
        const formatScript = prism.highlight(code, prism.languages.jsx, 'jsx');
        return `<div class="demo-code-content">
            <pre><code class="demo-code">${formatScript}</code></pre>
        </div>`;
    };
    renderer.heading = (text, level) => {
        if (level === 2 || level === 3) {
            return `<h2 class="demo-code-title">${text}</h2>`;
        }
        return '';
    };

    renderer.paragraph = text => {
        return `<p class="demo-code-desc">${text}</p>`;
    };

    const result = marked(md, { renderer });
    return {
        source: result,
        codeSource,
    };
}

/**
 * 站点生成--开发资源
 * @param {源文件路径} filePath
 * @param {文件名} mdFilename
 * @param {生成结果文件夹} outputFolder
 * @param {解析类型} type
 */
function generateResourcePage(filePath, mdFilename, outputFolder, resourceRoutes, type = 'utils', {tsxFileSuffix = '', language = 'ch'}) {
    let importStr = '';
    let docStr = '';
    const md = fs.readFileSync(filePath, 'utf8');
    if (!md.trim()) {
        return { importStr, docStr };
    }
    // 同个文件中多个函数或hooks用------隔开
    const mdSplit = md.split(/---+\n/);

    if (!/^###/.test(mdSplit[0])) {
        mdSplit[0] = `### ${type} ${mdFilename}\n\n` + mdSplit[0];
    }
    const typeStr = mdSplit[0].split(' ')[0] + ' ' + mdSplit[0].split(' ')[1]; // eg: ### hooks
    const nameStr = mdSplit[0].split(' ')[2] || mdFilename;

    let mdFileStr = `import React from 'react';
import Code from '../../../../entry/code';
export default function Demo() {
    return (
        <div className="pc-site-wrapper arco-resource">`;
    let pageStr = `\n`;
    const prefix = type.slice(0, 1).toUpperCase();
    mdSplit.slice(1).forEach((md, index) => {
        // 各部分内容使用======分隔开
        const funcSplit = md.split(/=====+/);
        // 介绍
        const { source: introSource, name } = renderNavIntro(
            index === 0 ? typeStr + funcSplit[0] : funcSplit[0],
            localeMap.developmentResource[language],
            'type',
            'resource-title',
            'res-',
        );

        // 代码
        const { source: codeSource, source } = renderFuncSource(funcSplit[1]);

        // 属性等
        const { source: propsSource } = renderReadmeTable(funcSplit[2]);
        let readmeStr = [];
        try {
            readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                introSource,
            )} }} />`;
            readmeStr[1] = `<Code codeSource="${encodeURIComponent(
                codeSource,
            )}" code={<div className="demo-code-wrapper
                no-padding-top
            " dangerouslySetInnerHTML={{ __html: ${JSON.stringify(source)} }} />} />`;
            readmeStr[2] = `<div className="demo-props" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                propsSource,
            )} }} />`;
            pageStr += `           ${readmeStr[0] || ''}
            <div className="pc-site-content" id="demo-${name}">
                ${readmeStr[1] || ''}
                ${readmeStr[2] || ''}
            </div>`;
        } catch (err) {
            console.info(`>>>>> 解析出错啦 >>>>>\n`, err);
            readmeStr = [];
        }
    });
    try {
        fs.mkdirpSync(outputFolder);
        mdFileStr +=
            pageStr +
            `
        </div>
    );
}
`;
        fs.writeFile(path.join(outputFolder, `index${tsxFileSuffix}.tsx`), mdFileStr, err => {
            if (!err) {
                console.log(`>>> Write sites resource file finished: ` + mdFilename);
            } else {
                console.log('啊哦>_<出错啦');
            }
        });
        const mdCompName = `${prefix}${utils.getCompName(`${mdFilename}${tsxFileSuffix}`)}`;
        const mdDocName = `${prefix.toLowerCase()}-${utils.getFolderName(mdFilename)}${tsxFileSuffix}`;
        importStr += `import ${mdCompName} from './${type}/${mdFilename}${tsxFileSuffix ? `/index${tsxFileSuffix}` : ''}';\n`;
        docStr += `    '${mdDocName}': ${mdCompName},\n`;
        const resourceRoute = {
            name: nameStr,
            key: mdDocName,
        };
        if (!resourceRoutes[type]) {
            !tsxFileSuffix && (resourceRoutes[type] = [resourceRoute]);
        } else {
            !tsxFileSuffix && resourceRoutes[type].push(resourceRoute);
        }
    } catch (err) {
        console.info(`>>>>> 写入出错啦 >>>>>\n`, err);
    }
    return { importStr, docStr };
}

module.exports = { generateResource, generateResourcePage };
