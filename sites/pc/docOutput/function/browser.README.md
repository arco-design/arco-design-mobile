

------

# getSystem

获取当前设备的操作系统

======

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
        const ios = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('Mac OS X') > -1;
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

'android'、'ios' 或 'pc'，如果无法获取，则返回空字符串

------

# checkIPhoneX

检查给定的屏幕尺寸是否匹配 iPhone X 的屏幕尺寸

======

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

iPhone X 的屏幕尺寸，则返回 true，否则返回 false

------

# isIPhoneX

检查当前设备是否为 iPhone X

======

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

iPhone X，则返回 true，否则返回 false
