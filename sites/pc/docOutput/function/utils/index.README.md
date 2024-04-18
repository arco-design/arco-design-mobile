### utils utils

------

# handleUnit

给值带上 px 的单位，有单位的值直接返回

======

## 示例

```
import { handleUnit } from '@arco-design/mobile-utils';
const test = handleUnit(5);
```

## 类型

```
(value: number | string) => string
```

## 源码

```
function handleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|value|需要设置的值|number \| string|必填|

> 输出

string

------

# arrayTreeFilter

基于给定的过滤函数返回一个过滤后的数组

======

## 示例

```
import { arrayTreeFilter } from '@arco-design/mobile-utils';
const test = arrayTreeFilter(data, (item: any, level: number) => level <= index && item.value === value[level]);
```

## 类型

```
(data: T[], filterFn: Function, options?: Object) => T[]
```

## 源码

```
function arrayTreeFilter<T>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
        childrenKeyName?: string;
        fallbackChildIndex?: number;
    },
) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    let children = data || [];
    const result: T[] = [];
    let level = 0;

    do {
        let foundItem: T | undefined = children.find(item => filterFn(item, level));
        if (!foundItem && options.fallbackChildIndex !== undefined) {
            foundItem = children[options.fallbackChildIndex];
        }
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = (foundItem as any)[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|data|数据数组|T\[\]|必填|
|filterFn|过滤函数|Function|必填|
|options|可选对象|Object|-|

> 输出

T[]

------

# easeOutCubic

使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值

======

## 示例

```
import { easeOutCubic } from '@arco-design/mobile-utils';
const test = easeOutCubic(2000, 10, 1.2, 1000);
```

## 类型

```
(elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number
```

## 源码

```
function easeOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|elapsed|持续时间|number|必填|
|initialValue|初始值|number|必填|
|amountOfChange|变动系数|number|必填|
|duration|持续时间|number|必填|

> 输出

number

------

# nextTick

在下一个事件循环周期执行给定的函数

======

## 示例

```
import { nextTick } from '@arco-design/mobile-utils';
nextTick(() => { updateLayoutData(); });
```

## 类型

```
(func: Function) => void
```

## 源码

```
function nextTick(func: () => void) {
    setTimeout(func, 20);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|func|执行的函数|Function|必填|

> 输出

void

------

# fingerDisToLabelDis

模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得

======

## 示例

```
import { fingerDisToLabelDis } from '@arco-design/mobile-utils';
const test = fingerDisToLabelDis(1000, 0.01);
```

## 类型

```
(x: number, damping?: [number, number] | number) => number
```

## 源码

```
function fingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|x|元素位移|number|必填|
|damping|阻尼参数|\[number, number\] \| number|-|

> 输出

number
