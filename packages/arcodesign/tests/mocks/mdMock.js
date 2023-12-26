const path = require('path');
const babel = require('@babel/core');
const babelConfig = require('./babel-config');

const codeRegex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/m;

module.exports = {
    process(src, file) {
        const str = codeRegex.exec(src);
        if (str !== null && (str[3] === 'js' || str[3] === 'javascript')) {
            return babel.transform(
                `import React from 'react';${str[4]}`
                    .replace(/@arco-design\/mobile-react\/esm\/icon/g, path.resolve(__dirname, '../../components/icon'))
                    .replace(/@arco-design\/mobile-react\/esm/g, path.resolve(__dirname, '../../components/'))
                    .replace(/@arco-design\/mobile-react/g, path.resolve(__dirname, '../../components')),
                { ...babelConfig, filename: file },
            ).code;
        }
    },
    getCacheKey() {
        return String(Date.now());
    },
};
