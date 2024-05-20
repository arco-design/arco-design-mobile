const generateDemo = require('./generate-demo');

module.exports = function demoGeneratePlugin() {
    return {
        name: 'demo-generate',
        configResolved() {
            generateDemo();
        },
        handleHotUpdate(ctx) {
            const changeFile = ctx.file;
            const matchComp = changeFile.match(/\/components\/([\w|-]+)\/__demo__\/[\w|-]+\.md$/);
            if (changeFile && matchComp && matchComp[1]) {
                try {
                    generateDemo({
                        compileComps: [matchComp[1]]
                    });
                } catch (e) {
                    console.log('generate demo error', e);
                }
            }
        }
    }
}
