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

## 示例

```
import { stopTouch } from '@arco-design/mobile-utils';
// Before calling stopTouch
const touchEvent = new TouchEvent("touchstart", { cancelable: true });
console.log(touchEvent.defaultPrevented); // false
// Call stopTouch to prevent the default behavior
stopTouch(touchEvent);
// After calling stopTouch
console.log(touchEvent.defaultPrevented); // true
```

## 类型

```
(e: TouchEvent) => void
```

## 源码

```
rt { as cls } from './classnames';
{ default as bezierEasing } from './bezier-easing';
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
export function stopTouchhandleUnit(value: number | string) {
    r
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
// Example 1: Prevent scrolling in the entire document body
preventEleScroll();
// Example 2: Prevent scrolling in a specific element
preventEleScroll(() => document.getElementById('myScrollableElement'));
// Example 3: Prevent scrolling in a specific element with custom touch event handling
preventEleScroll(
   () => document.getElementById('myScrollableElement'),
   false,
   (e) => {
     // Custom touch event handling logic here
     e.preventDefault();
   }
);
```

## 类型

```
(scrollContainer?: () => HTMLElement | null, preventWindow?: boolean | undefined, customStopTouch?: ((e: TouchEvent) => void) | undefined) => void
```

## 源码

```
eturn typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : value;
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

/**
 * 使用了缓出（ease-out）的
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement \| null|ildren.find(item =>|
|preventWindow|是否阻止窗口滚动|boolean \| undefined|-|
|customStopTouch|自定义停止触摸事件的函数|((e: TouchEvent) =\> void) \| undefined|-|

> 输出

无

------

# freeEleScroll

允许元素滚动

======

## 示例

```
import { freeEleScroll } from '@arco-design/mobile-utils';
// Example 1: Allow scrolling in the entire document body
freeEleScroll();
// Example 2: Allow scrolling in a specific element
freeEleScroll(() => document.getElementById('myScrollableElement'));
// Example 3: Allow scrolling in a specific element with custom touch event handling
freeEleScroll(
   () => document.getElementById('myScrollableElement'),
   false,
   (e) => {
     // Custom touch event handling logic here
     // You can choose to call e.preventDefault() or not based on your needs
   }
);
```

## 类型

```
(scrollContainer?: () => HTMLElement | null, preventWindow?: boolean | undefined, customStopTouch?: ((e: TouchEvent) => void) | undefined) => void
```

## 源码

```
方式时返回在给定时间内根据缓动函数计算得到的新值
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
 * nextTick(() => { updateLayoutData(); });
 * ```
 */
export function nextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simul
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement \| null|event loop cycle
 *|
|preventWindow|是否阻止窗口滚动|boolean \| undefined|-|
|customStopTouch|自定义停止触摸事件的函数|((e: TouchEvent) =\> void) \| undefined|-|

> 输出

无

------

# isContains

判断父节点是否包含子节点

======

## 示例

```
import { isContains } from '@arco-design/mobile-utils';
// Example 1: When the parent contains the direct child
const parentElement = document.getElementById('parent');
const childElement = document.getElementById('directChild');
const result1 = isContains(parentElement, childElement);
console.log(result1); // Output: true
// Explanation: In this example, the parent element (#parent) contains a direct child element (#directChild).
// Example 2: When the parent contains an indirect child
const grandparentElement = document.getElementById('grandparent');
const indirectChildElement = document.getElementById('indirectChild');
const result2 = isContains(grandparentElement, indirectChildElement);
console.log(result2); // Output: true
// Explanation: Here, the grandparent element (#grandparent) contains an indirect child element (#indirectChild) nested within other elements.
// Example 3: When the parent does not contain the child
const unrelatedParent = document.getElementById('unrelatedParent');
const unrelatedChild = document.getElementById('unrelatedChild');
const result3 = isContains(unrelatedParent, unrelatedChild);
console.log(result3); // Output: false
// Explanation: In this case, the unrelated parent element (#unrelatedParent) and unrelated child element (#unrelatedChild) are not related in the DOM structure.
```

## 类型

```
(parentEl: HTMLElement | null, childrenEl: HTMLElement | null) => boolean
```

## 源码

```
ate the sliding damping effect, use the function isContainsx = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
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
 * import { fingerDisToLabelDis } from '@arco-design/mobile-utils';
 *
 * const test = fingerDisToLabelDis(1000, 0.01);
 * ```
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
|parentEl|父节点|HTMLElement \| null|必填|
|childrenEl|子节点|HTMLElement \| null|必填|

> 输出

{boolean} 是否包含子节点

------

# execRAF

使用 requestAnimationFrame 执行函数，如果不支持则使用 setTimeout 作为兜底

======

## 示例

```
import { execRAF } from '@arco-design/mobile-utils';
// Example 1: Using requestAnimationFrame
const rafId = execRAF(() => {
   console.log("Using requestAnimationFrame");
});
console.log(rafId); // Output: A numerical ID representing the requestAnimationFrame callback
// Explanation:
// This example demonstrates using `execRAF` with `requestAnimationFrame` to execute a function.
// `requestAnimationFrame` is typically used for animations and smooth updates.
// The ID returned by `requestAnimationFrame` is logged, which can be useful for canceling the animation frame if needed.
// Example 2: Using setTimeout as a fallback
const setTimeoutId = execRAF(() => {
   console.log("Using setTimeout as a fallback");
});
console.log(setTimeoutId); // Output: A numerical ID representing the setTimeout callback
// Explanation:
// In situations where the browser does not support `requestAnimationFrame`,
// `execRAF` falls back to using `setTimeout` with a delay of approximately 17 milliseconds (equivalent to a frame rate of 60 frames per second).
// The ID returned by `setTimeout` is logged, allowing you to manage the execution of the function, even in browsers without `requestAnimationFrame` support.
```

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

{number} 返回 requestAnimationFrame 或 setTimeout 的 ID

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

## 示例

```
import { scrollParent } from '@arco-design/mobile-utils';
// Example 1: Finding the scroll parent of a DOM node
const targetNode = document.getElementById('targetElement');
const scrollParentNode = scrollParent(targetNode);
console.log(scrollParentNode); // Output: The nearest scrollable parent element or the document
// Explanation:
// This example demonstrates how to use the `scrollParent` function to find the nearest scrollable parent element of a given DOM node.
// It returns the nearest scrollable parent element, or if none is found, it returns the document.
// Example 2: Finding the scroll parent of the document body
const bodyNode = document.body;
const scrollParentBody = scrollParent(bodyNode);
console.log(scrollParentBody); // Output: The document's HTML element (document.documentElement)
// Explanation: In this scenario, we use the `scrollParent` function to find the scrollable parent of the document body.
```

## 类型

```
(node: HTMLElement) => HTMLElement | Document | null
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

