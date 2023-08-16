

------

# isArray
======

## 类型

```
(obj: any) => boolean
```

## 源码

```
function isArray(obj: any): obj is any[] {
    return opt.call(obj) === '[object Array]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|

> 输出

描述：无

------

# isObject
======

## 类型

```
(obj: any) => boolean
```

## 源码

```
function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|

> 输出

描述：无

------

# isString
======

## 类型

```
(obj: any) => boolean
```

## 源码

```
function isString(obj: any): obj is string {
    return opt.call(obj) === '[object String]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|

> 输出

描述：无

------

# isOneOf
======

## 类型

```
(value: T, validList: T[]) => boolean
```

## 源码

```
function isOneOf<T>(value: T, validList: T[]) {
    return validList.indexOf(value) !== -1;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|value|\-|T|必填|
|validList|\-|T\[\]|必填|

> 输出

描述：无

------

# isEmptyValue
======

## 类型

```
(obj: any) => boolean
```

## 源码

```
function isEmptyValue(obj: any): boolean {
    return obj === undefined || obj === null || obj === '';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|

> 输出

描述：无

------

# isFunction
======

## 类型

```
(obj: unknown) => boolean
```

## 源码

```
function isFunction(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object function]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|unknown|必填|

> 输出

描述：无

------

# isNull
======

## 类型

```
(obj: unknown) => boolean
```

## 源码

```
function isNull(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object null]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|unknown|必填|

> 输出

描述：无

------

# isUndefined
======

## 类型

```
(obj: unknown) => boolean
```

## 源码

```
function isUndefined(obj: unknown): boolean {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object undefined]';
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|unknown|必填|

> 输出

描述：无

------

# isEmptyArray
======

## 类型

```
(obj: unknown[]) => boolean
```

## 源码

```
function isEmptyArray(obj: Array<unknown>): boolean {
    return isArray(obj) && !obj?.length;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|unknown\[\]|必填|

> 输出

描述：无

------

# isDeepEqual
======

## 类型

```
(obj: any, sub: any) => boolean
```

## 源码

```
function isDeepEqual(obj: any, sub: any): boolean {
    if (typeof obj !== 'object' || typeof sub !== 'object' || obj === null || sub === null) {
        return obj === sub;
    }
    if (isFunction(obj) && isFunction(sub)) {
        return obj === sub || obj.toString() === sub.toString();
    }

    if (Object.keys(obj).length !== Object.keys(sub).length) {
        return false;
    }
    for (const key in obj) {
        if (!isDeepEqual(obj[key], sub[key])) return false;
    }
    return true;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|
|sub|\-|any|必填|

> 输出

描述：无
