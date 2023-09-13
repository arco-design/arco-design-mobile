/**
 * @type utils
 * @name componentUtils
 */
import { CSSProperties } from 'react';

export * from './hooks';
export * from './react-dom';
export * from './type';

/**
 * 获取带浏览器前缀的样式
 * @desc {en} Get style with browser vendor prefix
 * @param {CSSProperties} style 原始样式
 * @param {CSSProperties} style {en} Original style
 * @return {CSSProperties} newStyle 添加了浏览器前缀的新样式
 * @return {CSSProperties} newStyle {en} New style with browser vendor prefix
 */
export function getStyleWithVendor(style: CSSProperties): CSSProperties {
    const allowReg = /(transform|transition|animation)/i;
    const newStyle = Object.keys(style).reduce<CSSProperties>((acc, key) => {
        const webkitStyle = allowReg.test(key)
            ? {
                  [`Webkit${key.replace(/^(.)/, (_, p1) => p1.toUpperCase())}`]: style[key],
              }
            : {};
        return {
            ...acc,
            [key]: style[key],
            ...webkitStyle,
        };
    }, {});
    return newStyle;
}

/**
 * 给元素设置带浏览器前缀的样式
 * @desc {en} Set element style with browser vendor prefix
 * @param {HTMLElement} dom 需要设置样式的元素
 * @param {HTMLElement} dom {en} Element to set style
 * @param {CSSProperties} style Original style
 * @param {CSSProperties} style {en} Original style
 */
export function setStyleWithVendor(dom: HTMLElement, style: CSSProperties) {
    const vendorStyle = getStyleWithVendor(style);
    for (const key in vendorStyle) {
        dom.style[key] = vendorStyle[key];
    }
}

/**
 * 计算默认值，仅未定义时使用默认值
 * @desc {en} Calculate the default value, use default value only if undefined
 * @param {T | undefined} value 输入的值
 * @param {T | undefined} value {en} The input value
 * @param {T} defaultValue 默认值
 * @param {T} defaultValue {en} The default value
 * @returns {T} 如果输入的值是未定义的，那么返回默认值，否则返回输入的值
 * @returns {T} {en} Returns the default value if the input is undefined, otherwise returns the input value
 */
export const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
    return value === void 0 ? defaultValue : value;
};
