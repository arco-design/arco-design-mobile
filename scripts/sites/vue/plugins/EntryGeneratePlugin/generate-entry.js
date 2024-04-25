const fs = require('fs-extra');
const path = require('path');
const utils = require('../../../../utils');
const { compPath } = require('../utils/path');


function generateEntry() {
    const compTsEntryPath = path.join(compPath, 'components.ts');
    const compStyleEntryPath = path.join(compPath, 'style.ts');
    fs.removeSync(compTsEntryPath);
    fs.removeSync(compStyleEntryPath);

    const compNames = utils.getAllComps(compPath).filter(comp => !['icon'].includes(comp));
    const compsStr = compNames.map(comp => utils.getCompName(comp)).join(',\n');
    let compEntryStr = `${compNames.map(comp => `import { ${utils.getCompName(comp)} } from './${comp}';`).join('\n')}

    export {${compsStr}};

    export const components = {${compsStr}};
    `;
    let styleEntryStr = `import '../style/public.less';`;
    compNames.forEach(comp => {
        // 组件样式入口文件内容
        const stylePath = path.join(compPath, comp, 'style/index.ts');
        if (fs.existsSync(stylePath)) {
            styleEntryStr += `import './${comp}/style';`;
        }
    });

    compEntryStr = utils.formatTsCode(compEntryStr);

    fs.writeFile(compTsEntryPath, compEntryStr, () => {
        console.log('>>> Write components entry file finished.');
    });

    styleEntryStr = utils.formatTsCode(styleEntryStr);

    fs.writeFile(compStyleEntryPath, styleEntryStr, () => {
        console.log('>>> Write components style entry file finished.');
    });
}

module.exports = generateEntry;
