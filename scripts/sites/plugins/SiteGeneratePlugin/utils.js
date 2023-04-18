const fs = require('fs-extra');
const path = require('path');
const localeMap = require('../../../utils/language.json');
const { renderDemoSource, renderNavIntro } = require('./helpers');
const { renderSiteFAQSource } = require('./helpers');

/**
 * 把 README.md 渲染「组件/复合组件文档站」中的 header 部分
 */
function renderComponentsHeader({
    compSrcPath, // 组件根目录
    comp, // 组件名
    mdSuffix, // md 国际化变量
    language, // 语言
}) {
    let readmeStr = [];
    try {
        const readme = fs.readFileSync(path.join(compSrcPath, comp, `README${mdSuffix}.md`), 'utf8');
        const { source: introSource, } = renderNavIntro(readme, localeMap.compositeComp[language], localeMap.others[language]);
        readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
            introSource,
        )} }} />`;
    } catch (e) {
        readmeStr = [];
    }
    return readmeStr;
}

/**
 * 把 demo.md 渲染「组件/复合组件文档站」中的内容部分
 */
function renderComponentsDemos({
    demoSrcPath, // demo 根目录
    comp, // 组件名
    language = 'ch', // 语言
    latestVersion, // 最后的版本号
}) {
    let demos = null;
    try {
        demos = fs.readdirSync(path.join(demoSrcPath));
    } catch (e) {
        return;
    }
    const demoSource = [];
    demos.forEach(name => {
        if (name.indexOf('.md') < 0 || name.indexOf('README') >= 0) {
            return;
        }
        const demoName = name.replace('.md', '');
        const { order, source, codeSource, title } = renderDemoSource(demoSrcPath, demoName, language);
        demoSource.push({
            order,
            source: `<Code codeSource="${encodeURIComponent(
                codeSource
            )}" version="${latestVersion}" compKey="${comp}" demoKey="demo-${comp}" name="${title}" code={<div className="demo-code-wrapper" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                source,
            )} }} />} language={language || LanguageSupport.CH} />`,
        });
    });
    demoSource.sort((a, b) => a.order - b.order);
    return demoSource;
}

/**
 * 渲染「组件文档站」中的 FAQ 内容部分
 */
function renderComponentsFAQ({
    faqSrcPath, // 组件当前目录
    language, // 语言
}) {
    let faqNodeStr = '';
    try {
        const faqMd = fs.readFileSync(faqSrcPath, 'utf8');
        const faqNode = renderSiteFAQSource(faqMd || '', language);
        faqNodeStr = `<div className="demo-doc-description no-padding" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
            faqNode,
        )} }} />`
    } catch (e){};
    return faqNodeStr;
}

module.exports = {
    renderComponentsHeader,
    renderComponentsDemos,
    renderComponentsFAQ,
};