{HTMLElement | Document | null} 返回节点的最近可滚动父节点或 document 对象

------

# getOffset

获得元素 offset

======

## 示例

```
import { getOffset } from '@arco-design/mobile-utils';
const element = document.getElementById('exampleElement');
const offset = getOffset(element);
console.log('Element Width:', offset.width);
console.log('Element Height:', offset.height);
console.log('Element Top Offset:', offset.top);
console.log('Element Left Offset:', offset.left);
```

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

## 示例

```
import { checkOverflowVisible } from '@arco-design/mobile-utils';
const component = {
   node: document.getElementById('myComponent'),
   offset: 20, // Set the offset value
   threshold: 0.5, // Set the threshold value
}
const myParent = document.getElementById('myParent');
const isVisible = checkOverflowVisible(component, myParent);
```

## 类型

```
(component: T, parent: HTMLElement | Document | null) => boolean
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
|parent|当前元素所在容器 dom 节点|HTMLElement \| Document \| null|必填|

> 输出

无

------

# checkNormalVisible

检查非局部滚动容器元素是否在视口区域内

======

## 示例

```
import { checkNormalVisible } from '@arco-design/mobile-utils';
// Example usage:
const element = document.getElementById('myElement');
// Make sure to set the offset and threshold values to actual values that suit your use case.
const isVisible = checkNormalVisible({
   node: element,
   offset: 20, // Set the offset value
   threshold: 0.5, // Set the threshold value
});
if (isVisible) {
   console.log('The element is in the viewport area');
} else {
   console.log('The element is not in the viewport area');
}
```

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

{boolean} 如果元素可见，则返回 true，否则返回 false。

------

# appendElementById

根据id动态添加dom元素

======

## 示例

```
import { appendElementById } from '@arco-design/mobile-utils';
// Example 1: Add a div element with the id "myDiv" to the body.
const { child, container } = appendElementById("myDiv");
// Example 2: Add a div element with the id "customDiv" to a specific container.
const customContainer = document.getElementById("customContainer");
const { child, container } = appendElementById("customDiv", () => customContainer);
```

## 类型

```
(id: string, getContainer?: (() => HTMLElement) | undefined) => { child: HTMLElement; container: any; }
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
|getContainer|被添加元素的父级|(() =\> HTMLElement) \| undefined|-|

