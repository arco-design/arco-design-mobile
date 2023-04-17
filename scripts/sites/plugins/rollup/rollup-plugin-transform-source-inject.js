const path = require('path');
const fs = require('fs');

function replaceAll(origin, target, source) {
    return source.replace(new RegExp(origin.replace(/\$/g,"\\$"),"g"), target);
}

function genOptions (type) {
    return process.env.ARCO_BUILD_TYPE === 'inner' ? {
        rootPath: path.resolve(__dirname, '../../../../..'),
        workDir: `arcom-github/sites/${type}/entry`,
        injectDir: `sites/${type}/inject`
    } : {
        rootPath: path.resolve(__dirname, '../../../..'),
        workDir: `sites/${type}/entry`,
        injectDir: `sites/${type}/inject`
    };
}

module.exports = function transformSourceInjectPlugin(type) {
    const { injectDir, workDir, rootPath } = genOptions(type);
    return {
        name: 'inject-loader',
        transform(src, id) {
            const injectFileReg = new RegExp(path.join(rootPath, workDir), 'g');
            if (injectFileReg.test(id)) {
                const injectFilePath = id.replace(workDir, injectDir);
                if (fs.existsSync(injectFilePath)) {
                    src = fs.readFileSync(injectFilePath, 'utf-8');
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
                    src = replaceAll(key, config[key], src);
                }
            }
            return {
                code: src,
                map: null
            };
        }
    }
}