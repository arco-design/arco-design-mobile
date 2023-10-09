/**
 * 获取当前设备的操作系统
 * @desc {en} Get the operating system of the current device
 * @returns {string} 返回当前设备的操作系统，可能的值包括 'android'、'ios' 或 'pc'，如果无法获取，则返回空字符串
 * @returns {string} {en} Returns the operating system of the current device, possible values are 'android', 'ios', or 'pc'. Returns an empty string if it cannot be obtained
 * @example
 * ```
 * import { getSystem } from '@arco-design/mobile-utils';
 *
 * const systemInfo = getSystem();
 * if (systemInfo === 'android') {
 *     console.log('You are using the Android operating system');
 * } else if (systemInfo === 'ios') {
 *     console.log('You are using the iOS operating system');
 * } else if (systemInfo === 'pc') {
 *     console.log('You are using a desktop PC operating system');
 * } else {
 *     console.log('Unable to detect your operating system');
 * }
 * ```
 */
export function getSystem() {
    try {
        const u = navigator.userAgent;
        const android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        const ios = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        const pc = !android && !ios;
        const system = android ? 'android' : 'ios';
        return pc ? 'pc' : system;
    } catch (e) {
        return '';
    }
}

export const iPhoneScreenMap = {
    'iPhoneXR iPhone11 iPhoneXsMax iPhone11ProMax': {
        width: 414,
        height: 896,
    },
    iPhone11Pro: {
        width: 375,
        height: 812,
    },
    iPhone12mini: {
        width: 360,
        height: 780,
    },
    'iPhone12 iPhone12Pro': {
        width: 390,
        height: 844,
    },
    iPhone12ProMax: {
        width: 428,
        height: 926,
    },
};

/**
 * 检查给定的屏幕尺寸是否匹配 iPhone X 的屏幕尺寸
 * @desc {en} Check if the given screen dimensions match the screen dimensions of an iPhone X
 * @param {number} width 屏幕的宽度
 * @param {number} width {en} The width of the screen
 * @param {number} height 屏幕的高度
 * @param {number} height {en} The height of the screen
 * @returns {boolean} 如果给定的屏幕尺寸匹配 iPhone X 的屏幕尺寸，则返回 true，否则返回 false
 * @returns {boolean} {en} Returns true if the given screen dimensions match those of an iPhone X, otherwise returns false
 * @example
 * ```
 * import { checkIPhoneX } from '@arco-design/mobile-utils';
 *
 * // Example 1: Matching screen dimensions
 * const isMatch1 = checkIPhoneX(375, 812);
 * console.log(isMatch1); // Should print true
 *
 * // Example 2: Non-matching screen dimensions
 * const isMatch2 = checkIPhoneX(320, 568);
 * console.log(isMatch2); // Should print false
 * ```
 */
export function checkIPhoneX(width: number, height: number) {
    return (
        Object.keys(iPhoneScreenMap).filter(key => {
            const item = iPhoneScreenMap[key];
            return (
                (item.height === height && item.width === width) ||
                (item.height === width && item.width === height)
            );
        }).length > 0
    );
}

/**
 * 检查当前设备是否为 iPhone X
 * @desc {en} Check if the current device is an iPhone X
 * @returns {boolean} 如果当前设备是 iPhone X，则返回 true，否则返回 false
 * @returns {boolean} {en} Returns true if the current device is an iPhone X, otherwise returns false
 * @example
 * ```
 * import { isIPhoneX } from '@arco-design/mobile-utils';
 *
 * // Using the isIPhoneX function in a conditional statement
 * if (isIPhoneX()) {
 *     console.log("The current device is an iPhone X");
 * } else {
 *     console.log("The current device is not an iPhone X");
 * }
 * ```
 */
export function isIPhoneX() {
    try {
        const u = navigator.userAgent;
        const { width, height } = window.screen;
        return u.indexOf('iPhone') > -1 && checkIPhoneX(width, height);
    } catch (e) {
        return false;
    }
}

/**
 * 检查是否在 SSR 环境
 * @desc {en} Check if in ssr environment
 * @example
 * ```
 * import { isSSR } from '@arco-design/mobile-utils';
 *
 * if (isSSR()) {
 *     console.log("It is currently in the ssr stage");
 * } else {
 *     console.log("It is currently in the csr stage");
 * }
 * ```
 */
export function isSSR() {
    return typeof window === 'undefined';
}
