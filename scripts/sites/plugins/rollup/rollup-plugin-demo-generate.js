const path = require('path');
const generateDemo = require('../DemoGeneratePlugin/generate-demo');
const generateToken = require('../../../../packages/arcodesign/tokens/scripts/generate/generate');
const rootPath = path.resolve(__dirname, '../../../../');

module.exports = function demoGeneratePlugin() {
    const baseConfig = {
        compileEnv: 'vite'
    };
    return {
        name: 'demo-generate',
        configResolved() {
            generateDemo(baseConfig);
            generateToken();
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
            }

            const matchComp = changeFile.match(/\/components\/([\w|-]+)\/demo\/[\w|-]+\.md$/);
            if (changeFile && matchComp && matchComp[1]) {
                try {
                    generateDemo({
                        ...baseConfig,
                        compileComps: [matchComp[1]]
                    });
                } catch (e) {
                    console.log('generate demo error', e);
                }
            }
        }
    }
}