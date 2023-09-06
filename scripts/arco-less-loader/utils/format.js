const { DARK_MODE_KEY, START_BORDER, END_BORDER, TAB } = require('../constants');
const kebabcase = require('lodash.kebabcase');

// FIXME
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 给每一行文字加 tab
 *
 * @param {string} str - 输入字符串
 * @param {number} depth - 加多少个 tab，一个为两个空格
 * @return {string}
 */
const addTabs = (str, depth = 1) => {
    return str
        .split('\n')
        .map(line => (line ? new Array(depth + 1).join(TAB) + line : line))
        .join('\n')
}

/**
 * Rule 拼接成输出字符串
 *
 * @param {string} selector - 选择器字符串
 * @param {Rule} rule - 当前选择器对应的规则
 * @return {string}
 */
function commonContextConvert(selector, rule, options) {
    const createLine = ({ name, values, modifyVars }) => `
${modifyVars
            ? Object.entries(modifyVars)
                .map(([key, val]) => `@${key}: ${val};\n`)
                .join('')
            : ''
        }${name}(${values.join(', ')});`

    let res = `${rule.lines && rule.lines.map(mixinLine => createLine(mixinLine)).join('')}${rule.children
            ? Object.entries(rule.children)
                .map(([key, value]) => commonContextConvert(key, value, options))
                .join('')
            : ''
        }
`
    if (selector === DARK_MODE_KEY) {
        const { condition, removeDefault } = options.customDarkCondition || {}
        res = `
& when (@use-dark-mode = 1) {
${removeDefault ? '' : `  @media (prefers-color-scheme: dark) {${addTabs(res, 2)}  }`}
${condition ? `  ${condition} {${addTabs(res, 2)}  }\n` : ''}}`
    } else {
        res = `\n${selector.trim()} {${addTabs(res)}}`
    }
    return res
}

/**
 * OutputContext 拼接成输出字符串
 *
 * @param {OutputContext} context - 导出样式上下文
 * @param {boolean} toCSS - 是否转化为 css
 * @return {string}
 */
const genLessFromContext = (context, options) => {
    return Object.entries(context)
        .map(([key, value]) => {
            return commonContextConvert(key, value, options)
        })
        .join('')
}

exports.contextConvert = (context, options) => {
    let res = genLessFromContext(context, options)
    if (res !== '') {
        res = '\n' + START_BORDER + res + '\n' + END_BORDER + '\n'
    }
    return res
}

/**
 * 生成一个对象，用来对接 less AST 的接口
 *
 * @return {{content: string, add: (res: string) => void}}
 */
const createOutput = () => {
    const context = { content: '' }
    context.add = res => {
        context.content += res
    }
    return context
}

/**
 * 根据 AST 节点生成选择器字符串
 *
 * @param {T extends Node} rule - less 的 AST 节点
 * @return {string}
 */
const genSelector = rule => {
    let output = ''
    rule.selectors.map(selector => {
        if (/\w$/g.test(output)) output += ',\n'
        const newLine = selector.elements
            .map(({ combinator, value }) => {
                let res = value
                if (value?.toCSS) {
                    res = value.toCSS({})
                }
                if (value?.name) {
                    if (value.name.includes('@')) res = `@{${value.name.slice(1)}}`
                }

                if (res === '' && combinator.value.charAt(0) === '&') {
                    return ''
                } else {
                    return combinator.toCSS({}) + res
                }
            })
            .join('')
        output += newLine.trim()
    })
    return output
}

/**
 * 获取 AST 节点描述的值
 *
 * @param {T extends Node} rule - less 的 AST 节点
 * @return {string}
 */
exports.getValue = rule => {
    const valueWrapper = createOutput()
    rule.genCSS({}, valueWrapper)
    let res = valueWrapper.content
    if (res) {
        res = /^(@[^\s]*:\s*)?([^\s;]*);$/g.exec(res)?.[2] ?? res
    }
    return res
}

/**
 * 查询 key 在当前节点的值
 *
 * @param {T extends Node} rule - less 的 AST 节点
 * @param {string} key - 需要获取的变量名称
 * @return {string ｜ undefined}
 */
exports.getValueFromRule = (rule, key) => {
    try {
        return exports.getValue(rule.variable(`@${key}`))
    } catch {
        return undefined
    }
}

/**
 * 获取 AST MixinCall 类型节点的参数 字符串 数组
 *
 * @param {T extends Node} rule - less 的 AST 节点
 * @return {string[]}
 */
exports.getMixinArguments = rule => {
    return rule.arguments.map(expression => exports.getValue(expression.value))
}

/**
 * 将样式记录到最终导出的上下文对象中
 *
 * @param {OutputContext} context - 导出样式上下文
 * @param {T extends Node} rule - 对应的父节点，描述 mixin 的节点没有选择器
 * @param {string[]} values - 参数字符串数组
 * @param {string} mixinName - mixin 的变量名
 * @return {void}
 */
exports.addToContext = (context, rule, mixinLine, prefix) => {
    let parent = rule
    let paths = []
    while (parent) {
        if (parent.selectors) {
            paths.push(genSelector(parent))
        }
        parent = parent.parent
    }
    if (prefix) {
        paths = [...paths, ...prefix]
    }
    let cursor = { lines: [], children: context }
    while (paths.length) {
        const key = paths.pop()
        if (key) {
            const children = cursor.children
            if (!children[key]) children[key] = { lines: [], children: {} }
            cursor = children[key]
        }
    }

    cursor.lines.push(mixinLine)
}

/**
 * 获取当前参数数组的，可能带来有主题变量的索引
 * 具体可以看 use-var mixin
 *
 * @param {string[]} args - 参数数组
 * @return {number}
 */
exports.getColorVariableIndex = (args) =>
({
    2: 1,
    3: 2,
    4: 2,
}?.[args.length] ?? 1)

/**
 * 遍历对象
 *
 * @param {any} obj
 * @param {([string, any]) => [string, any]} mapFunc - 对应每个 key 的遍历函数
 * @return {any}
 */
exports.objectMap = (obj, mapFunc) => {
    return Object.fromEntries(Object.entries(obj).map(mapFunc))
}

exports.formatColorDict = (colorDict) => {
    return exports.objectMap(colorDict, ([theme, dict]) => [theme, exports.objectMap(dict, ([color, val]) => [kebabcase(color), val])])
}

exports.addToArrayMap = (source, key, val) => {
    if (source[key]) {
        source[key].push(val)
    } else {
        source[key] = [val]
    }
}
