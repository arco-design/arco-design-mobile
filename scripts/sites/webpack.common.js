const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!\/webpack-dev-server)/,
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            onlyCompileBundledFiles: true,
                            compilerOptions: {
                                declaration: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: ['Android >= 4.3', 'iOS >= 8'],
                                    }),
                                ],
                            }
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    '@use-css-vars': 1
                                }
                            }
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.md$/,
                type: "asset",
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@arco-design/mobile-react$': '@arco-design/mobile-react/components/index.ts',
            '@arco-design/mobile-utils$': '@arco-design/mobile-utils/utils/index.ts',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],
};