> 输出

无

------

# removeElement

从父级节点移除该元素

======

## 示例

```
import { removeElement } from '@arco-design/mobile-utils';
// HTML: <div id="myElement">This is a div</div>
const elementToRemove = document.getElementById('myElement');
// The element with ID 'myElement' will be removed from the DOM
removeElement(elementToRemove);
```

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

## 示例

```
import { getActualContainer } from '@arco-design/mobile-utils';
const customContainer = document.getElementById("customContainer");
const actualContainer = getActualContainer(() => customContainer);
```

## 类型

```
(getContainer?: (() => any) | undefined) => any
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|getContainer|指定滚动容器|(() =\> any) \| undefined|-|

> 输出

无

------

# getValidScrollContainer

获取有效滚动监听容器，默认情况或者监听 body 的滚动时均指定为 window

======

## 示例

```
import { getValidScrollContainer } from '@arco-design/mobile-utils';
const customContainer = document.getElementById("customContainer");
const validScrollContainer = getValidScrollContainer(() => customContainer);
```

## 类型

```
(getContainer?: (() => any) | undefined) => any
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|getContainer|指定滚动容器|(() =\> any) \| undefined|-|

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
(property: string, getContainer?: (() => any) | undefined) => number
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
|getContainer|待计算滚动容器|(() =\> any) \| undefined|-|

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
(container: any) => { isGlobal: boolean; scrollEle: any; containerRect: Pick<any, string | number | symbol>; }
```

## 源码

```
const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|container|滚动容器|any|必填|

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
(element: HTMLElement) => any
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
export { default as bezierEasing } from './bezier-easing';
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
function isObjecthandleUnit(value: number | string) {
    return typeof value === 'number' || !isNaN(Number(value)) ? `${value}px` : val
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
ue;
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
 * import { arrayTr
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
eeFilter } from '@arco-design/mobile-utils';
 *
 * const test = arrayTreeFilter(data, (item: any, level: number) => level <= index && item.value === value[level]);
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
        let foundItem: T | undefined = children.find(i
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
consttem => filterFn(item, level));
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
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计算得
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
到的新值
 * @desc {en} When the ease-out method is used, the new value calculated according to the easing function isFunctionis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @param {number} duration {en} duration
 * @return {nu
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
mber} 返回在给定时间内根据缓动函数计算得到的新值
 * @return {number} {en} Returns the new value calculated from the easing function isNullwithin the given time
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
    return amoun
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
tOfChange * (newElapsed * newElapsed * newElapsed + 1) + initialValue;
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
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设
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
置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function isEmptyArrayx = X/(aX+b), where x is the element displacement, X is the sliding distance, and a and b are custom parameters obtained by setting the corresponding relationship between the two targets
 * 例如目标X=500时x=100, X=200时x=60，可得a,b
 * @desc {en} For example, when the target X=500, x=100, when X=200, x=60, you can get a,b
 * @param {number} x 元素位移
 * @param {number} x {en} element displacement
 * @param {[n
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
umber, number] | number} damping 阻尼参数
 * @param {[number, number] | number} damping {en} Damping parameters
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
(Component: any, params: string | E, extra?: E | undefined) => C & E & { displayName?: string | undefined; }
```

## 源码

```
ional object
 * @return {string} 过滤后的数组
 * @return {string} filtered array
 * @example
 * ```
 * import { arrayTreeFilter } from '@arco-design/mobile-utils';
 *
 * const test = arrayTreeFilter(data, (item: any, level: number) => level <= index && item.value === value[level]);
 * ```
 */
function componentWrapperarrayTreeFilter<T>(
    data: T[],
    filterFn: (item: T, level: number) => boolean,
    options?: {
        childrenKeyName?: string;
        fallbackChildIndex?: number;
    },
) {
    options = options || {};
    option
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|Component|\-|any|必填|
|params|\-|string \| E|必填|
|extra|\-|E \| undefined|-|

> 输出

无

------

# createPropsGetter

解决defaultProps不能被TS识别类型的问题

======

## 示例

```
import { createPropsGetter } from '@arco-design/mobile-utils';
const propsGetter = createPropsGetter(props);
```

## 类型

```
() => function
```

## 源码

```
consts.childrenKeyName = options.childrenKeyName || 'children';
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
 * @desc {en} When the ease-out method is used, the new value calculated according to the easing fun
```

======

> 输入

无

> 输出

{function} 返回可被TS识别的Props的函数

------

# fadeColor

获取任意颜色的透明色

======

## 示例

```
import { fadeColor } from '@arco-design/mobile-utils';
const transparentColor = fadeColor('#ffffff');
// transparentColor is '#ffffff00'
```

## 类型

```
(color: string) => string
```

## 源码

```
const w3cx11 = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflower: '#6495ed',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    laserlemon: '#ffff54',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrod: '#fafad2',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    maroon2: '#7f0000',
    maroon3: '#b03060',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    purple2: '#7f007f',
    purple3: '#a020f0',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};
 
tom parameters obtained by setting the corresponding relationship between the two targets
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
 * import { fingerDisToLabelDis } from '@arco-design/mobile-utils';
 *
 * const test = fingerDisToLabelDis(1000, 0.01);
 * ```
 */
function fadeColorfingerDisToLabelDis(x: number, damping?: [number, number] | number) {
    const dampArr = typeof damping === 'number' ? [damping] : damping;
    const [a = 0.013312, b = 1.636345] = dampArr || [];
    return x / (a * x + b);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|color|颜色|string|必填|

> 输出

transparent color

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
{ as cls } from './classnames';
export { default as bezierEasing } from './bezier-easing';
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
 * @param {Object} opti
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
 * @param {number} duration {en} du
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
ration
 * @return {number} 返回在给定时间内根据缓动函数计算得到的新值
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
 * import { nextTick } from '@arco-design
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
/mobile-utils';
 *
 * nextTick(() => { updateLayoutData(); });
 * ```
 */
function isSSRnextTick(func: () => void) {
    setTimeout(func, 20);
}

/**
 * 模拟滑动阻尼效果，使用函数x = X/(aX+b)，x为元素位移，X为滑动距离，a,b为自定义参数通过设置两个目标对应关系求得
 * @desc {en} To simulate the sliding damping effect, use the function x = X/(aX+b), where x is the element displacement, X is the sliding distance,
```

======

> 输入

无

> 输出

无

------

# getMsgTemplate
======

## 类型

```
(templates: Pick<{ required: string; type: { email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; }; number: { min: string; max: string; equal: string; range: string; positive: string; negative: string; }; string: { ...; }; array: { ...; }; object: { ...; }; boolean: { ...;..., temName: any, values: string[]) => string
```

## 源码

```
const     fallbackChildIndex?: number;
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
 * 使用了缓出（ease-out）的方式时返回在给定时间内根据缓动函数计
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
{en} When the ease-out method is used, the new value calculated according to the easing function mergeMsgTemplateis returned within a given time.
 * @param {number} elapsed 持续时间
 * @param {number} elapsed {en} duration
 * @param {number} initialValue 初始值
 * @param {number} initialValue {en} initial value
 * @param {number} amountOfChange 变动系数
 * @param {number} amountOfChange {en} coefficient of variation
 * @param {number} duration 持续时间
 * @par
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|originMT|\-|any|必填|
|newMT|\-|any|必填|

> 输出

无
