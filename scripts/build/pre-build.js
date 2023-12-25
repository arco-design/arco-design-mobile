const generateToken = require('../../packages/arcodesign/tokens/scripts/generate/generate');

switch (process.argv[2]) {
    default:
        generateToken();
        break;
}
