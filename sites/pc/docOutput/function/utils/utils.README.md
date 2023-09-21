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

无

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

无

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

无

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

无

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
constrt { as cls } from './classnames';
* from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

/**
 * 给值带上 px 的单位，有单位的值直接返回
 * @desc {en} Add the unit of px to the number, and return it directly if there is a unit.
 * @param {number |
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|e|要阻止的 TouchEvent 事件|TouchEvent|必填|

> 输出

{void}

------

# preventEleScroll

阻止元素滚动

======

## 示例

```
import { preventEleScroll } from '@arco-design/mobile-utils';
// Prevent scrolling in the entire document body
preventEleScroll();
// Prevent scrolling in a specific element with custom touch event handling
preventEleScroll(() => document.getElementById('myScrollableElement'), false, (e) => {
   // Custom touch event handling logic here
   e.preventDefault();
});
```

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```
string} value 需要设置的值
 * @param {number | string} value {en} The value that needs to be set
 * @return {string} 返回带有单位的值
 * @return {string} {en} Returns a value with units*
 * @example
 * ```
 * import { handleUnit } from '@arco-design/mobile-utils';
 *
 * const test = handleUnit(5);
 * ```
 */
function preventEleScrollhandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

/**
 * 基于给定的过滤函数返回一个过滤后的数组
 * @desc {en} Returns a filtered array based on the given filter function
 * @param {T[]} data 数据数组
 * @param {T[]} data {en} data array
 * @param {Function} filterFn 过滤函数
 * @param {Function} filterFn {en} filter function
 * @param {Object} options 可选对象
 * @param {Object} options {en} Optional object
 * @return {string} 过滤后的数组
 * @return {string} filtered array
 * @example
 * ```
 * import { arrayTreeFilter } from '@arco-design/mobile-utils';
 *
 * const test = arrayTreeFilter(data, (item: any, level: number) => level <= index && item.value === value[level]);
 * ```
 */
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
    let children = data || [];
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement|arrayTreeFilter(dat|
|preventWindow|是否阻止窗口滚动|boolean|-|
|customStopTouch|自定义停止触摸事件的函数|(e: TouchEvent) =\> void|-|

> 输出

无

------

# freeEleScroll

允许元素滚动

======

## 示例

```
import { freeEleScroll } from '@arco-design/mobile-utils';
// Allow scrolling in the entire document body
freeEleScroll();
// Allow scrolling in a specific element with custom touch event handling
freeEleScroll(() => document.getElementById('myScrollableElement'), false, (e) => {
   // Custom touch event handling logic here
   // You can choose to call e.preventDefault() or not based on your needs
});
```

## 类型

```
(scrollContainer?: () => HTMLElement, preventWindow?: boolean, customStopTouch?: (e: TouchEvent) => void) => void
```

## 源码

```
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

/**
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值
 * @desc {en} When the ease-out method is used, the new value calculated according to the easing function freeEleScrollis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @return {number} 返回在给定时间内根据缓动函数计算得到的新值
 * @return {number} {en} Returns the new value calculated from the easing function within the given time
 * @example
 * ```
 * import { easeOutCubic } from '@arco-design/mobile-utils';
 *
 * const test = easeOutCubic(2000, 10, 1.2, 1000);
 * ```
 */
function easeOutCubic(
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement|on
 * @param {numbe|
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
elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}

/**
 * 在下一个事件循环周期执行给定的函数
 * @desc {en} Execute the given function isContainson the next event loop cycle
 * @param {Function} func 执行的函数
 * @param {Function} func {en} function executed
 * @example
 * ```
 * import { nextTick } from '@arco-design/mobile-utils';
 *
 * nextTick(() => { updateLayoutData(); });
 * ```
 */
function ne
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
xtTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function execRAFx = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 * @param {number} x 元素位移
 * @param {number} x {en} element displacement
 * @param {[number, number] | number} damping 阻尼参数
 * @param {[number, number] | number} damping {en} Damping parameters
 * @return {number} 返回需要滑动的距离
 * @return {number} {en} Return the distance required to slide
 * @example
 * ```
 * import
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|fn|需要执行的函数|Function|必填|

> 输出

{number} 返回 requestAnimationFrame 或 setTimeout 的 ID

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

## 示例

```
import { scrollWithAnimation } from '@arco-design/mobile-utils';
// Scroll to 500px from the current position over 1 second
scrollWithAnimation(
     window.pageYOffset,
     500,
     (top) => window.scrollTo({ top }),
     1000,
     [0.34, 0.69, 0.1, 1],
     'to'
);
```

## 类型

```
(initTop: number, target: number, scrollTo: function, duration?: number, bezier?: Array<number>, type?: 'by'|'to') => void
```

## 源码

```
{ fingerDisToLabelDis } from '@arco-design/mobile-utils';
 *
 * const test = fingerDisToLabelDis(1000, 0.01);
 * ```
 */
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

{String} 计算后的像素值

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
const
{ as cls } from './classnames';
export * from './dom';
export * from './is';
export * from './type';
export * from './color';
export * from './browser';
export * from './locale';
export * from './date';
export * from './validator';

/**
 * 给值带上 px 的单位，有单位的值直接返回
 * @desc {en} Add the unit of px to the number, and return it directly if there is a unit.
 * @param {number | string} value 需要设置的值
 * @param {number
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
| string} value {en} The value that needs to be set
 * @return {string} 返回带有单位的值
 * @return {string} {en} Returns a value with units*
 * @example
 * ```
 * import { handleUnit } from '@arco-design/mobile-utils';
 *
 * const test = handleUnit(5);
 * ```
 */
function isObjecthandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

/**
 * 基于给定的过滤函数返回一个过滤后的数组
 * @desc {en} Returns a f
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
iltered array based on the given filter function
 * @param {T[]} data 数据数组
 * @param {T[]} data {en} data array
 * @param {Function} filterFn 过滤函数
 * @param {Function} filterFn {en} filter function
 * @param {Object} options 可选对象
 * @param {Object} options {en} Optional object
 * @return {string} 过滤后的数组
 * @return {string} filtered array
 * @example
 * ```
 * import { arrayTreeFilter } from '@arco-design/mobile-utils';
 *
 * const te
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
st = arrayTreeFilter(data, (item: any, level: number) => level <= index && item.value === value[level]);
 * ```
 */
function isOneOfarrayTreeFilter<T>(
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
        if (!foundItem && op
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
consttions.fallbackChildIndex !== undefined) {
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

/**
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值
 * @desc {en} When the ease-out method is used, the ne
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
w value calculated according to the easing function isFunctionis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @return {number} 返回在给定时间内根据缓动函数计算得到的新值
 * @return {number} {en} Return
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
s the new value calculated from the easing function isNullwithin the given time
 * @example
 * ```
 * import { easeOutCubic } from '@arco-design/mobile-utils';
 *
 * const test = easeOutCubic(2000, 10, 1.2, 1000);
 * ```
 */
function easeOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + in
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
itialValue;
}

/**
 * 在下一个事件循环周期执行给定的函数
 * @desc {en} Execute the given function isUndefinedon the next event loop cycle
 * @param {Function} func 执行的函数
 * @param {Function} func {en} function executed
 * @example
 * ```
 * import { nextTick } from '@arco-design/mobile-utils';
 *
 * nextTick(() => { updateLayoutData(); });
 * ```
 */
function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping e
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
ffect, use the function isEmptyArrayx = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 * @param {number} x 元素位移
 * @param {number} x {en} element displacement
 * @param {[number, number] | number} damping 阻尼参数
 * @param {[number, n
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
umber] | number} damping {en} Damping parameters
 * @return {number} 返回需要滑动的距离
 * @return {number} {en} Return the distance required to slide
 * @example
 * ```
 * import { fingerDisToLabelDis } from '@arco-design/mobile-utils';
 *
 * const test = fingerDisToLabelDis(1000, 0.01);
 * ```
 */
function isDeepEqualfingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
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
er(value)) ? `${value}px` : value;
}

