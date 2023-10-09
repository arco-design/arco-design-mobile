

------

# getSystem

获取当前设备的操作系统

======

## 示例

```
import { getSystem } from '@arco-design/mobile-utils';
const systemInfo = getSystem();
if (systemInfo === 'android') {
     console.log('You are using the Android operating system');
} else if (systemInfo === 'ios') {
     console.log('You are using the iOS operating system');
} else if (systemInfo === 'pc') {
     console.log('You are using a desktop PC operating system');
} else {
     console.log('Unable to detect your operating system');
}
```

## 类型

```
() => string
```

## 源码

```
function getSystem() {
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
```

======

> 输入

无

> 输出

{string} 返回当前设备的操作系统，可能的值包括 'android'、'ios' 或 'pc'，如果无法获取，则返回空字符串

------

# checkIPhoneX

检查给定的屏幕尺寸是否匹配 iPhone X 的屏幕尺寸

======

## 示例

```
import { checkIPhoneX } from '@arco-design/mobile-utils';
// Example 1: Matching screen dimensions
const isMatch1 = checkIPhoneX(375, 812);
console.log(isMatch1); // Should print true
// Example 2: Non-matching screen dimensions
const isMatch2 = checkIPhoneX(320, 568);
console.log(isMatch2); // Should print false
```

## 类型

```
(width: number, height: number) => boolean
```

## 源码

```
function checkIPhoneX(width: number, height: number) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|width|屏幕的宽度|number|必填|
|height|屏幕的高度|number|必填|

> 输出

{boolean} 如果给定的屏幕尺寸匹配 iPhone X 的屏幕尺寸，则返回 true，否则返回 false

------

# isIPhoneX

检查当前设备是否为 iPhone X

======

## 示例

```
import { isIPhoneX } from '@arco-design/mobile-utils';
// Using the isIPhoneX function in a conditional statement
if (isIPhoneX()) {
     console.log("The current device is an iPhone X");
} else {
     console.log("The current device is not an iPhone X");
}
```

## 类型

```
() => boolean
```

## 源码

```
function isIPhoneX() {
    try {
        const u = navigator.userAgent;
        const { width, height } = window.screen;
        return u.indexOf('iPhone') > -1 && checkIPhoneX(width, height);
    } catch (e) {
        return false;
    }
}
```

======

> 输入

无

> 输出

{boolean} 如果当前设备是 iPhone X，则返回 true，否则返回 false

------

# isSSR

检查是否在 SSR 环境

======

## 示例

```
import { isSSR } from '@arco-design/mobile-utils';
if (isSSR()) {
     console.log("It is currently in the ssr stage");
} else {
     console.log("It is currently in the csr stage");
}
```

## 类型

```
() => boolean
```

## 源码

```
function isSSR() {
    return typeof window === 'undefined';
}
```

======

> 输入

无

> 输出

无
