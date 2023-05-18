import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import lodashThrottle from 'lodash.throttle';
import {
    scrollParent,
    checkOverflowVisible,
    checkNormalVisible,
    nextTick,
    cls,
} from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';

export interface ShowMonitorProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 滚动视口选择器
     * @en Scroll viewport selector
     * @default () => window
     */
    getScrollContainer?: () => HTMLElement | Window | null;
    /**
     * 节流粒度(ms)
     * @en Throttle granularity(ms)
     * @default 300
     */
    throttle?: number;
    /**
     * 是否监听 resize
     * @en Whether to monitor resize
     * @default true
     */
    listenResize?: boolean;
    /**
     * 是否监听 scroll
     * @en Whether to monitor scroll
     * @default true
     */
    listenScroll?: boolean;
    /**
     * 只监听变化一次，为 true 时仅在进入视口时触发一次 onVisibleChange
     * @en Only listen for changes once, if true, only trigger onVisibleChange once when entering the viewport
     * @default false
     */
    once?: boolean;
    /**
     * 是否为局部滚动
     * @en Whether it is a local scroll
     * @default false
     */
    overflow?: boolean;
    /**
     * 元素进入视口区域触发回调比例，[0-1]
     * @en Threshold of callback triggered when element enters viewport area, [0-1]
     * @default 0
     */
    threshold?: number;
    /**
     * 预加载提前量 [offsetTop, offsetRight, offsetBottom, offsetLeft]。
     * 如果类型为 number，等效为[number, number, number, number]；
     * 如果类型为 [number1, number2], 等效为[number1, 0, number2, 0]；
     * 支持 Intersection Observer 的浏览器需要搭配 getScrollContainer, 设置父级容器
     * @en Preload advance amount [offsetTop, offsetRight, offsetBottom, offsetLeft].
     * @en If the type is number, it is equivalent to [number, number, number, number];
     * @en If the type is [number1, number2], it is equivalent to [number1, 0, number2, 0];
     * @en Browsers that support Intersection Observer need to use getScrollContainer to set the parent container
     * @default 0
     */
    offset?: number | [number, number] | [number, number, number, number];
    /**
     * 子节点
     * @en Children nodes
     */
    children: React.ReactNode;
    /**
     * 是否禁用监听
     * @en Whether to disable monitoring
     * @default false
     */
    disabled?: boolean;
    /**
     * 进入或离开视口的回调函数
     * @en Callback for entering or leaving the viewport
     */
    onVisibleChange: (visible: boolean, node: HTMLDivElement) => void;
    /**
     * 点击组件的回调事件
     * @en Callback when clicked
     */
    onClick?: (e: React.MouseEvent) => void;
}

export interface ShowMonitorRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 忽略元素前后状态，手动检查元素是否在视口内，触发onVisibleChange回调函数
     * @en Ignore the state of the element before and after, manually check whether the element is in the viewport, trigger the onVisibleChange callback function
     */
    checkVisible: () => boolean;
}

type TListenerEntity = {
    node: HTMLDivElement;
    isVisible: boolean;
    overflow: boolean;
    once: boolean;
    offset: number | [number, number] | [number, number, number, number];
    threshold: number;
} & Pick<ShowMonitorProps, 'onVisibleChange'>;

type TListenerEntityList = {
    [key: string]: TListenerEntity[];
};

const LISTEN_FLAG = 'data-show-listened';
/**
 * 父 dom 节点集合
 * @en Parent dom node collection
 */
const wrapperNodeList: (HTMLElement | Window)[] = [];
/**
 * 同一父节点下监听队列
 * @en Listening queue under the same parent node
 */
const listeners: TListenerEntityList = {};
const onOnceEmittedListeners: TListenerEntityList = {};
/**
 * Intersection Observer 同一 root 节点下的监听队列
 * @en Intersection Observer Listening queue under the same root node
 */
