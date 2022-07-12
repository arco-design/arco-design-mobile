const path = require('path');
const fs = require('fs-extra');
const { validate } = require('schema-utils');

function replaceAll(origin, target, source) {
    return source.replace(new RegExp(origin.replace(/\$/g,"\\$"),"g"), target);
}

const optionsSchema = {
    type: 'object',
    properties: {
        rootPath: {
            type: 'string'
        },
        workDir: {
            type: 'string'
        },
        injectDir: {
            type: 'string'
        }
    }
};

module.exports = function (source) {
    const options = this.query;
    validate(optionsSchema, options);

    const { rootPath, workDir, injectDir } = options;

    const injectFileReg = new RegExp(path.join(rootPath, workDir), 'g');
    if (injectFileReg.test(this.resourcePath)) {
        const injectFilePath = this.resourcePath.replace(workDir, injectDir);
        if (fs.existsSync(injectFilePath)) {
            source = fs.readFileSync(injectFilePath, 'utf-8');
        }
    }

    const injectConfigPath = path.join(rootPath, injectDir, 'inject.config.js');
    if (fs.existsSync(injectConfigPath)) {
        let config = {};
        try {
            config = require(injectConfigPath);
        } catch (e) {
            config = {};
            console.warn('require inject.config.js error, please check file type correct');
        }
        for (const key in config) {
            source = replaceAll(key, config[key], source);
        }
    }

    return source;
}