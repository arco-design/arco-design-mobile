

------

# getSystem
======

## 类型

```
() => "pc" | "android" | "ios" | ""
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

描述：无

------

# checkIPhoneX
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
|width|\-|number|必填|
|height|\-|number|必填|

> 输出

描述：无

------

# isIPhoneX
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

描述：无
