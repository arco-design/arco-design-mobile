const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildContextPlugin = require('./plugins/BuildContextPlugin')
const baseConfig = require('./webpack.common.js');
const genBaseConfig = require('./genBaseConfig');

const sitePath = path.resolve(__dirname, '../../sites');

const devConfig = merge(genBaseConfig(baseConfig, 'home'), {
    mode: 'development',
    entry: {
        index: path.join(sitePath, 'home/entry/index.tsx'),
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
        port: 8824,
        allowedHosts: "all",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'home/template/index.html'),
            chunks: ['index'],
            filename: 'index.html',
        }),
        new BuildContextPlugin(),
    ],
    externals: [
        { "Arco": 'Arco' },
        { "react": "React" },
        { "react-dom": "ReactDOM" },
    ]
})

module.exports = devConfig;
