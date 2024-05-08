// Note: generate by ai

// utils
// 工具方法
import { CSSProperties } from 'vue';

// 导出hooks相关方法
// Export all hooks related methods
export * from './hooks';
export * from './dom';
export * from './type';

// 获取带浏览器前缀的样式
// Get style with browser vendor prefix
export function getStyleWithVendor(style: CSSProperties): CSSProperties {
    const prefixReg = /(transform|transition|animation)/i;
    const newStyle = Object.keys(style).reduce((acc, key) => {
        if (prefixReg.test(key)) {
            const webkitKey = `Webkit${key.charAt(0).toUpperCase() + key.slice(1)}`;
            acc[webkitKey] = style[key];
        }
        acc[key] = style[key];
        return acc;
    }, {} as CSSProperties);
    return newStyle;
}

// 计算默认值，仅未定义时使用默认值
// Calculate the default value, use default value only if undefined
export function getDefaultValue<T>(value: T | undefined, defaultValue: T): T {
    return value === void 0 ? defaultValue : value;
}