/**
 * 基于给定的过滤函数返回一个过滤后的数组
 * @desc {en} Returns a filtered array based on the given filter function
 * @param {T[]} data 数据数组
 * @param {T[]} data {en} data array
 * @param {Function} filterFn 过滤函数
 * @param {Function} filterFn {en} filter function
 * @param {Object} options 可选对象
 * @param {Object} options {en} Optional object
 * @return {string} 过滤后的数组
 * @return {string} filtered array
 * @example
 * ```
 * import { arrayTreeFilter } from '@
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
constned by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 * @param {number} x 元素位移
 * @param {number} x {en} element displacement
 * @param {[number, number] | number} damping 阻尼参数
 * @param {[number, number] | number} dam
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

/**
 * 给值带上 px 的单位，有单位的值直接返回
 * @desc {en} Add the unit of px to the number, and return it directly if there is a unit.
 * @param {number | string} value 需要设置的值
 * @param {number | string} value {en} The value that needs to be set
 * @return {string} 返回带有单位的值
 * @return {string} {en} Returns a value with units*
 * @example
 * ```
 * import { handleUnit } from '@arco-design/mobile-utils';
 *
 * const test = handleUnit(5);
 * ```
 */
export function getSystemhandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
}

/**
 * 基于给定的过滤函数返回一个过滤后的数组
 * @desc {en} Returns a filtered array based on the given filter function
 * @param {T[]} data 数据数组
 * @param {T[]} data {en} data array
 * @param {Function} filterFn 过滤函数
 * @param {Function} filterFn {en} filter function
 * @param {Object} options 可选对象
 * @param {Object} options {en} Optional object
 * @return {string} 过滤
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
hildIndex?: number;
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

/**
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值
 * @desc {en} When the ease-out method is used, the new value calculated according to the easing function checkIPhoneXis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @return {number} 返回在给定时间内根据缓动函数计算得到的新值
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
* @return {number} {en} Returns the new value calculated from the easing function isIPhoneXwithin the given time
 * @example
 * ```
 * import { easeOutCubic } from '@arco-design/mobile-utils';
 *
 * const test = easeOutCubic(2000, 10, 1.2, 1000);
 * ```
 */
function easeOutCubic(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
) {
    const newElapsed = elapsed / duration - 1;
    return amountOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
}

/**
 * 在下一个事件循环周期执行给定的函数
 * @desc {en} Execute the given function on the next event loop cycle
 * @param {Function} func 执行的函数
 * @param {Function} func {en} function executed
 * @example
 * ```
 * import { nextTick } from '@arco-design/mobile-utils';
 *
 * nextTick(() => { updateLayou
```

======

> 输入

无

> 输出

{boolean} 如果当前设备是 iPhone X，则返回 true，否则返回 false

------

# getMsgTemplate
======

## 类型

```
(templates: Pick<{ required: string; type: { email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; }; number: { min: string; max: string; equal: string; range: string; positive: string; negative: string; }; string: { ...; }; array: { ...; }; object: { ...; }; boolean: { ...;..., temName: any, values: string[]) => string
```

## 源码

```
constoptions || {};
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

/**
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得到的新值
 * @desc {en} When the ease-out method is used, the
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
lated according to the easing function mergeMsgTemplateis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @return {number} 返回在给
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|originMT|\-|any|必填|
|newMT|\-|any|必填|

> 输出

无
