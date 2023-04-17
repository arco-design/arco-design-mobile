const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');
const DemoGeneratePlugin = require('./plugins/DemoGeneratePlugin');
const TokenGeneratePlugin = require('./plugins/TokenGeneratePlugin');
const utils = require('../utils');
const baseConfig = require('./webpack.common.js');
const sitePath = path.resolve(__dirname, '../../sites');

const compileComps = (process.env.FILTER_COMP || '').split(' ')
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
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    snapshot: {
        managedPaths: [path.resolve(__dirname, '../../node_modules')],
        buildDependencies: {
            timestamp: true
        },
        module: {
            hash: true
        },
        resolve: {
            hash: true,
        },
    },
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        static: {
            directory: path.join(__dirname, "./")
        },
        port: 8822,
        allowedHosts: "all",
        open: true,
        ...(compileComps.length
            ? {
                open: true,
                openPage: `http://localhost:8822/#/components/${compileComps[0]}`,
            }
            : {}),
    },
    plugins: [
        new VConsolePlugin({ enable: true }),
        new DemoGeneratePlugin({
            compileComps
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
