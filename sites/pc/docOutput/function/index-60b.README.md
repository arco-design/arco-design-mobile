### utils utils

------

# handleUnit
======

## 类型

```
(value: string | number) => string
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
|value|\-|string \| number|必填|

> 输出

描述：无

------

# arrayTreeFilter
======

## 类型

```
(data: T[], filterFn: (item: T, level: number) => boolean, options?: { childrenKeyName?: string; fallbackChildIndex?: number; }) => T[]
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
|data|\-|T\[\]|必填|
|filterFn|\-|(item: T, level: number) =\> boolean|必填|
|options|\-|\{ childrenKeyName?: string; fallbackChildIndex?: number; \}|-|

> 输出

描述：无

------

# easeOutCubic
======

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
|elapsed|\-|number|必填|
|initialValue|\-|number|必填|
|amountOfChange|\-|number|必填|
|duration|\-|number|必填|

> 输出

描述：无

------

# nextTick

历史逻辑问题，轻喷 _(:з」∠)_

======

## 类型

```
(func: () => void) => void
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
|func|\-|() =\> void|必填|

> 输出

描述：无

------

# fingerDisToLabelDis

模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得

======

## 类型

```
(x: number, damping?: number | [number, number]) => number
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
|x|\-|number|必填|
|damping|\-|number \| \[number, number\]|-|

> 输出

描述：无

------

# stopTouch
======

## 类型

```
(e: TouchEvent) => void
```

## 源码

```
constrt { as cls } from './classnames';
* from './dom';
export * from './is'
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|e|\-|TouchEvent|必填|

> 输出

描述：无

------

# preventEleScroll
======

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```
;
* from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

export function preventEleScrollhandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

