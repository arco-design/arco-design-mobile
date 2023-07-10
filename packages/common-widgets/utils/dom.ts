import bezierEasing from './bezier-easing';

export function stopTouch(e: TouchEvent) {
    e.cancelable && e.preventDefault();
}

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
 * @desc {en} comfirm parentNode contains children nodes
 * @param parentEl 父节点
 * @param childrenEl 子节点
 */
export const isContains = (parentEl: HTMLElement | null, childrenEl: HTMLElement | null) => {
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
};

export function execRAF(fn) {
    try {
        return requestAnimationFrame(fn);
    } catch (e) {
        return setTimeout(fn, 17);
    }
}

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
 * @param component 当前元素节节点
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
 * 从父级节点移除元素
 * @desc {en} Remove element from parent node
 * @param ele 待移除元素
 * @param ele {en} Element to be removed
 */
export function removeElement(ele: HTMLElement) {
    if (ele && ele.parentNode) {
        ele.parentNode.removeChild(ele);
    }
}

export function getActualContainer(getContainer?: () => HTMLElement | Window | string | null) {
    const container = getContainer ? getContainer() : void 0;
    return typeof container === 'string'
        ? (document.querySelector(container) as HTMLElement)
        : container;
}

export function getValidScrollContainer(getContainer?: () => HTMLElement | Window | null) {
    // 默认为window
    // @en Default is window
    const originContainer = getContainer ? getContainer() : window;
    // body的滚动在window上监听，document.body.addEventListener('scroll') 是不生效的
    // @en The scrolling of the body is monitored on the window, document.body.addEventListener('scroll') is ineffective
    return originContainer === document.body ? window : originContainer;
}

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

export function removeCssStyleDom(key: string) {
    const styleDom = styleDoms[key];
    if (styleDom) {
        document.documentElement.removeChild(styleDom);
        delete styleDoms[key];
    }
}

export function addCssStyleDom(key: string, html: string) {
    removeCssStyleDom(key);
    const style = document.createElement('style');
    style.innerHTML = html;
    document.documentElement.appendChild(style);
    styleDoms[key] = style;
}

export function addCssKeyframes(key: string, rules: string) {
    addCssStyleDom(key, `@keyframes ${key} ${rules}\n@-webkit-keyframes ${key} ${rules}`);
}

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

export function safeGetComputedStyle(element: HTMLElement) {
    try {
        return window.getComputedStyle(element);
    } catch (e) {
        return {} as CSSStyleDeclaration;
    }
}
