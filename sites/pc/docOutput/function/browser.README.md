

------

# getSystem

获取当前设备的操作系统

======

## 示例

```
import { getSystem } from '@arco-design/mobile-utils';
// Default behavior
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
// With HarmonyOS detection enabled
const systemInfoWithHarmony = getSystem({ detectHarmony: true });
if (systemInfoWithHarmony === 'harmony') {
     console.log('You are using HarmonyOS');
}
```

## 类型

```
(options?: SystemOptions | undefined) => "harmony" | "android" | "ios" | "pc" | ""
```

## 源码

```
function getSystem(options?: SystemOptions) {
    try {
        const u = navigator.userAgent;
        // Do not modify the Harmony OS ua judgment rule, please refer to the official documentation: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/web-default-useragent
        if (/OpenHarmony/i.test(u)) {
            return options?.detectHarmony ? 'harmony' : 'android';
        }
        // Do not ignore the case of the first letter
        if (/Android|Linux/.test(u)) {
            return 'android';
        }
        if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u)) {
            return 'ios';
        }
        return 'pc';
    } catch (e) {
        return '';
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|options|配置选项|SystemOptions \| undefined|-|

> 输出

返回当前设备的操作系统，可能的值包括 'android'、'ios'、'harmony' 或 'pc'，如果无法获取，则返回空字符串

> SystemOptions

|参数|描述|类型|
|----------|-------------|------|
|detectHarmony|是否识别鸿蒙系统，默认为 false，鸿蒙系统会被识别为 Android @en Whether to detect HarmonyOS separately, default is false, HarmonyOS will be recognized as Android|boolean|

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

boolean
