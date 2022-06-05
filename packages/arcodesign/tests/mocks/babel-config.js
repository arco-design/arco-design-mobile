const babelConfig = {
    presets: [
        ['@babel/preset-env', {
            loose: true,
        }],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
    ],
};

module.exports = babelConfig;
