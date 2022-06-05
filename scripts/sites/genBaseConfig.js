const path = require('path');

module.exports = function (baseConfig, type) {
    baseConfig.module.rules.push({
        test: /\.(tsx|less)?$/,
        use: [
            {
                loader: path.resolve(__dirname, 'loader/inject.loader.js'),
                options: process.env.BUILD_TYPE === 'inner' ? {
                    rootPath: path.resolve(__dirname, '../../..'),
                    workDir: `arcom-github/sites/${type}/entry`,
                    injectDir: `sites/${type}/inject`
                } : {
                    rootPath: path.resolve(__dirname, '../..'),
                    workDir: `sites/${type}/entry`,
                    injectDir: `sites/${type}/inject`
                }
            }
        ],
        enforce: 'pre'
    });
    return baseConfig;
}