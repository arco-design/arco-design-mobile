const generateDemo = require('../sites/plugins/DemoGeneratePlugin/generate-demo');
const generateToken = require('../../packages/arcodesign/tokens/scripts/generate/generate');

switch (process.argv[2]) {
    default:
        generateDemo();
        generateToken();
        break;
}
