const path = require('path');
const rootPath = path.resolve(__dirname, '../../../../');
const generateToken = require('../../../../packages/arcodesign/tokens/scripts/generate/generate');

class DemoGeneratePlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('afterPlugins', () => {
            console.log('>>> Compile started. Generating token...');
            try {
                generateToken(this.options);
            } catch (e) {
                console.error('generate token error', e);
            }
        });
        compiler.hooks.watchRun.tap('WatchRun', (comp) => {
            const changedFiles = comp.modifiedFiles;
            const tokenPath = 'tokens/src/arcodesign';
            const reg = new RegExp(`${tokenPath}.+\\/index.js`);
            if (changedFiles && [...changedFiles].some((file) => reg.test(file))) {
                console.log('>>> Files changed. Generating token again...');
                try {
                    generateToken(this.options);
                } catch (e) {
                    console.error('generate token error', e);
                }
            }
        });
    }
}

module.exports = DemoGeneratePlugin;
