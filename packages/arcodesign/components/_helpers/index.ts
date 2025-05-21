/**
 * @type utils
 * @name componentUtils
 */
import { CSSProperties } from 'react';

export * from './hooks';
export * from './react-dom';
export * from './render';
export * from './type';

/**
 * 获取带浏览器前缀的样式
 * @desc {en} Get style with browser vendor prefix
 * @param {CSSProperties} style 原始样式
 * @param {CSSProperties} style {en} Original style
 * @returns {CSSProperties} newStyle 添加了浏览器前缀的新样式
 * @returns {CSSProperties} newStyle {en} New style with browser vendor prefix
 * @example
 * ```
 * import { getStyleWithVendor } from '@arco-design/mobile-react/esm/_helpers';
 *
 * // Example usage:
 * const originalStyle = {
 *     transform: 'translateX(50px)',
 *     transition: 'all 0.3s ease',
 *     opacity: 0.8,
 * };
 *
 * const styleWithPrefix = getStyleWithVendor(originalStyle);
 *
 * // Result:
 * // styleWithPrefix will be:
 * // {
 * //     transform: 'translateX(50px)',
 * //     WebkitTransform: 'translateX(50px)', // Browser-specific prefix added
 * //     transition: 'all 0.3s ease',
 * //     WebkitTransition: 'all 0.3s ease', // Browser-specific prefix added
 * //     opacity: 0.8,
 * // }
 * ```
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
 * @returns {void}
 * @example
 * ```
 * import { setStyleWithVendor } from '@arco-design/mobile-utils';
 *
 * // Example: Setting and displaying styles with the Webkit browser vendor prefix
 * const element = document.getElementById('myElement');
 * const originalStyle = {
 *   transform: 'translateX(100px)',
 *   transition: 'transform 0.5s ease',
 *   borderRadius: '5px',
 * };
 *
 * // Set the styles with the Webkit browser vendor prefix
 * setStyleWithVendor(element, originalStyle);
 *
 * // Display the styles with the Webkit browser vendor prefixes applied
 * const computedStyle = getComputedStyle(element);
 * console.log(computedStyle.getPropertyValue('-webkit-transform')); // Output: The transformed style with the Webkit browser vendor prefix
 * console.log(computedStyle.getPropertyValue('-webkit-transition')); // Output: The transition style with the Webkit browser vendor prefix
 * console.log(computedStyle.getPropertyValue('border-radius')); // Output: The borderRadius style without a vendor prefix
 * ```
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
 * @example
 * ```
 * import { getDefaultValue } from '@arco-design/mobile-react/esm/_helpers';
 *
 * const result = getDefaultValue(42, 0);
 * console.log(result); // Output: 42
 *
 * const result2 = getDefaultValue(undefined, 100);
 * console.log(result2); // Output: 100
 * ```
 */
export const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
    return value === void 0 ? defaultValue : value;
};
