const path = require('path');
const generateToken = require('../../../../../packages/arcodesign-vue/tokens/scripts/generate/generate');
const { rootPath } = require('../utils/path');

module.exports = function entryGeneratePlugin() {
    return {
        name: 'token-generate',
        configResolved() {
            generateToken();
        },
        handleHotUpdate(ctx) {
            const changeFile = ctx.file;
            const tokenPath = path.join(rootPath, 'packages/arcodesign-vue/tokens/src/arcodesign');

            const reg = new RegExp(`${tokenPath}.+\\/index.js`);
            if (changeFile && reg.test(changeFile)) {
                console.log('>>> vite Hot Update. Generating token again...');
                try {
                    generateToken();
                } catch (e) {
                    console.log('generate token error', e);
                }
            }
        }
    }
}
