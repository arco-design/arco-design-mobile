const path = require('path');
const rootPath = path.resolve(__dirname, '../../../../');
const generateToken = require('../../../../packages/arcodesign/tokens/scripts/generate/generate');
const { generateSite } = require('./generate-site');
const generateIcon = require('./generate-icon');

class DemoGeneratePlugin {
    constructor(options) {
        this.options = options || {
            languages: ['ch', 'en']
        };
    }
    generateTokens() {
        try {
            const result = generateToken(this.options);
            if (result && result.tokenInfo) {
                return result.tokenInfo;
            }
            return null;
        } catch (e) {
            console.error('generate token error', e);
            return null;
        }
    }
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('afterPlugins', () => {
            console.log('>>> Compile started. Generating sites...');
            this.options.tokenInfo = this.generateTokens();
            generateSite(this.options);
            generateIcon(this.options);
        });
        compiler.hooks.watchRun.tap('WatchRun', (comp) => {
            const changedTimes = comp.watchFileSystem.watcher.mtimes;
            const changedFiles = Object.keys(changedTimes).join(',');
            const pagePath = path.join(rootPath, this.options.siteFolder || 'sites/pc/pages');
            const tokenPath = 'tokens/src/arcodesign';
            const reg = new RegExp(`${tokenPath}.+\\/index.js`);
            if (changedFiles && reg.test(changedFiles)) {
                this.options.tokenInfo = this.generateTokens();
            }
            if (changedFiles && changedFiles.indexOf(pagePath) < 0) {
                console.log('>>> Files changed. Generating sites again...');
                generateSite(this.options);
                generateIcon(this.options);
            }
        });
    }
}

module.exports = DemoGeneratePlugin;
