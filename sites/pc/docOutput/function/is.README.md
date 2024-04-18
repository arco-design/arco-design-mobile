

------

# isArray

判断一个对象是否为数组类型

======

## 示例

```
import { isArray } from '@arco-design/mobile-utils';
const test = isArray([]);
```

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
|obj|入参|any|必填|

> 输出

{boolean} 返回是否为数组类型

------

# isObject

判断一个对象是否为对象类型

======

## 示例

```
import { isObject } from '@arco-design/mobile-utils';
const test = isObject({});
```

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
|obj|入参|any|必填|

> 输出

{boolean} 返回是否为对象类型

------

# isString

判断一个对象是否为字符串类型

======

## 示例

```
import { isString } from '@arco-design/mobile-utils';
const test = isString('');
```

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
|obj|入参|any|必填|

> 输出

{boolean} 返回是否为字符串类型

------

# isOneOf

检查一个值是否在给定的有效值列表中

======

## 示例

```
import { isOneOf } from '@arco-design/mobile-utils';
const test = isOneOf(1, [1, 2, 3]);
```

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
|value|检查的值|T|必填|
|validList|有效值列表|T\[\]|必填|

> 输出

{boolean} 返回要检查的值是否在有效值列表中

------

# isEmptyValue

检查一个值是否为空值

======

## 示例

```
import { isEmptyValue } from '@arco-design/mobile-utils';
const test = isEmptyValue(null);
```

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
|obj|入参|any|必填|

> 输出

{boolean} 返回该值是否为空值

------

# isFunction

检查一个值是否为函数类型

======

## 示例

```
import { isFunction } from '@arco-design/mobile-utils';
const test = isFunction(() => {});
```

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
|obj|入参|unknown|必填|

> 输出

{boolean} 返回该值是否为函数

------

# isNull

检查一个值是否为 null

======

## 示例

```
import { isNull } from '@arco-design/mobile-utils';
const test = isNull(null);
```

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
|obj|入参|unknown|必填|

> 输出

{boolean} 返回该值是否为 null

------

# isUndefined

检查一个值是否为 undefined

======

## 示例

```
import { isUndefined } from '@arco-design/mobile-utils';
const test = isUndefined(undefined);
```

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
|obj|入参|unknown|必填|

> 输出

{boolean} 返回该值是否为 undefined

------

# isEmptyArray

检查一个值是否为空数组

======

## 示例

```
import { isEmptyArray } from '@arco-design/mobile-utils';
const test = isEmptyArray([]);
```

## 类型

```
(obj: Array<unknown>) => boolean
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
|obj|入参|Array\<unknown\>|必填|

> 输出

{boolean} 返回该值是否为空数组

------

# isDeepEqual

深比较两个对象是否相等

======

## 示例

```
import { isDeepEqual } from '@arco-design/mobile-utils';
const test = isDeepEqual({a: 1}, {a: 1});
```

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
|obj|要比较的第一个对象|any|必填|
|sub|\-|any|必填|

> 输出

{boolean} 返回两个对象是否相等
