const { unlinkSync, writeFileSync, readFileSync, existsSync } = require('fs');
const { resolve: resolvePath, dirname } = require('path');
const { createFilter } = require('rollup-pluginutils');
const mkdirp = require('mkdirp');
const { normalizeOption } = require('../utils/config');
const { lessLoader } = require('../loader');

const NAME = '@arco/less-loader'
function mkdirWriteFile(path, contents) {
    const outputDir = dirname(path)
    return new Promise(resolve => {
        mkdirp.sync(outputDir)
        if (existsSync(outputDir)) {
            try {
                writeFileSync(path, contents)
            } catch (err) {
                throw new Error(`[ ${NAME} ]: Write file failed.\n ${err}`)
            }
            resolve()
        }
        throw new Error(`[ ${NAME} ]: Create directory failed.`)
    })
}

exports.rollupPluginLess = (options = {}) => {
    let isFirst = true
    const { include, exclude, output = false, ...restPorps } = options
    const filter = createFilter(include || ['**/*.less'], exclude || 'node_modules/**')
    return {
        name: NAME,
        resolveId(source, importer) {
            let id = source

            if (importer) {
                id = resolvePath(dirname(importer), id)
            }
            if (filter(id)) {
                id = id.replace(/\..*$/g, '.less.css')
                return { id }
            }
            return null
        },
        load: async function (id) {
            if (/\.less\.css$/g.test(id)) {
                const sourcePath = id.replace(/less\.css$/g, 'less')
                const source = readFileSync(sourcePath).toString()

                const loaderOptions = normalizeOption(restPorps)
                let res
                try {
                    res = await lessLoader(loaderOptions, {
                        contents: source,
                        path: sourcePath,
                    })
                } catch (err) {
                    throw new Error(`[ ${NAME} ]: Less render failed. \n${err}.`)
                }
                const css = 'css' in res ? res.css : res

                if (output && typeof output === 'string') {
                    if (isFirst && existsSync(output)) {
                        unlinkSync(output)
                    }
                    await mkdirWriteFile(output, css)
                    isFirst = false
                }
                return { code: css }
            }
        },
    }
}
