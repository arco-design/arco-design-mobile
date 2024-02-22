const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const { renderNavIntro, renderReadmeTable } = require('./helpers');
const { marked } = require('marked');
const prism = require('../../../../sites/pc/static/js/prism');
const utils = require('../../../utils');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');

const itemList = [];

function readFileName(path) {
    const pathName = path.replace(/\.readme.*\.md/i, '');
    const matchRes = path.match(/\.readme(.*)\.md/i);
    if (matchRes.length > 1) {
        const fileSuffix = matchRes[1].replace(/\./, '-');
        const lang =
            fileSuffix.slice(1) in languageUtils.suffix2LangMap
                ? languageUtils.suffix2LangMap[fileSuffix.slice(1)]
                : 'ch';
        return { pathName, fileSuffix, language: lang };
    }
    return { pathName, fileSuffix: '' };
}

function getContentStr(
    func,
    functionSourceMdPath,
    functionSourceOutput,
    resourceRoutes,
    category,
    type,
) {
    const { pathName, fileSuffix: tsxFileSuffix, language } = readFileName(func.slice());
    // const mdFileName = pathName.replace(/-(\w)/g, function (_, $1) {
    //     return $1.toUpperCase();
    // });
    const { importStr, docStr } = generateResourcePage(
        path.join(functionSourceMdPath, func),
        pathName,
        path.join(functionSourceOutput, pathName),
        resourceRoutes,
        category,
        {
            tsxFileSuffix,
            language,
        },
        type,
    );

    return {
        importStr,
        docStr,
    };
}

