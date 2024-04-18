const { marked } = require('marked');
const fs = require('fs-extra');
const path = require('path');
const prism = require('../../../../sites/pc/static/js/prism');
const utils = require('../.././../utils');
const localeMap = require('../../../utils/language.json');
/**
 * 渲染「开发指南」部分的doc
 */
function renderSiteMdSource(md, language = 'ch') {
    const renderer = new marked.Renderer();
    let name = '';
    renderer.heading = (text, level) => {
        name = text;
        if (level === 1) {
            return `<p class="demo-doc-type">${
                utils.getUpperPhase(localeMap.developmentGuide[language]) || '开发指南'
            }</p>
            <h1 class="demo-doc-name">${text}</h1>`;
        }
        return `<h${level} class="demo-doc-text">${text}</h${level}>`;
    };
    renderer.code = code => {
        const formatScript = prism.highlight(code, prism.languages.jsx, 'jsx');
        return `<div class="demo-code-content">
            <pre><code class="demo-code">${formatScript}</code></pre>
        </div>`;
    };
    renderer.paragraph = text => {
        return `<p class="demo-doc-desc demo-doc-text">${text}</p>`;
    };
    return {
        source: marked(md, { renderer }),
        name,
    };
}
/**
 * 渲染「FAQ」部分的doc
 */
function renderSiteFAQSource(md, language = 'ch') {
    const renderer = new marked.Renderer();
    return marked(md, { renderer });
}

/** 渲染组件 nav intro */
function renderNavIntro(
    readme,
    title = '组件',
    defaultType = '其他',
    classNames = '',
    idPrefix = '',
) {
    if (!readme) {
        return {
            source: '',
        };
    }
    const renderer = new marked.Renderer();
    let name = '',
        desc = '',
        type = defaultType;
    renderer.heading = (text, level) => {
        if (level === 3) {
            type = text.trim() || defaultType;
            return `<p class="demo-comp-type">
                <span>${title}</span>
                <span class="separator">/</span>
                <strong>${type}</strong>
            </p>`;
        }
        if (level === 1) {
            name = text;
            return `<h1 class="demo-comp-name ${classNames}" ${
                idPrefix ? 'id="' + idPrefix + text.replace(/[^a-zA-Z]/g, '') + '"' : ''
            }>${text}</h1>`;
        }
        return '';
    };
    renderer.paragraph = text => {
        desc = text;
        return `<p class="demo-comp-desc">${text.replace('\n', '<br>')}</p>`;
    };
    const result = marked(readme, { renderer });

    return {
        source: result,
        name,
        type,
        desc,
    };
}

/**
 * 渲染组件中的“属性”为table
 */
function renderReadmeTable(readme, language = 'ch') {
    if (!readme) {
        return {
            source: '',
        };
    }
    const renderer = new marked.Renderer();
    const headerCount = {};
    renderer.heading = (text, level) => {
        if (!headerCount[level]) {
            headerCount[level] = 0;
        }
        headerCount[level] += 1;
        if (level === 1) {
            const nowId = `${level}-${headerCount[level]}`;
            return `<div class="demo-title" id="${nowId}">${text}</div>`;
        }
        return '';
    };
    renderer.paragraph = text => {
        return `<p class="demo-desc">${text}</p>`;
    };
    renderer.blockquote = text => {
        return `<div class="demo-attr">${text.replace(/<.*?>/g, '')}</div>`;
    };
    renderer.table = (header, body) => {
        const headerMatch = header.match(/<th.*?>(.*?)<\/th>/g);
        const typeIndex = headerMatch
            ? headerMatch.findIndex(item => item.indexOf(localeMap.type[language] || '类型') >= 0)
            : -1;
        const defaultIndex = headerMatch
            ? headerMatch.findIndex(
                  item => item.indexOf(localeMap.defaultValue[language] || '默认值') >= 0,
              )
            : -1;
        let newBody = body;
        // “类型”这一列body为蓝色字体
        if (typeIndex >= 0) {
            let typeBodyCount = -1;
            newBody = body.replace(/<td.*?>/g, value => {
                typeBodyCount += 1;
                const currentIndex = typeBodyCount % headerMatch.length;
                if (currentIndex === typeIndex || currentIndex === defaultIndex) {
                    return '<td class="special">';
                }
                return value;
            });
        }

        // 设置特定列定宽
        const newHeader = header
            .replace(
                /<th>(参数|名称|默认值|Property|DefaultValue)<\/th>/g,
                '<th class="props-names">$1</th>',
            )
            .replace(/<th>(类型|Type)<\/th>/g, '<th class="props-type">$1</th>');
        return `<table><thead>${newHeader}</thead><tbody>${newBody}</tbody></table>`;
    };
    const result = marked(readme, { renderer });
    return {
        source: result,
    };
}

