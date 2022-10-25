const path = require('path');
const axios = require('axios');
const rootPath = path.resolve(__dirname, '../../../../');
const generateToken = require('../../../../packages/arcodesign/tokens/scripts/generate/generate');
const { generateSite } = require('./generate-site');
const generateIcon = require('./generate-icon');

class SiteGeneratePlugin {
    constructor(options) {
        this.options = options || {
            languages: ['ch', 'en']
        };
        this.initial = true;
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
        compiler.hooks.beforeCompile.tapAsync('beforeCompile', (_, callback) => {
            if (this.initial) {
                this.initial = false;
                let latestVersion = '0.0.0';
                axios.get('https://registry.npmjs.org/@arco-design/mobile-react')
                    .then(data => {
                        latestVersion = Object.keys(data.data.versions).pop();
                    })
                    .catch(_ => {
                        console.log('fetch npm version failed');
                    })
                    .finally(() => {
                        console.log('>>> Compile started. Generating sites...');
                        this.options.tokenInfo = this.generateTokens();
                        this.options.latestVersion = latestVersion;
                        generateSite(this.options);
                        generateIcon(this.options);
                        callback();
                    });
            } else {
                callback();
            }
        });
        compiler.hooks.watchRun.tap('WatchRun', (comp) => {
            const changedTimes = comp.modifiedFiles
            const changedFiles = changedTimes ? [...changedTimes].join('') : ''
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

module.exports = SiteGeneratePlugin;
