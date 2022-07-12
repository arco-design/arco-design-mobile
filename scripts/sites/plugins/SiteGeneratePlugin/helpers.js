const prism = require('../../../../sites/pc/static/js/prism');
const { marked } = require('marked');
const fs = require('fs-extra');
const path = require('path');
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
            return `<p class="demo-doc-type">${utils.getUpperPhase(localeMap.developmentGuide[language]) || '开发指南'}</p>
            <h1 class="demo-doc-name">${text}</h1>`;
        }
        return `<h${level}>${text}</h${level}>`;
    };
    renderer.code = code => {
        const formatScript = prism.highlight(code, prism.languages.jsx, 'jsx');
        return `<div class="demo-code-content">
            <pre><code class="demo-code">${formatScript}</code></pre>
        </div>`;
    };
    renderer.paragraph = text => {
        return `<p class="demo-doc-desc">${text}</p>`;
    };
    return {
        source: marked(md, { renderer }),
        name,
    };
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
        return `<p class="demo-comp-desc">${text}</p>`;
    };
    const result = marked(readme, { renderer });
    return {
        source: result,
        name,
        type,
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
            ? headerMatch.findIndex(item => item.indexOf(localeMap.defaultValue[language]  || '默认值') >= 0)
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
            .replace(/<th>(参数|名称|默认值|Property|DefaultValue)<\/th>/g, '<th class="props-names">$1</th>')
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
    const demo = fs.readFileSync(path.join(demoPath, `${demoName}.md`), 'utf8');
    let order = 0;
    let codeSource = '';
    let title = '';
    renderer.code = code => {
        codeSource = code;
        const formatScript = prism.highlight(code, prism.languages.jsx, 'jsx');
        return `<div class="demo-code-content">
            <pre><code class="demo-code">${formatScript}</code></pre>
        </div>`;
    };

    renderer.heading = (text, level) => {

        if (level === 2 || level === 3) {
            const lastText = utils.getReadMeTextByLang(text, language);
            title = lastText;
            return `<h2 class="demo-code-title">${lastText}</h2>`;
        }
        if (level === 4) {
            title = text;
            order = Number(text) || 0;
        }
        return '';
    };

    renderer.paragraph = text => {
        return `<p class="demo-code-desc">${utils.getReadMeTextByLang(text, language)}</p>`;
    };

    const result = marked(demo, { renderer });
    return {
        order,
        title,
        source: result,
        codeSource,
    };
}

module.exports = {
    renderSiteMdSource,
    renderNavIntro,
    renderDemoSource,
    renderReadmeTable,
};