function generateResource(resourcePagePath, docPath) {
    let resourceImportStr = '';
    let resourceDocStr = '';
    const resourceRoutes = {};
    // 公用开发资源
    const functionSourceMdPath = path.join(docPath, 'function');
    const mixinSourceMdPath = path.join(docPath, 'mixin');
    const functionSourceOutput = path.join(resourcePagePath, 'function');
    const mixinSourceOutput = path.join(resourcePagePath, 'mixin');
    fs.removeSync(resourcePagePath);
    fs.mkdirpSync(functionSourceOutput);
    fs.mkdirpSync(mixinSourceOutput);
    const functionDir = fs.existsSync(functionSourceMdPath)
        ? fs.readdirSync(functionSourceMdPath)
        : [];
    const mixinSource = fs.existsSync(mixinSourceMdPath) ? fs.readdirSync(mixinSourceMdPath) : [];

    functionDir.forEach(dir => {
        const totalPath = path.join(functionSourceMdPath, dir);
        const stat = fs.lstatSync(totalPath);
        if (stat.isDirectory()) {
            const functionSource = fs.readdirSync(totalPath);
            functionSource.forEach(func => {
                const { importStr, docStr } = getContentStr(
                    func,
                    totalPath,
                    functionSourceOutput,
                    resourceRoutes,
                    'function',
                    dir,
                );
                resourceImportStr += importStr;
                resourceDocStr += docStr;
            });
        } else {
            const { importStr, docStr } = getContentStr(
                dir,
                functionSourceMdPath,
                functionSourceOutput,
                resourceRoutes,
                'function',
            );
            resourceImportStr += importStr;
            resourceDocStr += docStr;
        }
    });

    mixinSource.forEach(dir => {
        const totalPath = path.join(mixinSourceMdPath, dir);
        const stat = fs.lstatSync(totalPath);
        if (stat.isDirectory()) {
            const mixinSource = fs.readdirSync(totalPath);
            mixinSource.forEach(mixin => {
                const { importStr, docStr } = getContentStr(
                    mixin,
                    totalPath,
                    mixinSourceOutput,
                    resourceRoutes,
                    'mixin',
                    dir,
                );
                resourceImportStr += importStr;
                resourceDocStr += docStr;
            });
        } else {
            const { importStr, docStr } = getContentStr(
                dir,
                mixinSourceMdPath,
                mixinSourceOutput,
                resourceRoutes,
                'mixin',
            );
            resourceImportStr += importStr;
            resourceDocStr += docStr;
        }
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
    fs.writeFile(
        path.join(resourcePagePath, `search.json`),
        JSON.stringify(itemList, null, 4),
        () => {
            console.log('>>> Write sites search list file finished');
        },
    );
    itemList.splice(0, itemList.length);
}

// demo部分
function renderFuncSource(md, type) {
    if (!md) {
        return {
            source: '',
        };
    }
    const renderer = new marked.Renderer();
    let codeSource = '';
    renderer.code = code => {
        codeSource = code;
        const formatScript =
            type === 'mixin'
                ? prism.highlight(code, prism.languages.less, 'less')
                : prism.highlight(code, prism.languages.jsx, 'jsx');
        return `<Code showCodePen={false} codeSource="${encodeURIComponent(
            codeSource,
        )}" code={<div className="demo-code-wrapper
            no-padding-top
        " dangerouslySetInnerHTML={{ __html: ${JSON.stringify(`<div class="demo-code-content">
        <pre><code class="demo-code">${formatScript}</code></pre>
    </div>`)} }} />} />`;
    };
    renderer.heading = (text, level) => {
        if (level === 2 || level === 3) {
            return `<h2 className="demo-code-title">${text}</h2>`;
        }
        return '';
    };

    renderer.paragraph = text => {
        return `<p className="demo-code-desc">${text}</p>`;
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
function generateResourcePage(
    filePath,
    mdFilename,
    outputFolder,
    resourceRoutes,
    category = 'utils',
    { tsxFileSuffix = '', language = 'ch' },
    type = 'other',
) {
    let importStr = '';
    let docStr = '';
    const md = fs.readFileSync(filePath, 'utf8');
    if (!md.trim()) {
        return { importStr, docStr };
    }
    // 同个文件中多个函数或hooks用------隔开
    const mdSplit = md.split(/---+\n/);

    if (!/^###/.test(mdSplit[0])) {
        mdSplit[0] = `### ${category} ${mdFilename}\n\n` + mdSplit[0];
    }

    const typeStr = mdSplit[0].split(' ')[0] + ' ' + mdSplit[0].split(' ')[1]; // eg: ### hooks
    const nameStr = mdSplit[0].split(' ')[2] || mdFilename;
    const routeStr = (mdSplit[0].split(' ')[3] || mdFilename).replace(/[\n]/g, '');

    let mdFileStr = `import React from 'react';
import Code from '../../../../entry/code';
export default function Demo() {
    return (
        <div className="pc-site-wrapper arco-resource">`;
    let pageStr = `\n`;
    const prefix = category.slice(0, 1).toUpperCase();
    mdSplit.slice(1).forEach((md, index) => {
        // 各部分内容使用======分隔开
        const funcSplit = md.split(/=====+/);
        // 介绍
        const {
            source: introSource,
            name,
            desc,
        } = renderNavIntro(
            index === 0 ? typeStr + funcSplit[0] : funcSplit[0],
            localeMap.developmentResource[language],
            'type',
            'resource-title',
            'res-',
        );
        itemList.push({
            category,
            filename: mdFilename,
            functionName: name,
            description: desc,
        });

        // 代码
        const { source: codeSource, source } = renderFuncSource(funcSplit[1], category);

        // 属性等
        const { source: propsSource } = renderReadmeTable(funcSplit[2]);
        let readmeStr = [];
        try {
            readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                introSource,
            )} }} />`;
            readmeStr[1] = source;
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
        const mdDocName = `${prefix.toLowerCase()}-${routeStr}${tsxFileSuffix}`;
        importStr += `import ${mdCompName} from './${category}/${mdFilename}${
            tsxFileSuffix ? `/index${tsxFileSuffix}` : ''
        }';\n`;
        docStr += `    '${mdDocName}': ${mdCompName},\n`;
        const resourceRoute = {
            name: nameStr,
            key: mdDocName,
        };
        if (!tsxFileSuffix) {
            if (!resourceRoutes[category]) {
                resourceRoutes[category] = {};
            }
            !resourceRoutes[category][type]
                ? (resourceRoutes[category][type] = [resourceRoute])
                : resourceRoutes[category][type].push(resourceRoute);
        }
    } catch (err) {
        console.info(`>>>>> 写入出错啦 >>>>>\n`, err);
    }
    return { importStr, docStr };
}

module.exports = { generateResource, generateResourcePage };
