const babelConfig = require('../../babel.config');

function changeBabelModule(moduleType) {
    const { presets = [] } = babelConfig;
    const newPresets = [...presets];
    newPresets.forEach((preset, index) => {
        const env = '@babel/preset-env';
        const envConfig = {
            modules: moduleType,
            // 我选择不参与各大库的core-js之争...
            // useBuiltIns: 'usage',
            // corejs: 3,
        };
        if (preset === env) {
            newPresets[index] = [env, envConfig];
        } else if (Array.isArray(preset) && preset[0] === env) {
            newPresets[index] = [
                env,
                {
                    ...(preset[1] || {}),
                    ...envConfig,
                },
            ];
        }
    });
    return {
        ...babelConfig,
        presets: newPresets,
    };
}

module.exports = {
    changeBabelModule,
};
