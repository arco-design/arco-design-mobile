

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
function stopTouch(e: TouchEvent) {
    // If the TouchEvent is cancelable, prevent it's behavior using preventDefault
    e.cancelable && e.preventDefault();
}
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
function preventEleScroll(
    scrollContainer: () => HTMLElement | null = () => document.body,
    preventWindow?: boolean,
    customStopTouch?: (e: TouchEvent) => void,
) {
    const element = scrollContainer();
    if (!element) {
        return;
    }
    element.style.overflow = 'hidden';
    element.style.touchAction = 'none';
    const preEle = preventWindow ? window : element;
    preEle.addEventListener('touchmove', customStopTouch || stopTouch, {
        passive: false,
        capture: true,
    });
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement \| null|() => document.body|
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
function freeEleScroll(
    scrollContainer: () => HTMLElement | null = () => document.body,
    preventWindow?: boolean,
    customStopTouch?: (e: TouchEvent) => void,
) {
    const element = scrollContainer();
    if (!element) {
        return;
    }
    element.style.overflow = '';
    element.style.touchAction = '';
    const preEle = preventWindow ? window : element;
    preEle.removeEventListener('touchmove', customStopTouch || stopTouch, { capture: true });
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|scrollContainer|滚动容器的函数，默认为 document\.body|() =\> HTMLElement \| null|() => document.body|
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
function isContains(parentEl: HTMLElement | null, childrenEl: HTMLElement | null) {
    if (!parentEl || !childrenEl) return false;
    if (parentEl.contains) {
        return parentEl.contains(childrenEl);
    }
    let parent: HTMLElement | null = childrenEl;
    while (parent) {
        if (parentEl === parent) {
            return true;
        }
        parent = parent.parentNode as HTMLElement;
    }
    return false;
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
function execRAF(fn) {
    try {
        return requestAnimationFrame(fn);
    } catch (e) {
        // Note that the delay time for setTimeout is 17 milliseconds, which is approximately equivalent to a frame rate of 60 frames per second.
        // This is a good fallback option because requestAnimationFrame also typically runs at a rate of about 60 frames per second.
        return setTimeout(fn, 17);
    }
}
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
function scrollWithAnimation(
    initTop: number,
    target: number,
    scrollTo: (top: number) => void,
    duration = 300,
    bezier: [number, number, number, number] = [0.34, 0.69, 0.1, 1],
    type: 'by' | 'to' = 'to',
) {
    const targetTop = type === 'by' ? initTop + target : target;
    const start = Date.now();
    const fn = () => {
        const p = (Date.now() - start) / duration;
        if (p > 1) {
            scrollTo(targetTop);
        } else {
            const newTop = initTop + (targetTop - initTop) * bezierEasing(...bezier)(p);
            scrollTo(newTop);
            execRAF(fn);
        }
    };
    execRAF(fn);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initTop|初始滚动位置（像素）|number|必填|
|target|目标滚动位置（像素）|number|必填|
|scrollTo|滚动函数|function|必填|
|duration|动画持续时间（毫秒）|number|300|
|bezier|贝塞尔曲线参数|Array\<number\>|[0.34, 0.69, 0.1, 1]|
|type|滚动类型：'by'表示相对滚动，'to'表示绝对滚动|'by'\|'to'|'to'|

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
function scrollParent(node: HTMLElement): HTMLElement | Document | null {
    const excludeStaticParent = node.style.position === 'absolute';
    const overflowList = ['scroll', 'auto'];
    let parent = node;

    while (parent) {
        if (!parent.parentNode) {
            return node.ownerDocument || document.documentElement;
        }

        const style = window.getComputedStyle(parent);
        const { position } = style;
        const overflowX = style.overflowX || '';
        const overflowY = style.overflowY || '';

        if (position === 'static' && excludeStaticParent) {
            parent = parent.parentNode as HTMLElement;
            continue;
        }
        if (overflowList.indexOf(overflowY) > -1 || overflowList.indexOf(overflowX) > -1) {
            return parent;
        }

        parent = parent.parentNode as HTMLElement;
    }
    return node.ownerDocument || document.documentElement;
}
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
function getOffset(node: HTMLElement | Document | null) {
    let width: number, height: number, left: number, top: number;
    if (node instanceof HTMLElement) {
        ({ width, height, left, top } = node.getBoundingClientRect() || {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
        });
    } else {
        width = 0;
        height = 0;
        top = 0;
        left = 0;
    }
    return {
        width,
        height,
        top,
        left,
    };
}
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
function checkOverflowVisible<T extends TCheckVisibleBaseProps>(
    component: T,
    parent: HTMLElement | Document | null,
): boolean {
    const { node, offset, threshold } = component;
    const {
        top: parentTop,
        height: parentHeight,
        left: parentLeft,
        width: parentWidth,
    } = getOffset(parent);
    const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;

    const intersectionTop = Math.max(parentTop, 0);
    const intersectionHeight =
        Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop;

    const intersectionLeft = Math.max(parentLeft, 0);
    const intersectionWidth =
        Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft;

    const { top, height: elementHeight, left, width: elementWidth } = getOffset(node);

    const offsets = formatOffset(offset);

    const offsetTop = top - intersectionTop;
    const thresholdHeight = elementHeight * threshold;

    const offsetLeft = left - intersectionLeft;
    const thresholdWidth = elementWidth * threshold;

    return (
        offsetTop - offsets[2] + thresholdHeight <= intersectionHeight &&
        offsetTop + elementHeight + offsets[0] >= 0 + thresholdHeight &&
        offsetLeft - offsets[1] + thresholdWidth <= intersectionWidth &&
        offsetLeft + elementWidth + offsets[3] >= 0 + thresholdWidth
    );
}
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
function checkNormalVisible<T extends TCheckVisibleBaseProps>(component: T): boolean {
    const { node, offset, threshold } = component;
    if (!(node instanceof HTMLElement)) {
        return false;
    }
    if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) {
        return false;
    }
    const { top, height: elementHeight, left, width: elementWidth } = getOffset(node);

    const windowInnerHeight = window.innerHeight || document.documentElement!.clientHeight;
    const thresholdHeight = elementHeight * threshold;

    const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;
    const thresholdWidth = elementWidth * threshold;

    const offsets = formatOffset(offset);

    return (
        top - offsets[2] + thresholdHeight <= windowInnerHeight &&
        top + elementHeight + offsets[0] >= 0 + thresholdHeight &&
        left - offsets[1] + thresholdWidth <= windowInnerWidth &&
        left + elementWidth + offsets[3] >= 0 + thresholdWidth
    );
}
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
function appendElementById(id: string, getContainer?: () => HTMLElement) {
    const div: HTMLElement = document.querySelector(`#${id}`) || document.createElement('div');
    div.id = id;
    const container = getContainer && getContainer() ? getContainer() : document.body;
    container.appendChild(div);
    return {
        child: div,
        container,
    };
}
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
function removeElement(ele: HTMLElement) {
    if (ele && ele.parentNode) {
        ele.parentNode.removeChild(ele);
    }
}
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
function getActualContainer(getContainer?: () => HTMLElement | Window | string | null) {
    const container = getContainer ? getContainer() : void 0;
    return typeof container === 'string'
        ? (document.querySelector(container) as HTMLElement)
        : container;
}
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
function getValidScrollContainer(getContainer?: () => HTMLElement | Window | null) {
    // 默认为window
    // @en Default is window
    const originContainer = getContainer ? getContainer() : window;
    // body的滚动在window上监听，document.body.addEventListener('scroll') 是不生效的
    // @en The scrolling of the body is monitored on the window, document.body.addEventListener('scroll') is ineffective
    return originContainer === document.body ? window : originContainer;
}
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
function getScrollContainerAttribute(
    property: string,
    getContainer?: () => HTMLElement | Window | Document | null,
): number {
    const container = getContainer ? getContainer() : window;
    if (!container) return 0;
    if (container === window || container === document) {
        // 一些值可能不准的属性兼容
        // @en Some properties whose values may be inaccurate are compatible
        const globalPropMap: Record<string, keyof Window> = {
            clientHeight: 'innerHeight',
            clientWidth: 'innerWidth',
        };
        const windowProp = globalPropMap[property];
        const documentValue = document.documentElement[property];
        if (windowProp && window[windowProp] && documentValue) {
            return Math.min(window[windowProp], documentValue);
        }
        return documentValue || document.body[property];
    }
    if (container === document.body) {
        return document.body[property] || document.documentElement[property];
    }
    return container[property];
}
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
function getScrollContainerRect(container: HTMLElement | Window | null) {
    let containerRect: Omit<DOMRect, 'x' | 'y' | 'toJSON'> = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0,
    };
    if (!container) {
        return {
            isGlobal: false,
            scrollEle: container,
            containerRect,
        };
    }
    const scrollEle = container === window ? document.documentElement : (container as HTMLElement);
    const isGlobal = scrollEle === document.documentElement || scrollEle === document.body;
    // html和body内部滚动时，DOMRect.top会变，此时需求是取相对于视口的top值，因此top直接设置为0
    // @en When html and body are scrolled, DOMRect.top will change. At this time, the requirement is to take the top value relative to the viewport, so top is directly set to 0
    containerRect = isGlobal
        ? {
              top: 0,
              left: 0,
              bottom: window.innerHeight,
              right: window.innerWidth,
              width: window.innerWidth,
              height: window.innerHeight,
          }
        : scrollEle.getBoundingClientRect();
    return { isGlobal, scrollEle, containerRect };
}
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
function removeCssStyleDom(key: string) {
    const styleDom = styleDoms[key];
    if (styleDom) {
        document.documentElement.removeChild(styleDom);
        delete styleDoms[key];
    }
}
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
function addCssStyleDom(key: string, html: string) {
    removeCssStyleDom(key);
    const style = document.createElement('style');
    style.innerHTML = html;
    document.documentElement.appendChild(style);
    styleDoms[key] = style;
}
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
function addCssKeyframes(key: string, rules: string) {
    addCssStyleDom(key, `@keyframes ${key} ${rules}\n@-webkit-keyframes ${key} ${rules}`);
}
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
function addCssRules(key: string, rules: Record<string, string>) {
    if (!rules || !Object.keys(rules).length) {
        return;
    }
    addCssStyleDom(
        key,
        `:root {${Object.keys(rules)
            .map(rule => `--${rule}: ${rules[rule]};`)
            .join('\n')}}`,
    );
}
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
function getActualPixel(px: number, baseFontSize = 50) {
    const htmlDOM = document.getElementsByTagName('html')[0];
    const htmlFontSize = htmlDOM.style.fontSize;
    let fontSize = baseFontSize;
    if (htmlFontSize.indexOf('%') !== -1) {
        // 百分比类型
        // @en unit percentage
        fontSize = parseFloat(getComputedStyle(htmlDOM).fontSize.replace('px', ''));
    } else if (htmlFontSize.indexOf('px') !== -1) {
        // px 类型
        // @en unit px
        fontSize = parseFloat(htmlFontSize.replace('px', '')) || baseFontSize;
    }
    const fontSizeRadio = fontSize / baseFontSize;
    return px * fontSizeRadio;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|px|待处理像素值|Number|必填|
|baseFontSize|基准字号|Number|50|

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
function convertCssDuration(ele: HTMLElement, property: string) {
    const timeout: string = window.getComputedStyle(ele)[property];
    if (/ms$/.test(timeout)) {
        return Number(timeout.replace('ms', '')) || 0;
    }
    if (/s$/.test(timeout)) {
        return (Number(timeout.replace('s', '')) || 0) * 1000;
    }
    return 0;
}
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
function safeGetComputedStyle(element: HTMLElement) {
    try {
        return window.getComputedStyle(element);
    } catch (e) {
        return {} as CSSStyleDeclaration;
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|element|要获取样式的元素|HTMLElement|必填|

> 输出

无
