import bezierEasing from './bezier-easing';

/**
 * 阻止 TouchEvent 事件的默认行为
 * @desc {en} Stops the default behavior of a TouchEvent
 * @param {TouchEvent} e 要阻止的 TouchEvent 事件
 * @param {TouchEvent} e {en} The TouchEvent to stop
 * @returns {void}
 */
export function stopTouch(e: TouchEvent) {
    // If the TouchEvent is cancelable, prevent it's default behavior using preventDefault
    e.cancelable && e.preventDefault();
}

/**
 * 阻止元素滚动
 * @desc {en} Prevents an element from scrolling
 * @param scrollContainer 滚动容器的函数，默认为 document.body
 * @param scrollContainer {en} A function that returns the scroll container, defaults to document.body
 * @param preventWindow 是否阻止窗口滚动
 * @param preventWindow {en} Whether to prevent window scrolling
 * @param customStopTouch 自定义停止触摸事件的函数
 * @param customStopTouch {en} A custom function to stop touch events
 * @example
 * ```
 * import { preventEleScroll } from '@arco-design/mobile-utils';
 *
 * // Prevent scrolling in the entire document body
 * preventEleScroll();
 *
 * // Prevent scrolling in a specific element with custom touch event handling
 * preventEleScroll(() => document.getElementById('myScrollableElement'), false, (e) => {
 *   // Custom touch event handling logic here
 *   e.preventDefault();
 * });
 * ```
 */
