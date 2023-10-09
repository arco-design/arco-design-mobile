const less = require('less');
const PluginError = require('plugin-error');
const NpmImportPlugin = require('less-plugin-npm-import');
const { resolve } = require('../utils/files');
const {
    getMixinArguments,
    getValueFromRule,
    addToArrayMap,
    addToContext,
    formatColorDict,
    contextConvert,
} = require('../utils/format');
const { DARK_MODE_KEY } = require('../constants');

// FIXME
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 递归遍历所有规则，检测 mixin 和 color 变量，存入 上下文对象
 *
 * @param {T extends Node} rule - 当前规则对象
 * @param {T extends Node} root - AST根节点，主要是用来查询全局变量
 * @param {OutputContext} darkContext - 暗黑模式上下文对象，自定义拼接结构
 * @param {OutputContext} allContext - 主题全覆盖上下文对象，自定义拼接结构
 * FIXME
 * @param {T extends Node} originalTree - 用于主题，校对默认模式变量，是否重复（待优化）
 * @return {void}
 */
function walkRule(rule, root, context, themeMap) {
    if (rule.type === 'MixinCall') {
        const name = rule.selector.elements.map(ele => ele.value).join('')
        const checkIdx = name === '.use-var' ? idx => idx === 0 : () => false

        const args = getMixinArguments(rule)

        // 检测主题 map 是否包含变量
        if (themeMap) {
            const darkThemeValues = {}
            const markedDarkTheme = {}
            const markedTheme = {}
            Object.entries(themeMap).forEach(([themeName, dict]) => {
                args.forEach((arg, idx) => {
                    if (arg.includes(' ')) return
                    // 主题亮色模式标记
                    if (arg in dict) {
                        const targetVal = getValueFromRule(root, arg)
                        if (targetVal !== dict[arg]) {
                            addToArrayMap(markedTheme, themeName, arg)
                        }
                    }

                    // 检测主题内置暗黑模式
                    const darkValue = `dark-${arg}`
                    if (!checkIdx(idx) && darkValue in dict) {
                        const targetVal = getValueFromRule(root, `@${darkValue}`)
                        if (targetVal !== dict[darkValue]) {
                            addToArrayMap(markedDarkTheme, themeName, darkValue)
                            addToArrayMap(darkThemeValues, themeName, darkValue)
                        }
                    } else {
                        addToArrayMap(darkThemeValues, themeName, arg)
                    }
                })
            })
                ;[
                    {
                        source: markedTheme,
                        valuesCreator: () => args,
                        prefixCreator: (themeName) => [`.${themeName}`],
                    },
                    {
                        source: markedTheme,
                        valuesCreator: (themeName) => darkThemeValues[themeName],
                        prefixCreator: (themeName) => [`.${themeName}`, DARK_MODE_KEY],
                    },
                ].forEach(({ source, valuesCreator, prefixCreator }) => {
                    Object.entries(source).forEach(([themeName, modifyVarsKey]) => {
                        const modifyVars = Object.fromEntries(modifyVarsKey.map(key => [key, themeMap[themeName][key]]))
                        addToContext(
                            context,
                            rule,
                            {
                                name,
                                values: valuesCreator(themeName),
                                modifyVars,
                            },
                            prefixCreator(themeName),
                        )
                    })
                })
        }

        // 默认暗黑模式
        let hasDarkMode = false
        const darkModeValues = args.map((arg, idx) => {
            const darkValue = `dark-${arg}`
            if (!(arg.includes(' ') || checkIdx(idx)) && root.variable(`@${darkValue}`)) {
                hasDarkMode = true
                return darkValue
            }
            return arg
        })
        if (hasDarkMode) {
            addToContext(
                context,
                rule,
                {
                    name,
                    values: darkModeValues,
                },
                ['@dark'],
            )
        }
    } else if (rule.rules) {
        rule.rules.forEach(r => walkRule(r, root, context, themeMap))
    }
}

/**
 * 根据输入字符串，解析导出目标字符串
 *
 * @param {string} input - 输入文本
 * @param {Less.Options} lessOpts - Less 的配置项
 * @param {LoaderOptions} loaderOpts - Loader 的配置项
 * @param {string} themeLess - 拼接的主题及暗黑模式字符串
 * @return {string} 生成对应的 css 或者 less 文本
 */
const generalOutput = (
    input,
    lessOpts,
    loaderOpts,
    themeLess = '',
    hasDarkModeVariable = true,
) => {
    const prefix = hasDarkModeVariable ? '' : '@use-dark-mode: 1;\n'
    if (loaderOpts.outputType === 'css') {
        lessOpts.plugins = [...(lessOpts.plugins || []), new NpmImportPlugin({ prefix: '~' })]
        return less.render(prefix + input + themeLess, lessOpts)
    }
    if (loaderOpts.themeOnly) return prefix + themeLess.trimLeft()
    return prefix + input + themeLess
}

/**
 * 生成暗黑模式上下文
 *
 * @param {string} input - 输入的 less 原文本
 * @param {Less.Options} opts - Less 的配置项
 * @return {Promise<[OutputContext, T extends Node] | undefined>} 返回带有上下文的 Promise 对象
 */
const createContext = (input, opts, themeMap) =>
    less.parse(input, opts).then(tree => {
        const isDarkMode = getValueFromRule(tree, 'use-dark-mode')
        const context = {}
        walkRule(tree, tree, context, themeMap)
        if (Object.keys(context).length) {
            return [context, isDarkMode !== undefined]
        }
        return []
    })

/**
 * loader 入口
 *
 * @param {LoaderOptions} options - loader 的配置项
 * @param {any} file - 目前是这个类型， stream 文件流对象
 * @return {Promise<string>} 期望的转化后文本或者错误字符串
 */
function lessLoader(options, file) {
    const input = file.contents.toString()

    let sourceInput = resolve(input, file.path)

    if (typeof options.prependData !== 'undefined') {
        sourceInput =
            typeof options.prependData === 'function'
                ? `${options.prependData(sourceInput)}\n${sourceInput}`
                : `${options.prependData}\n${sourceInput}`
    }

    if (typeof options.appendData !== 'undefined') {
        sourceInput =
            typeof options.appendData === 'function'
                ? `${sourceInput}\n${options.appendData(sourceInput)}`
                : `${sourceInput}\n${options.appendData}`
    }

    const lessOptions = {
        compress: false,
        paths: [],
        ...options.lessOptions,
    }

    lessOptions.filename = file.path

    // 多主题处理流程
    if (options.tokenList) {
        return createContext(sourceInput, lessOptions, formatColorDict(options.tokenList)).then(
            ([ctx, hasDarkModeVariable]) => {
                if (ctx)
                    return generalOutput(
                        input,
                        lessOptions,
                        options,
                        contextConvert(ctx, options),
                        hasDarkModeVariable,
                    )
                return generalOutput(input, lessOptions, options)
            },
            err => {
                return new PluginError('arco-less-loader', err)
            },
        )
    }

    return createContext(sourceInput, lessOptions).then(
        ([ctx, hasDarkModeVariable]) => {
            if (ctx)
                return generalOutput(input, lessOptions, options, contextConvert(ctx, options), hasDarkModeVariable)
            return generalOutput(input, lessOptions, options)
        },
        err => new PluginError('arco-less-loader', err),
    )
}

exports.lessLoader = lessLoader;
