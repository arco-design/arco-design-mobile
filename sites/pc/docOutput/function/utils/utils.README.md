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

无

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

无

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

无

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

无

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

无

------

# stopTouch

阻止 TouchEvent 事件的默认行为

======

## 类型

```
(e: TouchEvent) => void
```

## 源码

```

rt { as cls } from './classnames';
* from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

export function stopTouchhandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|e|要阻止的 TouchEvent 事件|TouchEvent|必填|

> 输出

无

------

# preventEleScroll

阻止元素滚动

======

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```

}

function preventEleScrollarrayTreeFilter<T>(
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

export function easeOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement|ackChildIndex !== u|
|preventWindow|是否阻止窗口滚动|boolean|-|
|customStopTouch|自定义停止触摸事件的函数|(e: TouchEvent) =\> void|-|

> 输出

无

------

# freeEleScroll

允许元素滚动

======

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```

duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}

/**
 * 历史逻辑问题，轻喷 _(:з」∠)_
 * @desc {en} Please ignore this weird function freeEleScroll_(:з」∠)_
 */
function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function x = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 */
export function fingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof dampi
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement|isplacement, X is t|
|preventWindow|是否阻止窗口滚动|boolean|-|
|customStopTouch|自定义停止触摸事件的函数|(e: TouchEvent) =\> void|-|

> 输出

无

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

constng === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|parentEl|父节点|HTMLElement|必填|
|childrenEl|子节点|HTMLElement|必填|

> 输出

无

------

# execRAF

使用 requestAnimationFrame 执行函数，如果不支持则使用 setTimeout 作为兜底

======

## 类型

```
(fn: Function) => number
```

## 源码

```

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|fn|需要执行的函数|Function|必填|

> 输出

requestAnimationFrame 或 setTimeout 的 ID

> Timeout

|参数|描述|类型|
|----------|-------------|------|
|hasRef|If true, the \`Timeout\` object will keep the Node\.js event loop active\. @since v11\.0\.0|() =\> boolean|
|refresh|Sets the timer's start time to the current time, and reschedules the timer to call its callback at the previously specified duration adjusted to the current time\. This is useful for refreshing a timer without allocating a new JavaScript object\.  Using this on a timer that has already called its callback will reactivate the timer\. @since v10\.2\.0 @return a reference to \`timeout\`|() =\> Timeout|
|ref|-|() =\> Timeout|
|unref|-|() =\> Timeout|

------

# scrollWithAnimation

使用动画滚动页面

======

## 类型

```
(initTop: number, target: number, scrollTo: function, duration?: number, bezier?: Array<number>, type?: 'by'|'to') => void
```

## 源码

```

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initTop|初始滚动位置（像素）|number|必填|
|target|目标滚动位置（像素）|number|必填|
|scrollTo|滚动函数|function|必填|
|duration|动画持续时间（毫秒）|number|-|
|bezier|贝塞尔曲线参数|Array\<number\>|-|
|type|滚动类型：'by'表示相对滚动，'to'表示绝对滚动|'by'\|'to'|-|

> 输出

无

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

无

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

无

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

无

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
|component|当前元素节点|T|必填|

> 输出

无

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

无

------

# removeElement

从父级节点移除该元素

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

无

------

# getActualContainer

获取滚动容器，如果传入 string 则使用 querySelector 选取容器

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
|getContainer|指定滚动容器|() =\> string \| HTMLElement \| Window|-|

> 输出

无

------

# getValidScrollContainer

获取有效滚动监听容器，默认情况或者监听 body 的滚动时均指定为 window

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
|getContainer|指定滚动容器|() =\> HTMLElement \| Window|-|

> 输出

无

------

# getScrollContainerAttribute

获取滚动容器的属性。针对 window 和 document 额外进行一些属性兼容处理。

======

## 示例

```
import { getScrollContainerAttribute } from '@arco-design/mobile-utils';
const contentRef = useRef<HTMLDivElement>(null);
const scrollTop = getScrollContainerAttribute('scrollTop', () => contentRef.current);
```

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
|property|所需属性|string|必填|
|getContainer|待计算滚动容器|() =\> HTMLElement \| Document \| Window|-|

> 输出

无

------

# getScrollContainerRect

提供了元素的大小及其相对于视口的位置。

======

## 示例

```
import { getScrollContainerAttribute } from '@arco-design/mobile-utils';
const contentRef = useRef<HTMLDivElement>(null);
const scrollTop = getScrollContainerAttribute('scrollTop', () => contentRef.current);
```

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
|container|滚动容器|HTMLElement \| Window|必填|

> 输出

无

------

# removeCssStyleDom

删除自定义 style 标签，配合 addCssStyleDom 函数一起使用

======

## 示例

```
import { removeCssStyleDom } from '@arco-design/mobile-utils';
removeCssStyleDom('arcoTheme');
```

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
|key|标签对应的key|string|必填|

> 输出

无

------

# addCssStyleDom

添加自定义 style 标签，addCssKeyframes 和 addCssRules 的底层方法

======

## 示例

```
import { addCssStyleDom } from '@arco-design/mobile-utils';
addCssStyleDom('arcoTheme', ':root {--base-font-size: 50;}');
```

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
|key|标签对应的key|string|必填|
|html|样式内容|string|必填|

> 输出

无

------

# addCssKeyframes

增加自定义关键帧动画变量，实现动画函数复用。

======

## 示例

```
import { addCssKeyframes } from '@arco-design/mobile-utils';
const maxScaleWithDefault = 2;
addCssKeyframes(
'animationKey',
`{
0% {
width: 100%;
}
50% {
width: ${100 * maxScaleWithDefault}%;
}
100% {
width: 100%;
}
}`,
);
```

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
|key|规则名称|string|必填|
|rules|动画关键帧|string|必填|

> 输出

无

------

# addCssRules

增加自定义 CSS 变量规则，使用后将在线替换css变量。需设置less变量 @use-css-vars: 1

======

## 示例

```
import { addCssRules } from '@arco-design/mobile-utils';
addCssRules('arcoTheme', { 'base-font-size': '50' });
```

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
|key|规则名称|string|必填|
|rules|规则对象|Record\<string, string\>|必填|

> 输出

无

------

# getActualPixel

不同机型下的字体大小与标准字体大小的比率，计算类似.rem()

======

## 示例

```
import { getActualPixel } from '@arco-design/mobile-utils';
const actualPixel = getActualPixel(16, 50);
```

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
|baseFontSize|基准字号|Number|-|

> 输出

计算后的像素值

------

# convertCssDuration

获取元素的时间属性值，结果统一成毫秒级别

======

## 示例

```
import { convertCssDuration } from '@arco-design/mobile-utils';
const contentRef = useRef<HTMLDivElement>(null);
const transTimeout = convertCssDuration(contentRef.current, 'transitionDuration');
```

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
|ele|要获取样式的元素|HTMLElement|必填|
|property|与时间相关属性|string|必填|

> 输出

无

------

# safeGetComputedStyle

获取指定元素的 CSS 样式，当抛出异常时返回空对象

======

## 示例

```
import { safeGetComputedStyle } from '@arco-design/mobile-utils';
const element = document.querySelector("p");
const compStyle =safeGetComputedStyle(element);
```

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
|element|要获取样式的元素|HTMLElement|必填|

> 输出

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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

无

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
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    let children = data ||
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

childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
}

function checkIPhoneXeaseOutCubic(
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
 * @desc {en} Please ignore this weird function _(:з」∠)_
 */
export function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function x = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=1
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

00, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 */
function isIPhoneXfingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

无

> 输出

iPhone X，则返回 true，否则返回 false

------

# getMsgTemplate
======

## 类型

```
(templates: Pick<{ required: string; type: { email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; }; number: { min: string; max: string; equal: string; range: string; positive: string; negative: string; }; string: { ...; }; array: { ...; }; object: { ...; }; boolean: { ...;..., temName: any, values: string[]) => string
```

## 源码

```

imeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function getMsgTemplatex = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 */
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
|templates|\-|Pick\<\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.;\.\.\.|必填|
|temName|\-|any|必填|
|values|\-|string\[\]|必填|

> 输出

无

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

无