export function preventEleScroll(
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

/**
 * 允许元素滚动
 * @desc {en} Allows an element to scroll
 * @param scrollContainer 滚动容器的函数，默认为 document.body
 * @param scrollContainer {en} A function that returns the scroll container, defaults to document.body
 * @param preventWindow 是否阻止窗口滚动
 * @param preventWindow {en} Whether to prevent window scrolling
 * @param customStopTouch 自定义停止触摸事件的函数
 * @param customStopTouch {en} A custom function to stop touch events
 * @example
 * ```
 * import { freeEleScroll } from '@arco-design/mobile-utils';
 *
 * // Allow scrolling in the entire document body
 * freeEleScroll();
 *
 * // Allow scrolling in a specific element with custom touch event handling
 * freeEleScroll(() => document.getElementById('myScrollableElement'), false, (e) => {
 *   // Custom touch event handling logic here
 *   // You can choose to call e.preventDefault() or not based on your needs
 * });
 * ```
 */
export function freeEleScroll(
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

/**
 * 判断父节点是否包含子节点
 * @desc {en} confirm parentNode contains children nodes
 * @param parentEl 父节点
 * @param childrenEl 子节点
 */
export function isContains(parentEl: HTMLElement | null, childrenEl: HTMLElement | null) {
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

/**
 * 使用 requestAnimationFrame 执行函数，如果不支持则使用 setTimeout 作为兜底
 * @desc {en} Executes a function using requestAnimationFrame, if not supported, falls back to setTimeout
 * @param {Function} fn 需要执行的函数
 * @param {Function} fn {en} the function to be executed
 * @returns {number} 返回 requestAnimationFrame 或 setTimeout 的 ID
 * @returns {number} {en} returns the ID of requestAnimationFrame or setTimeout
 */
export function execRAF(fn) {
    try {
        return requestAnimationFrame(fn);
    } catch (e) {
        // Note that the delay time for setTimeout is 17 milliseconds, which is approximately equivalent to a frame rate of 60 frames per second.
        // This is a good fallback option because requestAnimationFrame also typically runs at a rate of about 60 frames per second.
        return setTimeout(fn, 17);
    }
}

/**
 * 使用动画滚动页面
 * @desc {en} Scroll the page with animation
 * @param {number} initTop 初始滚动位置（像素）
 * @param {number} initTop {en} Initial scroll position (in pixels)
 * @param {number} target 目标滚动位置（像素）
 * @param {number} target {en} Target scroll position (in pixels)
 * @param {function} scrollTo 滚动函数
 * @param {function} scrollTo {en} Scroll function
 * @param {number} duration 动画持续时间（毫秒）
 * @param {number} duration {en} Animation duration (in milliseconds)
 * @param {Array<number>} bezier 贝塞尔曲线参数
 * @param {Array<number>} bezier {en} Bezier curve parameters
 * @param {'by'|'to'} type 滚动类型：'by'表示相对滚动，'to'表示绝对滚动
 * @param {'by'|'to'} type {en} Scroll type: 'by' for relative scrolling, 'to' for absolute scrolling
 * @example
 * import { scrollWithAnimation } from '@arco-design/mobile-utils';
 *
 * // Scroll to 500px from the current position over 1 second
 * scrollWithAnimation(
 *     window.pageYOffset,
 *     500,
 *     (top) => window.scrollTo({ top }),
 *     1000,
 *     [0.34, 0.69, 0.1, 1],
 *     'to'
 * );
 */
export function scrollWithAnimation(
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

/**
 * 返回节点的 document 对象属性
 * @desc {en} Returns the node's document properties
 * @param {HTMLElement} node dom 节点
 * @param {HTMLElement} node {en} dom Node
 */
export function scrollParent(node: HTMLElement): HTMLElement | Document | null {
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

/**
 * 获得元素 offset
 * @desc {en} Get element offset
 * @param {HTMLElement} node dom 节点
 * @param {HTMLElement} node {en} Dom node
 */
export function getOffset(node: HTMLElement | Document | null) {
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

export type TCheckVisibleBaseProps = {
    node: HTMLDivElement;
    offset: number | [number, number] | [number, number, number, number];
    threshold: number;
};

/**
 * 格式化偏移量
 * Format the offset
 * @param {Array|number} offset 输入的偏移量，可以是一个数字或者一个长度为2或4的数组
 * @param {Array|number} offset {en} The input offset, which can be a number or an array of length 2 or 4
 * @returns {Array} 返回一个长度为4的数组，表示上、右、下、左四个方向的偏移量
 * @returns {Array} {en} Returns an array of length 4, representing the offsets in the top, right, bottom, and left directions
 * @example
 * ```
 * import { formatOffset } from '@arco-design/mobile-utils';
 *
 * console.log(formatOffset(10)) // output: [10, 10, 10, 10]
 * console.log(formatOffset([10, 20])) // output: [10, 0, 20, 0]
 * console.log(formatOffset([10, 20, 30, 40])) // output: [10, 20, 30, 40]
 * ```
 */
function formatOffset(offset): [number, number, number, number] {
    let offsets;
    if (Array.isArray(offset)) {
        if (offset.length === 2) {
            offsets = [offset[0], 0, offset[1], 0];
        } else if (offset.length === 4) {
            offsets = offset;
        }
    } else {
        offsets = [offset, offset, offset, offset];
    }
    return offsets;
}

/**
 * 检查 overflow 为 scroll 或 auto 时，元素是否在视口区域内
 * @desc {en} Check if the element is within the viewport area when overflow is scroll or auto
 * @param component 当前元素节点
 * @param component {en} Current element node
 * @param parent 当前元素所在容器 dom 节点
 * @param parent {en} The dom node of the container where the current element is located
 */
export function checkOverflowVisible<T extends TCheckVisibleBaseProps>(
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

/**
 * 检查非局部滚动容器元素是否在视口区域内
 * @desc {en} Check if a non-local scroll container element is inside the viewport area
 * @param component 当前元素节点
 * @param component {en} Current element node
 */
export function checkNormalVisible<T extends TCheckVisibleBaseProps>(component: T): boolean {
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

/**
 * 根据id动态添加dom元素
 * @desc {en} Dynamically add dom element based on id
 * @param id 添加的dom id
 * @param id {en} added dom id
 * @param getContainer 被添加元素的父级
 * @param getContainer {en} The parent of the added element
 */
export function appendElementById(id: string, getContainer?: () => HTMLElement) {
    const div: HTMLElement = document.querySelector(`#${id}`) || document.createElement('div');
    div.id = id;
    const container = getContainer && getContainer() ? getContainer() : document.body;
    container.appendChild(div);
    return {
        child: div,
        container,
    };
}

/**
 * 从父级节点移除该元素
 * @desc {en} Remove element from parent node
 * @param ele 待移除元素
 * @param ele {en} Element to be removed
 */
export function removeElement(ele: HTMLElement) {
    if (ele && ele.parentNode) {
        ele.parentNode.removeChild(ele);
    }
}

/**
 * 获取滚动容器，如果传入 string 则使用 querySelector 选取容器
 * @desc {en} Get the scrolling container. If a string is passed in, use querySelector to select the container
 * @param getContainer 指定滚动容器
 * @param getContainer {en} Specifies the scrolling container.
 */
export function getActualContainer(getContainer?: () => HTMLElement | Window | string | null) {
    const container = getContainer ? getContainer() : void 0;
    return typeof container === 'string'
        ? (document.querySelector(container) as HTMLElement)
        : container;
}

/**
 * 获取有效滚动监听容器，默认情况或者监听 body 的滚动时均指定为 window
 * @desc {en} Get the effective scrolling container, which is specified as window by default or for listening to the scrolling of the body
 * @param getContainer 指定滚动容器
 * @param getContainer {en} Specifies the scrolling container.
 */
export function getValidScrollContainer(getContainer?: () => HTMLElement | Window | null) {
    // 默认为window
    // @en Default is window
    const originContainer = getContainer ? getContainer() : window;
    // body的滚动在window上监听，document.body.addEventListener('scroll') 是不生效的
    // @en The scrolling of the body is monitored on the window, document.body.addEventListener('scroll') is ineffective
    return originContainer === document.body ? window : originContainer;
}

/**
 * 获取滚动容器的属性。针对 window 和 document 额外进行一些属性兼容处理。
 * @desc {en} Get properties of the scrolling container. Perform additional attribute compatibility processing for window and document.
 * @param property 所需属性
 * @param property {en} Required attributes
 * @param getContainer 待计算滚动容器
 * @param getContainer {en} Scrolling container to be calculated.
 * @example
 * ```
 * import { getScrollContainerAttribute } from '@arco-design/mobile-utils';
 *
 * const contentRef = useRef<HTMLDivElement>(null);
 * const scrollTop = getScrollContainerAttribute('scrollTop', () => contentRef.current);
 * ```
 */
export function getScrollContainerAttribute(
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

/**
 * 提供了元素的大小及其相对于视口的位置。
 * @desc {en} Provide information about the size of an element and its position relative to the viewport.
 * @param container 滚动容器
 * @param container {en} Scroll Container
 * @example
 * ```
 * import { getScrollContainerAttribute } from '@arco-design/mobile-utils';
 *
 * const contentRef = useRef<HTMLDivElement>(null);
 * const scrollTop = getScrollContainerAttribute('scrollTop', () => contentRef.current);
 * ```
 */
export function getScrollContainerRect(container: HTMLElement | Window | null) {
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

export const styleDoms: Record<string, HTMLStyleElement | null> = {};

/**
 * 删除自定义 style 标签，配合 addCssStyleDom 函数一起使用
 * @desc {en} Remove custom style tags and use it in conjunction with the addCssStyleDom function
 * @param key 标签对应的key
 * @param key {en} Key corresponding to the tag
 * @example
 * ```
 * import { removeCssStyleDom } from '@arco-design/mobile-utils';
 *
 * removeCssStyleDom('arcoTheme');
 * ```
 */
export function removeCssStyleDom(key: string) {
    const styleDom = styleDoms[key];
    if (styleDom) {
        document.documentElement.removeChild(styleDom);
        delete styleDoms[key];
    }
}

/**
 * 添加自定义 style 标签，addCssKeyframes 和 addCssRules 的底层方法
 * @desc {en} Add custom style tags, underlying methods for addCssKeyframes and addCssRules
 * @param key 标签对应的key
 * @param key {en} Key corresponding to the tag
 * @param html 样式内容
 * @param html {en} style information (CSS)
 * @example
 * ```
 * import { addCssStyleDom } from '@arco-design/mobile-utils';
 *
 * addCssStyleDom('arcoTheme', ':root {--base-font-size: 50;}');
 * ```
 */
export function addCssStyleDom(key: string, html: string) {
    removeCssStyleDom(key);
    const style = document.createElement('style');
    style.innerHTML = html;
    document.documentElement.appendChild(style);
    styleDoms[key] = style;
}

/**
 * 增加自定义关键帧动画变量，实现动画函数复用。
 * @desc {en} Add custom keyframe animation variables to achieve reuse of animation functions
 * @param key 规则名称
 * @param key {en} Rule Name
 * @param rules 动画关键帧
 * @param rules {en} Animation keyframes
 * @example
 * ```
 * import { addCssKeyframes } from '@arco-design/mobile-utils';
 * 
 * const maxScaleWithDefault = 2;
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
 * ```
 */
export function addCssKeyframes(key: string, rules: string) {
    addCssStyleDom(key, `@keyframes ${key} ${rules}\n@-webkit-keyframes ${key} ${rules}`);
}

/**
 * 增加自定义 CSS 变量规则，使用后将在线替换css变量。需设置less变量 @use-css-vars: 1
 * @desc {en} Add custom CSS variable rules, which will replace CSS variables online after use.The less variable needs to be set @use-css-vars: 1.
 * @param key 规则名称
 * @param key {en} Rule Name
 * @param rules 规则对象
 * @param rules {en} Rule Object
 * @example
 * ```
 * import { addCssRules } from '@arco-design/mobile-utils';
 *
 * addCssRules('arcoTheme', { 'base-font-size': '50' });
 * ```
 */
export function addCssRules(key: string, rules: Record<string, string>) {
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

/**
 * 不同机型下的字体大小与标准字体大小的比率，计算类似.rem()
 * @desc {en} The ratio of the font size under different models to the standard font size, the calculation is similar to .rem()
 * @param {Number} px 待处理像素值
 * @param {Number} px {en} Dealing pixel value
 * @param {Number} baseFontSize 基准字号
 * @param {Number} baseFontSize {en} Base font size
 * @returns {String} 计算后的像素值
 * @returns {String} {en} Computing pixcel value
 * @example
 * ```
 * import { getActualPixel } from '@arco-design/mobile-utils';
 *
 * const actualPixel = getActualPixel(16, 50);
 * ```
 */
export function getActualPixel(px: number, baseFontSize = 50) {
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

/**
 * 获取元素的时间属性值，结果统一成毫秒级别
 * @desc {en} Get the time attribute value of the element, and the results are unified into milliseconds
 * @param ele 要获取样式的元素
 * @param ele {en} Element to get the computed style
 * @param property 与时间相关属性
 * @param property {en} Property related to time
 * @example
 * ```
 * import { convertCssDuration } from '@arco-design/mobile-utils';
 *
 * const contentRef = useRef<HTMLDivElement>(null);
 * const transTimeout = convertCssDuration(contentRef.current, 'transitionDuration');
 * ```
 */
export function convertCssDuration(ele: HTMLElement, property: string) {
    const timeout: string = window.getComputedStyle(ele)[property];
    if (/ms$/.test(timeout)) {
        return Number(timeout.replace('ms', '')) || 0;
    }
    if (/s$/.test(timeout)) {
        return (Number(timeout.replace('s', '')) || 0) * 1000;
    }
    return 0;
}

/**
 * 获取指定元素的 CSS 样式，当抛出异常时返回空对象
 * @desc {en} Get the CSS style of the specified element and return an empty object when an exception is thrown
 * @param element 要获取样式的元素
 * @param element {en} Element to get the computed style
 * @example
 * ```
 * import { safeGetComputedStyle } from '@arco-design/mobile-utils';
 *
 * const element = document.querySelector("p");
 * const compStyle =safeGetComputedStyle(element);
 * ```
 */
export function safeGetComputedStyle(element: HTMLElement) {
    try {
        return window.getComputedStyle(element);
    } catch (e) {
        return {} as CSSStyleDeclaration;
    }
}
