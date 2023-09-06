const through2 = require('through2');
const replaceExt = require('replace-ext');
const { normalizeOption } = require('../utils/config');

// FIXME
/* eslint-disable @typescript-eslint/no-explicit-any */

exports.gulpWrapper = (loader) => (
    options = {},
) =>
    through2.obj(async function (file, _, callback) {
        const normalizedOptions = normalizeOption(options)
        let res = await loader(normalizedOptions, file)
        res = res?.css ?? res
        if (typeof res === 'string') {
            file.contents = Buffer.from(res)
            file.path = replaceExt(file.path, `.${normalizedOptions.outputType}`)
            callback(null, file)
        } else {
            callback(res)
        }
    })