const ioListeners: {
    root: HTMLElement;
    key: string;
    listener: IntersectionObserver;
}[] = [];
/**
 * Intersection Observer 监听 visible 状态队列
 * @en Intersection Observer listens to the visible status queue
 */
const ioVisibleList: ({
    node: HTMLDivElement;
    isVisible: boolean;
    once: boolean;
} & Pick<ShowMonitorProps, 'onVisibleChange'>)[] = [];
let throttlingVisibleChange: () => void;

/**
 * 通过滚动事件监测 children 是否进入视口或离开视口。
 * @en Use scroll events to monitor whether children enter or leave the viewport.
 * @type 其他
 * @type_en Others
 * @name 滚动视口监听
 * @name_en ShowMonitor
 */
const ShowMonitor = forwardRef((props: ShowMonitorProps, ref: Ref<ShowMonitorRef>) => {
    const {
        className,
        style,
        getScrollContainer,
        throttle = 300,
        listenResize = true,
        listenScroll = true,
        overflow = false,
        offset = 0,
        threshold = 0,
        once = false,
        children = null,
        disabled = false,
        onVisibleChange,
        onClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    /**
     * 滚动容器父级元素
     * @en Scroll container parent element
     */
    const scrollPort = useRef<HTMLElement | Window | null>(null);
    /**
     * 局部滚动元素父节点
     * @en Parent node of the local scroll element
     */
    const domRefParent = useRef<HTMLElement | Document | null>(null);
    /**
     * 保存当前节点信息，类似于 class component 中 this
     * @en Save current node information, similar to this in class component
     */
    const listener = useRef<TListenerEntity | null>(null);
    /**
     * Intersection Observer 实例化对象
     * @en Instantiated object of Intersection Observer
     */
    const io = useRef<IntersectionObserver | null>(null);
    /**
     * 父容器唯一 key（wrapperNodeList index）
     * @en The unique key of the parent container (wrapperNodeList index)
     */
    const wrapperKey = useRef<number>(-1);
    const isChildrenExist = useRef(Boolean(children));
    const isSupportNativeApi = useMemo(() => typeof IntersectionObserver === 'function', []); // 是否支持 Intersection Observer

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        /**
         * 提供检查元素是否可见的api
         * @en Provides an api to check whether the element is visible
         */
        checkVisible: () =>
            checkVisible(
                {
                    node: domRef.current!,
                    overflow,
                    onVisibleChange,
                    offset,
                    threshold,
                } as TListenerEntity,
                true,
            ) as boolean,
        /**
         * 重置元素初始可见态为false，并重新对元素可见度发起检测，优先级低于disabled（通常用在对ShowMonitor内部元素变化时发起的重新监听）
         * @en Reset the initial visible state of the element to false, and re-detect the visibility of the element, the priority is lower than 'disabled'(Usually used to re-listen when elements inside ShowMonitor change)
         */
        flushVisibleStatus() {
            if (isSupportNativeApi) {
                disabled ? ioUnobserve() : ioObserve();
            } else if (listener.current) {
                const key = wrapperKey.current;
                if (once && onOnceEmittedListeners?.[key]) {
                    onOnceEmittedListeners[key] = onOnceEmittedListeners[key].filter(
                        emitListener => emitListener !== listener.current,
                    );
                }
                if (
                    !disabled &&
                    !listeners[key].find(_listener => _listener === listener.current)
                ) {
                    listeners[key].push(listener.current);
                }
                !disabled && checkVisible(listener.current);
            }
        },
    }));

    function checkVisible(component: TListenerEntity, ignoreCheckPreVisibleStatus = false) {
        const {
            node,
            overflow: compOverflow,
            once: compOnce,
            onVisibleChange: onCompVisibleChange,
            isVisible: preVisible,
        } = component;
        if (!(node instanceof HTMLElement)) {
            return;
        }
        const parent = scrollParent(node);
        /**
         * 当前元素为非 document 元素，即为局部滚动
         * @en If the current element is a non-document element, it's local scrolling
         */
        const isOverflow =
            compOverflow &&
            [node.ownerDocument, document, document.documentElement].indexOf(parent!) === -1;
        /**
         * 检查元素是否可见
         * @en Check if element is visible
         */
        const curVisible = isOverflow
            ? checkOverflowVisible<TListenerEntity>(component, parent)
            : checkNormalVisible<TListenerEntity>(component);
        /**
         * 忽略前后可见状态判断
         * @en Ignore the visible state judgment before and after
         */
        if (ignoreCheckPreVisibleStatus) {
            return curVisible;
        }
        /**
         * 当前元素 visible 对比之前发生改变，触发回调函数
         * @en The current element visible is changed before the comparison, and the callback function is triggered
         */
        curVisible !== preVisible &&
            handleCheckChildrenExist() &&
            onCompVisibleChange(curVisible, node);
        const key = wrapperKey.current;
        /**
         * 监听一次后加入 pendingList 队列，随后被 listeners 过滤掉
         * @en After listening once, it is added to the pendingList queue, and then filtered out by listeners
         */
        if (!onOnceEmittedListeners[key]) {
            onOnceEmittedListeners[key] = [];
        }
        /**
         * 当前元素不可见 -> 可见，且 once, 触发回调函数
         * @en The current element is invisible -> visible, and once, triggers the callback function
         */
        curVisible && !preVisible && compOnce && onOnceEmittedListeners[key].push(component);
    }

    const checkVisibleHandler = useCallback(() => {
        const key = wrapperKey.current;
        const curListeners = listeners[key] || [];
        curListeners.forEach(listen => checkVisible(listen));
        listeners[key] = curListeners.filter(
            item => onOnceEmittedListeners[key].indexOf(item) === -1,
        );
        onOnceEmittedListeners[key] = [];
    }, []);

    function handleCheckChildrenExist(target?: Element) {
        const dom = target || domRef.current;
        return isChildrenExist.current && dom?.children.length;
    }

    function handleObserverStatusChange(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
            const { isIntersecting, target } = entry;
            const visibleItem = ioVisibleList.find(item => item.node === target);
            if (visibleItem) {
                const {
                    isVisible: curVisible,
                    onVisibleChange: onCompVisibleChange,
                    once: onceEmit,
                } = visibleItem;
                /**
                 * 当前元素 visible 对比之前发生改变，触发回调函数
                 * @en Callback when the visible status of current element changes before the comparison
                 */
                isIntersecting !== curVisible &&
                    handleCheckChildrenExist(target) &&
                    onCompVisibleChange(isIntersecting, target as HTMLDivElement);
                /**
                 * 当前元素状态由不可见变为可见，且只触发一次
                 * @en The current element is invisible -> visible, and once, triggers the callback
                 */
                isIntersecting &&
                    !curVisible &&
                    onceEmit &&
                    target &&
                    ioUnobserve(target as HTMLDivElement);
                visibleItem.isVisible = isIntersecting;
            }
        });
    }

    /**
     * 获取 io 单例
     * @en Get the io singleton
     */
    function getIOSingleton(ioOptions: {
        root: HTMLElement;
        rootMargin: string;
        threshold: number;
    }) {
        const { root, rootMargin, threshold: ioThreshold } = ioOptions;
        const ioKey = JSON.stringify({ rootMargin, threshold: ioThreshold });

        const _ioListener = ioListeners.find(
            ioListener => ioListener.root === root && ioListener.key === ioKey,
        );

        if (!_ioListener) {
            ioListeners.push({
                root,
                key: ioKey,
                listener: (io.current = new IntersectionObserver(
                    handleObserverStatusChange,
                    ioOptions,
                )),
            });
        } else {
            io.current = _ioListener.listener;
        }
    }

    function ioObserve() {
        if (domRef.current && io.current) {
            const curIdx = ioVisibleList.findIndex(
                ioVisibleItem => ioVisibleItem.node === domRef.current,
            );
            if (curIdx !== -1) {
                ioVisibleList[curIdx].isVisible = false;
            } else {
                ioVisibleList.push({
                    node: domRef.current,
                    isVisible: false,
                    once,
                    onVisibleChange,
                });
            }
            io.current.observe(domRef.current);
        }
    }

    function ioUnobserve(target?: HTMLDivElement) {
        const targetNode = target || domRef.current;
        if (io.current && targetNode) {
            const curIdx = ioVisibleList.findIndex(
                ioVisibleItem => ioVisibleItem.node === targetNode,
            );
            if (curIdx !== -1) {
                ioVisibleList.splice(curIdx, 1);
            }
            io.current.unobserve(targetNode!);
        }
    }

    /**
     * 非首次下disabled变化时，重新监听元素
     * @en Re-listen to the element when it is not the first time that the disabled status changes,
     */
    useEffect(() => {
        if (isSupportNativeApi) {
            // 非首次 render 下
            // @en Not for the first time
            disabled ? ioUnobserve() : ioObserve();
        } else {
            // 非首次 render 下
            // @en Not for the first time
            if (wrapperKey.current !== -1 && listener.current && listeners[wrapperKey.current]) {
                // 禁用监听，找到对应listener并删除
                // @en Disable listening, find the corresponding listener and delete it
                if (disabled) {
                    const isExist = listeners[wrapperKey.current].findIndex(
                        item => item.node === domRef.current,
                    );
                    if (isExist !== -1) {
                        listeners[wrapperKey.current].splice(0, 1);
                    }
                } else {
                    // 开启监听
                    // @en Start to listen
                    listeners[wrapperKey.current].push(listener.current);
                }
            }
        }
    }, [disabled]);

    useEffect(() => {
        isChildrenExist.current = Boolean(children);
    }, [children]);

    useEffect(() => {
        scrollPort.current = getScrollContainer ? getScrollContainer() : window;
        if (!scrollPort.current) return;
        const wrapperNodeIndex = wrapperNodeList.indexOf(scrollPort.current);
        if (wrapperNodeIndex === -1) {
            // 当前滚动视口元素不在 wrapperNodeList 中, 入队列
            // @en The current scroll viewport element is not in the wrapperNodeList, push it into the list
            wrapperNodeList.push(scrollPort.current);
            wrapperKey.current = wrapperNodeList.length - 1;
        } else {
            // 取当前 index 作为 key
            // @en Take the current index as the key
            wrapperKey.current = wrapperNodeIndex;
        }
        const curWrapperKey = wrapperKey.current;
        if (isSupportNativeApi) {
            if (domRef.current) {
                domRefParent.current = scrollParent(domRef.current);
                const parent = domRefParent.current;
                const isHTMLElement =
                    [domRef.current.ownerDocument, document, document.documentElement].indexOf(
                        parent!,
                    ) === -1;
                const overflowRoot = isHTMLElement ? parent : null;
                const root = (
                    overflow
                        ? overflowRoot
                        : scrollPort.current === window
                        ? null
                        : scrollPort.current
                ) as HTMLElement;
                let rootMargin = '';
                if (Array.isArray(offset)) {
                    if (offset.length === 2) {
                        rootMargin = `${offset[0]}px 0px ${offset[1]}px`;
                    } else {
                        offset.forEach((val, index) => {
                            const space = index === 0 ? '' : ' ';
                            rootMargin += `${space}${val}px`;
                        });
                    }
                } else {
                    rootMargin = `${offset}px`;
                }

                getIOSingleton({
                    root,
                    rootMargin,
                    threshold,
                });

                !disabled && ioObserve();
            }
        } else {
            // 节流后回调函数
            // @en Callback after throttling
            throttlingVisibleChange = checkVisibleHandler;
            throttle &&
                (throttlingVisibleChange = lodashThrottle(throttlingVisibleChange, throttle));
            if (overflow) {
                if (domRef.current) {
                    domRefParent.current = scrollParent(domRef.current);
                    const parent = domRefParent.current;
                    if (
                        parent &&
                        parent instanceof HTMLElement &&
                        typeof parent.getAttribute === 'function'
                    ) {
                        const listenerCount =
                            1 + Number(parent.getAttribute(LISTEN_FLAG) as string);
                        if (!listeners[curWrapperKey]) {
                            listeners[curWrapperKey] = [];
                        }
                        if (listenerCount === 1) {
                            // listener 数量为1时监听事件（列表中插入 ShowMonitor 时做判断）
                            // @en Listen when the number of listeners is 1 (judging when ShowMonitor is inserted into the list)
                            parent.addEventListener('scroll', throttlingVisibleChange);
                        }
                        parent.setAttribute(LISTEN_FLAG, String(listenerCount));
                    }
                }
            } else if (
                !listeners[curWrapperKey] ||
                listeners[curWrapperKey].length === 0 ||
                // 相同curWrapperKey内全部为overflow场景，需要单独注册scroll事件
                // @en It need to register the scroll event separately when all values in the same curWrapperKey are overflow
                (listeners[curWrapperKey] && listeners[curWrapperKey].every(it => it.overflow))
            ) {
                if (!listeners[curWrapperKey]) {
                    listeners[curWrapperKey] = [];
                }
                listenScroll &&
                    scrollPort.current.addEventListener('scroll', throttlingVisibleChange);
                listenResize &&
                    scrollPort.current.addEventListener('resize', throttlingVisibleChange);
            }
            listener.current = {
                node: domRef.current!,
                isVisible: false,
                overflow,
                once,
                offset,
                threshold,
                onVisibleChange,
            };
            // 将当前 listener 存入 listeners
            !disabled && listeners[curWrapperKey].push(listener.current);
            nextTick(() => {
                !disabled && checkVisible(listener.current!);
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            if (isSupportNativeApi) {
                ioUnobserve();
            } else {
                if (overflow) {
                    const parent = domRefParent.current;
                    if (
                        parent &&
                        parent instanceof HTMLElement &&
                        typeof parent.getAttribute === 'function'
                    ) {
                        const listenerCount = Number(parent.getAttribute(LISTEN_FLAG) || 0) - 1;
                        if (listenerCount === 0) {
                            // 如果监听队列中无节点，解绑事件
                            // @en If there is no node in the listening queue, unbind the event
                            parent.removeEventListener('scroll', throttlingVisibleChange);
                        } else {
                            // 如果监听队列中有元素节点，将 dataset 减1
                            // @en If there are element nodes in the listening queue, decrement dataset by 1
                            parent.setAttribute(LISTEN_FLAG, String(listenerCount));
                        }
                    }
                }
                const key = wrapperKey.current;
                const curListeners = listeners[key];
                if (curListeners) {
                    // 不在监听队列中，移除
                    // @en Not in the listening queue, remove it
                    const index = curListeners.indexOf(listener.current!);
                    index !== -1 && curListeners.splice(index, 1);
                    // 监听队列为空，解绑 scroll、resize 事件
                    // @en When the listening queue is empty, unbind scroll and resize events
                    if (curListeners.length === 0) {
                        delete listeners[key];
                        if (scrollPort.current) {
                            scrollPort.current.removeEventListener(
                                'scroll',
                                throttlingVisibleChange,
                            );
                            scrollPort.current.removeEventListener(
                                'resize',
                                throttlingVisibleChange,
                            );
                        }
                    }
                }
            }
        };
    }, []);

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-show-monitor`, className)}
                    style={style}
                    ref={domRef}
                    onClick={onClick}
                >
                    {children}
                </div>
            )}
        </ContextLayout>
    );
});

export default ShowMonitor;
