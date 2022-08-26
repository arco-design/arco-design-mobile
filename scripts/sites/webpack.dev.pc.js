const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SiteGeneratePlugin = require('./plugins/SiteGeneratePlugin');
const baseConfig = require('./webpack.common.js');
const genBaseConfig = require('./genBaseConfig');

const sitePath = path.resolve(__dirname, '../../sites');

const devConfig = merge(genBaseConfig(baseConfig, 'pc'), {
    mode: 'development',
    entry: {
        index: path.join(sitePath, 'pc/entry/index.tsx'),
    },
    output: {
        path: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        static:{
            directory:'./'
        },
        liveReload: true,
        port: 8823,
        allowedHosts:'all'
    },
    plugins: [
        new SiteGeneratePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'pc/template/index.html'),
            chunks: ['index'],
            filename: 'index.html',
        }),
    ],
    externals: [
        { "arco": 'arco'},
        { "react": "React" },
        { "react-dom": "ReactDOM" },
    ]
})

module.exports = devConfig;
