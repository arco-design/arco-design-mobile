const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DemoGeneratePlugin = require('./plugins/DemoGeneratePlugin');
const TokenGeneratePlugin = require('./plugins/TokenGeneratePlugin');
const baseConfig = require('./webpack.common.js');

const sitePath = path.resolve(__dirname, '../../sites');
const publicPath = process.env.PUBLIC_PATH;

const devConfig = merge(baseConfig, {
    mode: 'production',
    entry: {
        index: path.join(sitePath, 'mobile/entry/index.tsx'),
    },
    output: {
        path: path.join(__dirname, '../../output_resource/mobile'),
        publicPath: publicPath ? `${publicPath}/mobile` : '',
        filename: 'js/[name]_[chunkhash:8].js',
        chunkFilename: 'js/[name]_[chunkhash:8].js',
    },
    plugins: [
        new DemoGeneratePlugin(),
        new TokenGeneratePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'mobile/template/index.html'),
            chunks: ['index'],
            filename: '../../output/page/mobile/index.html',
        }),
    ],
})

module.exports = devConfig;
