const path = require('path');
const fs = require('fs');
const rootPath = path.resolve(__dirname, '../../../../');
const generateDemo = require('./generate-demo');
const componentsDir = path.resolve(rootPath, 'packages/arcodesign/components');
const components = fs.readdirSync(componentsDir);
const demoPaths = components
    .filter(path => !path.includes('.') && !path.startsWith('_'))
    .map(dir => path.resolve(componentsDir, dir, 'demo'));
const compositeCompDir = path.resolve(rootPath, 'sites/composite-comp');
const compositeComp = fs.readdirSync(compositeCompDir);
const compositeDemoPaths = compositeComp
    .filter(path => !path.includes('.') && !path.startsWith('_'))
    .map(dir => path.resolve(compositeCompDir, dir));

class DemoGeneratePlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('afterPlugins', () => {
            console.log('>>> Compile started. Generating demos...');
            generateDemo(this.options);
        });
        compiler.hooks.afterCompile.tap('afterCompile', comp => {
            comp.contextDependencies.addAll(demoPaths);
            comp.contextDependencies.addAll(compositeDemoPaths);
        });
        compiler.hooks.watchRun.tap('WatchRun', comp => {
            const changedTimes = comp.modifiedFiles;
            const changedFiles = changedTimes ? [...changedTimes].join('') : '';
            const pagePath = path.join(rootPath, this.options.siteFolder || 'sites/mobile/pages/components');
            if (changedFiles && changedFiles.indexOf(pagePath) < 0 ) {
                console.log('>>> Files changed. Generating demos again...');
                generateDemo(this.options);
            }
        });
    }
}

module.exports = DemoGeneratePlugin;
