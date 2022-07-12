const { marked } = require('marked');
const fs = require('fs-extra');
const path = require('path');
const utils = require('../../../utils');
const rootPath = path.resolve(__dirname, '../../../../');
const localeMap = require('../../../utils/language.json');

function getAllComps() {
    const compFolder = path.join(rootPath, 'packages/arcodesign/components');
    return utils.getAllComps(compFolder);
}

function getTokenComp(key, allComps, language = 'ch') {
    const realKey = key.replace(/^dark-/, '');
    const firstKeyComps = allComps.filter(comp => comp.indexOf(realKey.split('-')[0]) !== -1);
    let index = -1;
    let count = 0;
    firstKeyComps.forEach((comp, i) => {
        if (realKey.startsWith(comp) && comp.length > count) {
            index = i;
            count = comp.length;
        }
    });
    if (index !== -1) {
        return firstKeyComps[index];
    }
    return localeMap.global[language];
}
function getDescByLang(descInfo, language = 'ch') {
    if (!descInfo || !descInfo.localeDesc) {
        return descInfo ? descInfo.desc || '' : '';
    }
    return descInfo.localeDesc[language] || descInfo.desc;
}
function generateTokenPage(tokenInfo, outputPath, language = 'ch') {
    if (!tokenInfo) {
        return;
    }
    const allComps = getAllComps();
    const tableMd = Object.keys(tokenInfo)
        .map(theme => {
            const curTheme = tokenInfo[theme] || {};
            return `## ${theme} ${localeMap.theme[language]}\n\n|${localeMap.owningComponent[language]}|${localeMap.variableName[language]}|${localeMap.variableDesc[language]}|${localeMap.variable[language]}|${localeMap.formerName[language]}|\n|----|----|----|----|----|\n${Object.keys(
                curTheme,
            )
                .map(key => {
                    const curToken = curTheme[key] || {};
                    const isDark = /^dark-/.test(curToken.cssKey);
                    const realKey = isDark
                        ? utils.getCompName(curToken.cssKey.replace(/^dark-/, ''), true)
                        : '';
                    const lastDesc = getDescByLang(curToken, language);
                    const lastKeyDesc = getDescByLang(curTheme[realKey], language);

                    return `|${getTokenComp(curToken.cssKey, allComps)}|@${curToken.cssKey}|${
                        realKey && !lastDesc && curTheme[realKey] && lastKeyDesc
                            ? `${lastKeyDesc}${localeMap.darkMode[language]}`
                            : lastDesc
                    }|${(curToken.value || '').replace(/`/g, '\\`')}|${
                        realKey &&
                        !curToken.override &&
                        curTheme[realKey] &&
                        curTheme[realKey].override
                            ? `@dark-${curTheme[realKey].override}`
                            : `${curToken.override ? `@${curToken.override}` : ''}`
                    }|`;
                })
                .join('\n')}`;
        })
        .join('\n');
    const renderer = new marked.Renderer();
    const source = marked(tableMd, { renderer });
    const mdFileContent = `import React from 'react';

export default function MarkDownFile() {
    return (
        <div className="pc-site-wrapper">
            <div className="demo-doc-intro">
                <p className="demo-doc-type">${utils.getUpperPhase(localeMap.developmentGuide[language])}</p>
                <h1 className="demo-doc-name">${localeMap.variableDescription[language]}</h1>
                <p className="demo-doc-desc">${localeMap.variableDescParagraph[language]}</p>
            </div>
            <div
                className="pc-site-content"
                id="token-page"
            >
                <div
                    className="token-page-table-wrap"
                    dangerouslySetInnerHTML={{ __html: ${JSON.stringify(source)} }}
                />
            </div>
        </div>
    );
}`;
    fs.writeFile(outputPath, mdFileContent, () => {
        console.log('>>> Write token page finished');
    });
}

module.exports = generateTokenPage;
