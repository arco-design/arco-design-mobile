const { lessLoader } = require('./loader');
const { gulpWrapper } = require('./wrapper/gulp');
const { rollupPluginLess } = require('./wrapper/rollup');
const { webpackLessLoader } = require('./wrapper/webpack');

exports.default = lessLoader;
exports.gulpLess = gulpWrapper(lessLoader);
exports.rollupPluginLess = rollupPluginLess;
exports.webpackLessLoader = webpackLessLoader;
