const axios = require('axios');
const generateToken = require('../../../../../packages/arcodesign-vue/tokens/scripts/generate/generate');
const { generateSite } = require('../SiteGeneratePlugin/generate-site');
const generateSite = require('./generate-site');

module.exports = function siteGeneratePlugin() {
    let latestVersion = '0.0.0';
    const originOptions = {};
    return {
        name: 'site-generate',
        configResolved() {
            axios.get('https://registry.npmjs.org/@arco-design/mobile-vue')
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
                });
        },
        handleHotUpdate(ctx) {
            const changeFile = ctx.file;
            const matchComp = changeFile.match(/\/components\/([\w|-]+)\/__demo__\/[\w|-]+\.md$/);
            if (changeFile && matchComp && matchComp[1]) {
                console.log('>>> vite Hot Update. Generating site again...');
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
        }
    }
}