export function arrayTreeFilter<T>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
        childrenKeyName?: string;
        fallbackChildIndex?: number;
    },
) {
    options = options || {}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|\-|() =\> HTMLElement|-|
|preventWindow|\-|boolean|-|
|customStopTouch|\-|(e: TouchEvent) =\> void|-|

> 输出

描述：无

------

# freeEleScroll
======

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```
const;
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|\-|() =\> HTMLElement|-|
|preventWindow|\-|boolean|-|
|customStopTouch|\-|(e: TouchEvent) =\> void|-|

> 输出

描述：无

------

# isContains

判断父节点是否包含子节点

======

## 类型

```
(parentEl: HTMLElement, childrenEl: HTMLElement) => boolean
```

## 源码

```
function isContainsnextTick(func: () => void) {
    setTimeout(func, 20);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|parentEl|父节点|HTMLElement|必填|
|childrenEl|子节点|HTMLElement|必填|

> 输出

描述：无

------

# execRAF
======

## 类型

```
(fn: any) => number | Timeout
```

## 源码

```
/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function execRAF
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|fn|\-|any|必填|

> 输出

描述：无

> Timeout

|参数|描述|类型|
|----------|-------------|------|
|hasRef|If true, the \`Timeout\` object will keep the Node\.js event loop active\. @since v11\.0\.0|() =\> boolean|
|refresh|Sets the timer's start time to the current time, and reschedules the timer to call its callback at the previously specified duration adjusted to the current time\. This is useful for refreshing a timer without allocating a new JavaScript object\.  Using this on a timer that has already called its callback will reactivate the timer\. @since v10\.2\.0 @return a reference to \`timeout\`|() =\> Timeout|
|ref|-|() =\> Timeout|
|unref|-|() =\> Timeout|

------

# scrollWithAnimation
======

## 类型

```
(initTop: number, target: number, scrollTo: (top: number) => void, duration?: number, bezier?: [number, number, number, number], type?: "by" | "to") => void
```

## 源码

```
function scrollWithAnimationfingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initTop|\-|number|必填|
|target|\-|number|必填|
|scrollTo|\-|(top: number) =\> void|必填|
|duration|\-|number|300|
|bezier|\-|\[number, number, number, number\]|-|
|type|\-|"by" \| "to"|to|

> 输出

描述：无

------

# scrollParent

返回节点的 document 对象属性

======

## 类型

```
(node: HTMLElement) => HTMLElement | Document
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|node|dom 节点|HTMLElement|必填|

> 输出

描述：无

------

# getOffset

获得元素 offset

======

## 类型

```
(node: HTMLElement) => { width: number; height: number; top: number; left: number; }
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|node|dom 节点|HTMLElement|必填|

> 输出

描述：无

------

# checkOverflowVisible

检查 overflow 为 scroll 或 auto 时，元素是否在视口区域内

======

## 类型

```
(component: T, parent: HTMLElement | Document) => boolean
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|component|当前元素节点|T|必填|
|parent|当前元素所在容器 dom 节点|HTMLElement \| Document|必填|

> 输出

描述：无

------

# checkNormalVisible

检查非局部滚动容器元素是否在视口区域内

======

## 类型

```
(component: T) => boolean
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|component|当前元素节节点|T|必填|

> 输出

描述：无

------

# appendElementById

根据id动态添加dom元素

======

## 类型

```
(id: string, getContainer?: () => HTMLElement) => { child: HTMLElement; container: HTMLElement; }
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|id|添加的dom id|string|必填|
|getContainer|被添加元素的父级|() =\> HTMLElement|-|

> 输出

描述：无

------

# removeElement

从父级节点移除元素

======

## 类型

```
(ele: HTMLElement) => void
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|ele|待移除元素|HTMLElement|必填|

> 输出

描述：无

------

# getActualContainer
======

## 类型

```
(getContainer?: () => string | HTMLElement | Window) => HTMLElement | Window
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|getContainer|\-|() =\> string \| HTMLElement \| Window|-|

> 输出

描述：无

------

# getValidScrollContainer
======

## 类型

```
(getContainer?: () => HTMLElement | Window) => HTMLElement | Window
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|getContainer|\-|() =\> HTMLElement \| Window|-|

> 输出

描述：无

------

# getScrollContainerAttribute
======

## 类型

```
(property: string, getContainer?: () => HTMLElement | Document | Window) => number
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|property|\-|string|必填|
|getContainer|\-|() =\> HTMLElement \| Document \| Window|-|

> 输出

描述：无

------

# getScrollContainerRect
======

## 类型

```
(container: HTMLElement | Window) => { isGlobal: boolean; scrollEle: HTMLElement | Window; containerRect: Pick<DOMRect, "height" | "width" | "bottom" | "left" | "right" | "top">; }
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|container|\-|HTMLElement \| Window|必填|

> 输出

描述：无

------

# removeCssStyleDom
======

## 类型

```
(key: string) => void
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|key|\-|string|必填|

> 输出

描述：无

------

# addCssStyleDom
======

## 类型

```
(key: string, html: string) => void
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|key|\-|string|必填|
|html|\-|string|必填|

> 输出

描述：无

------

# addCssKeyframes
======

## 类型

```
(key: string, rules: string) => void
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|key|\-|string|必填|
|rules|\-|string|必填|

> 输出

描述：无

------

# addCssRules
======

## 类型

```
(key: string, rules: Record<string, string>) => void
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|key|\-|string|必填|
|rules|\-|Record\<string, string\>|必填|

> 输出

描述：无

------

# getActualPixel

不同机型下的字体大小与标准字体大小的比率，计算类似.rem()

======

## 类型

```
(px: Number, baseFontSize?: Number) => String
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|px|待处理像素值|Number|必填|
|baseFontSize|基准字号|Number|50|

> 输出

描述：计算后的像素值

------

# convertCssDuration
======

## 类型

```
(ele: HTMLElement, property: string) => number
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|ele|\-|HTMLElement|必填|
|property|\-|string|必填|

> 输出

描述：无

------

# safeGetComputedStyle
======

## 类型

```
(element: HTMLElement) => CSSStyleDeclaration
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|element|\-|HTMLElement|必填|

> 输出

描述：无

------

# isArray
======

## 类型

```
(obj: any) => boolean
```

## 源码

```
const
{ as cls } from './classnames';
export * from './dom';
export * from './is';
export
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
const* from './type';
* from './color';
export * from './browser';
export * from './locale';
export * from './date';
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
* from './validator';

export function isStringhandleUnit(value: number | string) {
    return typeof va
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
lue === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

function isOneOfarrayTreeFilter<T
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
const>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
        childrenKeyName?: st
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
constring;
        fallbackChildIndex?: number;
    },
) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || '
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
constchildren';
    let children = data || [];
    const result: T[] = [];
    let level = 0;

    do {
        let foundItem: T | undefin
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
consted = children.find(item => filterFn(item, level));
        if (!foundItem && options.fallbackChildIndex !== undefined) {
            foundItem
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
const = children[options.fallbackChildIndex];
        }
        if (!foundItem) {
            break;
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
}
        result.push(foundItem);
        children = (foundItem as any)[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}

function isDeepEqualeaseOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}

/**
 * 历史逻辑问题，轻喷 _(:з」∠)_
 * @desc {en} Please ignore this wei
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|obj|\-|any|必填|
|sub|\-|any|必填|

> 输出

描述：无

------

# componentWrapper
======

## 类型

```
(Component: C, displayName: string, extra?: E) => C & E & { displayName?: string; }
```

## 源码

```
const

{ as cls } from './classnames';
export * from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * fr
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|Component|\-|C|必填|
|displayName|\-|string|必填|
|extra|\-|E|-|

> 输出

描述：无

------

# createPropsGetter

解决defaultProps不能被TS识别类型的问题

======

## 类型

```
() => <P extends Partial<DP>>(props: P) => RecomposedProps
```

## 源码

```
foundItem: T | undefined = children.find(item => filterFn(item, level));
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

function createPropsGettereaseOutCubic(
    ela
```

======

> 输入

无

> 输出

描述：无

------

# fadeColor
======

## 类型

```
(color: string) => string
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|color|\-|string|必填|

> 输出

描述：无

------

# getSystem
======

## 类型

```
() => "" | "pc" | "android" | "ios"
```

## 源码

```
{ as cls } from './classnames';
export * from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

export function getSystemhandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px`
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
const | undefined = children.find(item => filterFn(item, level));
        if (!foundItem && options.fallbackChildIndex !== undefined) {
            foundItem = children[options.fallbackChildIndex];
        }
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = (foundItem as any)[options.childrenKeyName] || [];
        level +=
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
1;
    } while (children.length > 0);
    return result;
}

function isIPhoneXeaseOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return
```

======

> 输入

无

> 输出

描述：无

------

# getMsgTemplate
======

## 类型

```
(templates: Pick<{ required: string; type: { email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; }; number: { min: string; max: string; equal: string; range: string; positive: string; negative: string; }; string: { ...; }; array: { ...; }; object: { ...; }; boolean: { ...;..., temName: any, values: string[]) => string
```

## 源码

```
function getMsgTemplatefingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|templates|\-|Pick\<\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.;\.\.\.|必填|
|temName|\-|any|必填|
|values|\-|string\[\]|必填|

> 输出

描述：无

------

# mergeMsgTemplate
======

## 类型

```
(originMT: any, newMT: any) => Pick<{ required: string; type: { email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; }; number: { min: string; max: string; equal: string; range: string; positive: string; negative: string; }; string: { ...; }; array: { ...; }; object: { ...; }; boolean: { ...;...
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|originMT|\-|any|必填|
|newMT|\-|any|必填|

> 输出

描述：无
