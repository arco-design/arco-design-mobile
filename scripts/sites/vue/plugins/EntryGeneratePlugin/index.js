const generateEntry = require('./generate-entry');

module.exports = function entryGeneratePlugin() {
    return {
        name: 'entry-generate',
        configResolved() {
            generateEntry();
        }
    }
}
