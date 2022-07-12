const rollup = require('rollup');
const path = require('path');
const autoprefixer = require('autoprefixer');
const url = require('postcss-url');
const ResolvePlugin = require('@rollup/plugin-node-resolve').default;
const CommonjsPlugin = require('@rollup/plugin-commonjs');
const AliasPlugin = require('@rollup/plugin-alias');
const BabelPlugin = require('@rollup/plugin-babel').default;
const TsPlugin = require('@rollup/plugin-typescript');
const ReplacePlugin = require('@rollup/plugin-replace');
const PostcssPlugin = require('rollup-plugin-postcss');
const { terser: TerserPlugin } = require('rollup-plugin-terser');
const NpmImportPlugin = require('less-plugin-npm-import');
const fs = require('fs-extra');
const { changeBabelModule } = require('./pack-util');

const babelConfig = changeBabelModule(false);

const compPath = path.resolve(__dirname, './components');
const { presets, plugins } = babelConfig;

function buildJs(uglify) {
    return new Promise((resolve, reject) => {
        rollup
            .rollup({
                input: path.resolve(compPath, 'index.ts'),
                external: ['react', 'react-dom', 'react-transition-group'],
                plugins: [
                    ResolvePlugin(),
                    TsPlugin({
                        declaration: false,
                    }),
                    BabelPlugin({
                        presets,
                        plugins,
                        babelrc: false,
                        babelHelpers: 'runtime',
                        exclude: /node_modules/,
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    }),
                    CommonjsPlugin({
                        include: /node_modules/,
                    }),
                    AliasPlugin({
                        resolve: ['.ts', '.tsx', '/index.tsx', '/index.ts', '.js', '/index.js'],
                    }),
                    ReplacePlugin({
                        'process.env.NODE_ENV': JSON.stringify('production'),
                    }),
                    ...(uglify ? [TerserPlugin()] : []),
                ],
            })
            .then(async bundle => {
                await bundle
                    .write({
                        file: path.resolve(__dirname, `dist/index${uglify ? '.min' : ''}.js`),
                        format: 'umd',
                        name: 'Arco',
                        globals: {
                            react: 'React',
                            'react-dom': 'ReactDOM',
                            'react-transition-group': 'ReactTransitionGroup',
                        },
                    })
                    .catch(e => {
                        reject(e);
                    });
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

function buildCss(uglify) {
    return new Promise((resolve, reject) => {
        rollup
            .rollup({
                input: path.resolve(compPath, 'style.ts'),
                plugins: [
                    ResolvePlugin(),
                    TsPlugin({
                        declaration: false,
                    }),
                    BabelPlugin({ babelHelpers: 'runtime' }),
                    CommonjsPlugin({
                        include: /node_modules/,
                    }),
                    PostcssPlugin({
                        minimize: Boolean(uglify),
                        extract: true,
                        use: [
                            [
                                'less',
                                {
                                    javascriptEnabled: true,
                                    plugins: [new NpmImportPlugin({ prefix: '~' })],
                                },
                            ],
                        ],
                        plugins: [autoprefixer, url({ url: 'inline' })],
                    }),
                    AliasPlugin({
                        resolve: ['.ts', '.tsx', '/index.tsx', '/index.ts', '.js', '/index.js'],
                    }),
                ],
            })
            .then(async bundle => {
                await bundle
                    .write({
                        file: path.resolve(__dirname, `dist/style${uglify ? '.min' : ''}.js`),
                        format: 'umd',
                        name: 'bundle',
                    })
                    .catch(e => {
                        reject(e);
                    });
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

// 按组件名分别打包
(async function () {
    await Promise.all([buildJs(), buildCss(), buildJs(true), buildCss(true)]).catch(e => {
        console.error(e);
    });
    fs.removeSync(path.resolve(__dirname, 'dist/style.js'));
    fs.removeSync(path.resolve(__dirname, 'dist/style.min.js'));
})();
