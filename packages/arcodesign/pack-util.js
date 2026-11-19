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

    const newPlugins = (babelConfig.plugins || []).map(plugin => {
        const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
        if (pluginName === '@babel/plugin-transform-runtime' && moduleType === 'umd') {
            const pluginOptions = Array.isArray(plugin) ? plugin[1] : undefined;
            return [
                '@babel/plugin-transform-runtime',
                {
                    ...(pluginOptions || {}),
                    regenerator: false,
                },
            ];
        }
        return plugin;
    });
    return {
        ...babelConfig,
        presets: newPresets,
        plugins: newPlugins,
    };
}

module.exports = {
    changeBabelModule,
};
