/**
 * @type utils
 * @name componentUtils
 */
import { CSSProperties } from 'react';

export * from './hooks';
export * from './type';
export * from './react-dom';

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

export function setStyleWithVendor(dom: HTMLElement, style: CSSProperties) {
    const vendorStyle = getStyleWithVendor(style);
    for (const key in vendorStyle) {
        dom.style[key] = vendorStyle[key];
    }
}

/**
 * 计算默认值，仅未定义时使用默认值
 * @desc {en} Calculate the default value, use default value only if undefined
 */
export const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
    return value === void 0 ? defaultValue : value;
};
