const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SiteGeneratePlugin = require('./plugins/SiteGeneratePlugin');
const BuildContextPlugin = require('./plugins/BuildContextPlugin')
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
        port: 8823,
        open: true,
        allowedHosts: "all",
    },
    plugins: [
        new SiteGeneratePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sitePath, 'pc/template/index.html'),
            chunks: ['index'],
            filename: 'index.html',
        }),
        new BuildContextPlugin(),
    ],
    externals: [
        { "arco": 'arco' },
        { "react": "React" },
        { "react-dom": "ReactDOM" },
    ]
})

module.exports = devConfig;
