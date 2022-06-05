const path = require('path');
const rootPath = path.resolve(__dirname, '../../../../');
const generateDemo = require('./generate-demo');

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
            [
                ...new Set(
                    [...comp.fileTimestamps.keys()]
                        .filter(key => Boolean(key.match(/(^.+components\/[^/]+)/g)))
                        .map(e => e.match(/(^.+components\/[^/]+)/g)[0] + '/demo'),
                ),
            ].forEach(dir => {
                comp.contextDependencies.add(dir);
            });
        });
        compiler.hooks.watchRun.tap('WatchRun', comp => {
            const changedTimes = comp.watchFileSystem.watcher.mtimes;
            const changedFiles = Object.keys(changedTimes).join(',');
            const pagePath = path.join(rootPath, this.options.siteFolder || 'sites/pages');
            if (changedFiles && changedFiles.indexOf(pagePath) < 0) {
                console.log('>>> Files changed. Generating demos again...');
                generateDemo(this.options);
            }
        });
    }
}

module.exports = DemoGeneratePlugin;
