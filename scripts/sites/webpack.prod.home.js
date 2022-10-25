const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SiteGeneratePlugin = require('./plugins/SiteGeneratePlugin');
const baseConfig = require('./webpack.common.js');
const genBaseConfig = require('./genBaseConfig');

const sitePath = path.resolve(__dirname, '../../sites');
const publicPath = process.env.PUBLIC_PATH;

const devConfig = merge(genBaseConfig(baseConfig, 'home'), {
    mode: 'production',
    entry: {
        index: path.join(sitePath, 'home/entry/index.tsx'),
    },
    output: {
        path: path.join(__dirname, '../../output_resource/home'),
        publicPath: publicPath ? `${publicPath}/home` : '',
        filename: 'js/[name]_[chunkhash:8].js',
        chunkFilename: 'js/[name]_[chunkhash:8].js',
    },
    plugins: [
        new SiteGeneratePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'home/template/index.html'),
            chunks: ['index'],
            filename: '../../output/page/home/index.html',
        }),
    ],
    externals: [
        { "Arco": 'Arco' },
        { "react": "React" },
        { "react-dom": "ReactDOM" },
    ]
})

module.exports = devConfig;
