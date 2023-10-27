const less = require('less');
const { urlToRequest, getOptions } = require('loader-utils');
const { lessLoader } = require('../loader');
const { normalizeOption } = require('../utils/config');

// FIXME
/* eslint-disable @typescript-eslint/no-explicit-any */

const trailingSlash = /[/\\]$/
const isModuleName = /^~([^/]+|[^/]+\/|@[^/]+[/][^/]+|@[^/]+\/?|@[^/]+[/][^/]+\/)$/

/**
 * Creates a Less plugin that uses webpack's resolving engine that is provided by the loaderContext.
 *
 * @param {LoaderContext} loaderContext
 * @returns {LessPlugin}
 */
function createWebpackLessPlugin(loaderContext) {
    const resolve = loaderContext.getResolve({
        mainFields: ['less', 'style', 'main', '...'],
        mainFiles: ['index', '...'],
        extensions: ['.less', '.css'],
    })

    class WebpackFileManager extends less.FileManager {
        supports(filename) {
            if (this.isPathAbsolute(filename)) {
                return false
            }

            return true
        }

        // Sync resolving is used at least by the `data-uri` function.
        // This file manager doesn't know how to do it, so let's delegate it
        // to the default file manager of Less.
        // We could probably use loaderContext.resolveSync, but it's deprecated,
        // see https://webpack.js.org/api/loaders/#this-resolvesync
        supportsSync() {
            return false
        }

        getUrl(filename, options) {
            if (options.ext && !isModuleName.test(filename)) {
                return this.tryAppendExtension(filename, options.ext)
            }

            return filename
        }

        async resolveFilename(filename, currentDirectory, options) {
            const url = this.getUrl(filename, options)

            const moduleRequest = urlToRequest(url, url.charAt(0) === '/' ? '' : null)

            // Less is giving us trailing slashes, but the context should have no trailing slash
            const context = currentDirectory.replace(trailingSlash, '')

            return this.resolveRequests(context, [moduleRequest, url])
        }

        resolveRequests(context, possibleRequests) {
            if (possibleRequests.length === 0) {
                return Promise.reject(new Error('possibleRequests length = 0'))
            }

            return resolve(context, possibleRequests[0])
                .then(result => {
                    return result
                })
                .catch(error => {
                    const [, ...tailPossibleRequests] = possibleRequests

                    if (tailPossibleRequests.length === 0) {
                        throw error
                    }

                    return this.resolveRequests(context, tailPossibleRequests)
                })
        }

        async loadFile(filename, ...args) {
            let result

            try {
                if (isModuleName.test(filename)) {
                    const error = new Error()

                    error.type = 'Next'

                    throw error
                }

                result = await super.loadFile(filename, ...args)
            } catch (error) {
                if (error.type !== 'File' && error.type !== 'Next') {
                    return Promise.reject(error)
                }

                try {
                    result = await this.resolveFilename(filename, ...args)
                } catch (webpackResolveError) {
                    error.message =
                        `Less resolver error:\n${error.message}\n\n` +
                        `Webpack resolver error details:\n${webpackResolveError.details}\n\n` +
                        `Webpack resolver error missing:\n${webpackResolveError.missing}\n\n`

                    return Promise.reject(error)
                }

                loaderContext.addDependency(result)

                return super.loadFile(result, ...args)
            }

            loaderContext.addDependency(result.filename)

            return result
        }
    }

    return {
        install(lessInstance, pluginManager) {
            pluginManager.addFileManager(new WebpackFileManager())
        },
        minVersion: [3, 0, 0],
    }
}

function webpackLessLoader(source) {
    const customOptions = getOptions(this)
    const options = normalizeOption(customOptions)
    const file = {
        contents: source,
        path: this.resourcePath,
    }
    options.lessOptions.relativeUrls = true
    options.lessOptions.plugins = [createWebpackLessPlugin(this)]

    const callback = this.async()
    lessLoader(options, file)
        .then(res => {
            try {
                const { css, map, imports } = res
                imports?.forEach(this.addDependency, this)
                callback(null, css, typeof map === 'string' ? JSON.parse(map) : map)
            } catch (err) {
                callback(err)
            }
        })
        .catch(err => {
            callback(err)
        })
}

exports.webpackLessLoader = webpackLessLoader;
exports.default = webpackLessLoader;
