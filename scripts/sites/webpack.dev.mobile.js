const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const DemoGeneratePlugin = require('./plugins/DemoGeneratePlugin');
const TokenGeneratePlugin = require('./plugins/TokenGeneratePlugin');
const utils = require('../utils');
const baseConfig = require('./webpack.common.js');
const sitePath = path.resolve(__dirname, '../../sites');

const filterComp = (process.env.FILTER_COMP || '').split(' ')
    .filter(e => e)
    .map(utils.getFolderName);

const devConfig = merge(baseConfig, {
    mode: 'development',
    entry: {
        index: path.join(sitePath, 'mobile/entry/index.tsx'),
        // 这里加上token是为了监听到js变化
        token: path.resolve(__dirname, '../../packages/arcodesign/tokens/src/arcodesign/index.js'),
    },
    output: {
        path: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: './',
        inline: true,
        port: 8822,
        disableHostCheck: true,
        ...(filterComp.length
            ? {
                  open: true,
                  openPage: `http://localhost:8822/#/components/${filterComp[0]}`,
              }
            : {}),
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        // 取消报错会下降一倍速度
        // new HardSourceWebpackPlugin.ExcludeModulePlugin([
        //     {
        //         test: /less/,
        //     },
        // ]),
        new VConsolePlugin({ enable: true }),
        new DemoGeneratePlugin({
            filterComp,
        }),
        new TokenGeneratePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'mobile/template/index.html'),
            chunks: ['index'],
            filename: 'index.html',
        }),
    ],
});

module.exports = devConfig;
