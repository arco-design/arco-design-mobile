const presets = [
    ['@babel/preset-env', {
        modules: false,
        loose: true,
        targets: {
            browsers: [
                'iOS 7',
                'Android >= 4',
            ],
        },
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
];
const env = {
    test: {
        presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
    },
};
const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
];

module.exports = { presets, plugins, env };
