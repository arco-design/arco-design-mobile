const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const languageUtils = require('../../../utils/language');
const localeMap = require('../../../utils/language.json');
const rootPath = path.resolve(__dirname, '../../../../');
const { renderNavIntro, renderReadmeTable } = require('./helpers');


function generateIconDemoByLang(language) {
    const compFolder = path.join('packages/arcodesign', 'components');
    const compPath = path.join(rootPath, compFolder);
    let readmeStr = [];
    const suffix = languageUtils.lang2SuffixMap[language] || '';
    const mdSuffix = suffix ? `.${suffix}`: suffix;
    const tsxFileSuffix = suffix ? `-${suffix}`: suffix;
    try {
        const readme = fs.readFileSync(path.join(compPath, 'icon', `README${mdSuffix}.md`), 'utf-8');
        const readmeSplit = readme.split(/=====+/);
        const { source: introSource } = renderNavIntro(readmeSplit[0], localeMap.components[language]);
        const { source: propsSource } = renderReadmeTable(readmeSplit[1]);
        readmeStr[0] = `<div className="demo-nav-intro" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
            introSource,
        )} }} />`;
        readmeStr[1] = `<div className="demo-props" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
            propsSource,
        )} }} />`;
    } catch (e) {
        readmeStr = [];
    }

    const iconDir = path.join(compPath, 'icon');
    let iconMap = ``;
    const iconImportStr = fs
        .readdirSync(iconDir)
        .filter(
            dirName =>
                fs.lstatSync(path.join(iconDir, dirName)).isDirectory() &&
                dirName.startsWith('Icon'),
        )
        .reduce((pre, cur) => {
            iconMap += `    {${cur}: <${cur} useCurrentColor={false} />},\n`;
            return (pre += `import ${cur} from '../../../../../packages/arcodesign/components/icon/${cur}';\n`);
        }, '');

    const svgCode = `
import React from 'react';
import { Message } from 'arco';
${iconImportStr}

const icons = [
${iconMap}
];

export default function SvgIcons() {
    function handleClickIcon(icon) {
        window.copyToClipboard(\`\<\${icon\} />\`);
        Message.success(\`<\$\{icon\} /> ${localeMap.copySuccess[language]}\`);
    }
    return (
        <>
        {icons.map((icon, i) => {
            const entries = Object.entries(icon);
            return (
                <li className="icon-cell" onClick={() => handleClickIcon(entries[0][0])} key={i}>
                    <p className="icon-name">{entries[0][0]}</p>
                    <div className="icon-show">
                       {entries[0][1]}
                    </div>
                </li>
            );
        })}
        </>
    )
}
`;

    const demoCode = `import React from 'react'
import IconContainer from '../../../entry/icon';
import SvgIcons from './svg${tsxFileSuffix}';
import { LanguageSupport } from '../../../../utils/language';
interface IProps {
    language?: LanguageSupport;
}
export default function Demo({ language = LanguageSupport.CH}: IProps) {
    return (
        <div className="pc-site-wrapper">
            ${readmeStr[0] || ''}
            <div className="pc-site-content" id="demo-icon">
                <div className="demo-doc-description" style={{ padding: 0 }}>
                    <p>${localeMap.manualIntroduction[language]}</p>
                    <pre className="demo-code-content">
                        <code>import IconAsk from '@arco-design/mobile-react/esm/icon/IconAsk';</code>
                    </pre>
                    <p>${localeMap.demandIntroduction[language]}</p>
                    <pre className="demo-code-content">
                        <code>import &#123; IconAsk &#125; from '@arco-design/mobile-react/esm/icon';</code>
                    </pre>
                </div>
                <IconContainer language={language}>
                    <SvgIcons />
                </IconContainer>
                ${readmeStr[1] || ''}
            </div>
        </div>
    )
}`;

    const docPath = path.join(rootPath, 'sites/pc/pages/components', 'icon');

    fs.mkdirpSync(docPath);
    fs.writeFile(path.join(docPath, `index${tsxFileSuffix}.tsx`), demoCode, () => {
        console.log(`>>> Write IconComp Success`);
    });
    fs.writeFile(path.join(docPath, `svg${tsxFileSuffix}.tsx`), svgCode, () => {
        console.log('>>> Write SvgComp Success');
    });
}
function generateIconDemo({
    languages = ['ch', 'en']
}) {
    languages.map(lang => generateIconDemoByLang(lang));
}
module.exports = generateIconDemo;
