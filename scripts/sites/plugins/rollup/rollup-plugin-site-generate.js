const path = require('path');
const axios = require('axios');
const generateToken = require('../../../../packages/arcodesign/tokens/scripts/generate/generate');
const { generateSite } = require('../SiteGeneratePlugin/generate-site');
const generateIcon = require('../SiteGeneratePlugin/generate-icon');
const rootPath = path.resolve(__dirname, '../../../../');

module.exports = function siteGeneratePlugin() {
    let latestVersion = '0.0.0';
    const originOptions = {};
    return {
        name: 'site-generate',
        configResolved() {
            axios.get('https://registry.npmjs.org/@arco-design/mobile-react')
                .then(data => {
                    latestVersion = Object.keys(data.data.versions).pop();
                })
                .catch(_ => {
                    console.log('>>> fetch npm version failed');
                })
                .finally(() => {
                    console.log('>>> Compile started. Generating sites...');
                    originOptions.tokenInfo = generateToken().tokenInfo;
                    originOptions.latestVersion = latestVersion;
                    generateSite(originOptions);
                    generateIcon(originOptions);
                });
        },
        handleHotUpdate(ctx) {
            const changeFile = ctx.file;
            const tokenPath = path.join(rootPath, 'packages/arcodesign/tokens/src/arcodesign');

            const reg = new RegExp(`${tokenPath}.+\\/index.js`);
            if (changeFile && reg.test(changeFile)) {
                console.log('>>> vite Hot Update. Generating token again...');
                try {
                    generateToken();
                } catch (e) {
                    console.log('generate token error', e);
                }
                return;
            }

            const matchComp = changeFile.match(/\/components\/([\w|-]+)\/demo\/[\w|-]+\.md$/);
            if (changeFile && matchComp && matchComp[1]) {
                console.log('>>> vite Hot Update. Generating token again...');
                try {
                    generateSite({
                        ...originOptions,
                        compileComps: [matchComp[1]]
                    });
                } catch (e) {
                    console.log('>>> generate demo error', e);
                }
                return;
            }

            const matchIcon = changeFile.match(/\/components\/icon\//);
            if (changeFile && matchIcon && matchIcon[1]) {
                console.log('>>> vite Hot Update. Generating icon again...');
                try {
                    generateIcon(originOptions);
                } catch(e) {
                    console.log('>>> generate icon error', e);
                }
                return;
            }
        }
    }
}