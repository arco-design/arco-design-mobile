const deepmerge = require('deepmerge');

exports.defaultOptions = {
    lessOptions: {
        plugins: [],
    },
    outputType: 'less',
    themeOnly: false,
};

exports.normalizeOption = (options) => {
    return deepmerge(exports.defaultOptions, options)
};