/** 渲染demo代码块 */
function renderDemoSource(demoPath, demoName, language = 'ch') {
    const renderer = new marked.Renderer();
    const rendererStyle = new marked.Renderer();
    const demo = fs.readFileSync(path.join(demoPath, `${demoName}.md`), 'utf8');
    let order = 0;
    let codeSource = '';
    let title = '';
    let paragraphSlotContent = '';
    let styleSource = '';
    renderer.code = (code, info) => {
        if (info === 'js') {
            codeSource = code;
            const formatScript = prism.highlight(code, prism.languages.jsx, 'jsx');
            return `<div class="demo-code-content">
                <pre><code class="demo-code">${formatScript}</code></pre>
            </div>`;
        }
        if (info === 'desc') {
            paragraphSlotContent += `<p className='demo-code-desc-content'>${code}</p>`;
        }
        return '';
    };

    renderer.heading = (text, level) => {
        if (level === 2 || level === 3) {
            const lastText = utils.getReadMeTextByLang(text, language);
            title = lastText;
            return '';
        }
        if (level === 4) {
            order = Number(text) || 0;
        }
        return '';
    };

    renderer.paragraph = text => {
        paragraphSlotContent += `<p className='demo-code-desc-content'>${utils.getReadMeTextByLang(
            text,
            language,
        )}</p>`;
        return '';
    };

    rendererStyle.code = (code, info) => {
        if (info === 'less' || info === 'less-global') {
            code = utils.replaceStyleLessVars(code);
            styleSource += code;
            const formatStyle = prism.highlight(code, prism.languages.css, 'css');
            return `
                <div class='demo-code-content'>
                    <pre><code class='demo-code'>${formatStyle}</code></pre>
                </div>
            `;
        }
        return '';
    };
    rendererStyle.heading = () => '';
    rendererStyle.paragraph = () => '';

    const result = marked(demo, { renderer });
    const style = marked(demo, { renderer: rendererStyle });

    return {
        order,
        title,
        source: result,
        style,
        styleSource: utils.formatLessCode(styleSource),
        codeSource,
        paragraphSlotContent,
    };
}

const cssSourceCompileCache = {};
async function transferLessToCSS(lessSources, useCache) {
    const cssSources = {};
    if (Object.keys(lessSources).length) {
        await Promise.all(Object.keys(lessSources).map(key =>
            new Promise(resolve => {
                const cssSource = lessSources[key];
                if (useCache && cssSourceCompileCache[key]) {
                    resolve(cssSourceCompileCache[key]);
                } else {
                    utils
                        .transferLessToCSS(`@import "./packages/arcodesign/style/mixin.less";\n${cssSource}`)
                        .then(css => {
                            cssSources[key] = css;
                            cssSourceCompileCache[key] = css;
                            resolve(css);
                        });
                }

            })
        ));
    }
    return cssSources;
}

module.exports = {
    renderSiteMdSource,
    renderNavIntro,
    renderDemoSource,
    renderReadmeTable,
    renderSiteFAQSource,
    transferLessToCSS
};
