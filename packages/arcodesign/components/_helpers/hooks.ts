/**
 * @type hooks
 * @name GeneralHooks
 * @name_en General Hooks
 */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { getSystem, scrollWithAnimation, safeGetComputedStyle } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { BezierType } from '../progress';

/**
 * 监听页面resize事件的统一封装
 * @desc {en} Unified encapsulation for monitoring page resize events
 * @param resizeHandler resize事件回调
 * @param resizeHandler {en} Resize event callback
 * @param deps 触发事件绑定更新的依赖
 * @param deps {en} Dependencies that trigger event binding updates
 * @param needListen 是否开启事件监听，默认开启
 * @param needListen {en} Whether to enable event monitoring
 * @example
 * ```
 * import { useListenResize } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * useListenResize(setSize, [], listenResize);
 * ```
 */
export function useListenResize(resizeHandler: () => void, deps: any[] = [], needListen = true) {
    useEffect(() => {
        if (needListen) {
            window.addEventListener('resize', resizeHandler);
            window.addEventListener('orientationchange', resizeHandler);
        }
        return () => {
            if (needListen) {
                window.removeEventListener('resize', resizeHandler);
                window.removeEventListener('orientationchange', resizeHandler);
            }
        };
    }, [...deps, needListen]);
}

/**
 * useState自定义封装，统一处理在组件卸载后还使用setState的行为
 * tips：在unmount后有异步处理未完成的场景使用，不推荐无脑替换useState
 * @desc {en} Custom encapsulation of useState, uniformly handle the behavior of using setState after the component is unloaded
 * @desc {en} Tips: Use in scenarios where asynchronous processing is not completed after unmount. It is not recommended to replace useState without brains
 * @param initialState 初始状态
 * @param initialState {en} Initial State
 * @returns [state, setState]，同useState返回值
 * @example
 * ```
 * import { useMountedState } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const [scrollValue, setScrollValue] = useMountedState(value);
 * ```
 */
export function useMountedState<S>(initialState: S | (() => S)) {
    const [state, setState] = useState<S>(initialState);
    const leavingRef = useRef(false);
    const setValidState = useCallback<typeof setState>(value => {
        if (leavingRef.current) {
            return;
        }
        setState(value);
    }, []);
    useEffect(() => {
        // see: https://github.com/arco-design/arco-design-mobile/pull/292
        leavingRef.current = false;
        return () => {
            leavingRef.current = true;
        };
    }, []);
    const result: [S, typeof setState] = [state, setValidState];
    return result;
}

/**
 * 用useState管理状态，且在状态更新之前同步至ref，并返回ref
 * @desc {en} Use useState to manage the state, and synchronize to ref before the state is updated, and return ref
 * @param initialValue 初始状态
 * @param initialValue {en} Initial State
 * @returns [state, stateRef, setState]
 * @example
 * ```
 * import { useSameRefState } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const [opened, openedRef, setOpened] = useSameRefState(false);
 * ```
 */
export function useSameRefState<T>(
    initialValue: T,
): [T, React.MutableRefObject<T>, (data: T) => void] {
    const [state, setState] = useState<T>(initialValue);
    const stateRef = useRef<T>(state);
    const setStateProxy = (data: T) => {
        stateRef.current = data;
        setState(data);
    };
    return [state, stateRef, setStateProxy];
}

/**
 * 用useState管理状态，且在状态更新后同步至ref，并返回ref
 * @desc {en} Use useState to manage the state, and synchronize to ref after the state is updated, and return ref
 * @param initialValue 初始状态
 * @param initialValue {en} Initial State
 * @returns [state, stateRef, setState]
 * @example
 * ```
 * import { useRefState } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const [index, indexRef, setIndex] = useRefState(currentIndex);
 * ```
 */
export function useRefState<T>(
    initialValue: T | (() => T),
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
}

/**
 * 用useState管理状态，且在状态更新后同步至ref，并返回ref，统一处理在组件卸载后还使用setState的行为
 * @desc {en} Use useState to manage the state, and synchronize to ref after the state is updated, and return ref, and uniformly handle the behavior of using setState after the component is uninstalled
 * @param initialValue 初始状态
 * @param initialValue {en} Initial State
 * @returns [state, stateRef, setState]
 * @example
 * ```
 * import { useRefMountedState } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const [active, activeRef, setActive] = useRefMountedState(false);
 * ```
 */
export function useRefMountedState<T>(
    initialValue: T | (() => T),
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useMountedState<T>(initialValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
}

/**
 * useEffect特殊封装，仅在非首次依赖更新时触发回调
 * @desc {en} Special encapsulation of useEffect, which only triggers the callback when the dependency is not updated for the first time
 * @param effect useEffect回调
 * @param effect {en} useEffect callback
 * @param dependencies useEffect依赖
 * @param dependencies {en} useEffect dependencies
 * @example
 * ```
 * import { useUpdateEffect } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * useUpdateEffect(() => {
 *     handleIndexChange(index);
 * }, [index]);
 * ```
 */
export function useUpdateEffect(effect: () => void | (() => void), dependencies: any[] = []) {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}

/**
 * 手动触发一次组件的rerender
 * @desc {en} Manually trigger the rerender of the component once
 * @example
 * ```
 * import { useForceUpdate } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const update = useForceUpdate();
 *
 * function forceUpdate() {
 *     update();
 * }
 * ```
 */
export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, []);
    return update;
}

/**
 * 获取任意变量的最新ref值（用于监听属性、方法等非state变量）
 * @desc {en} Get the latest ref value of any variable (used to monitor non-state variables such as properties and methods)
 * @param variable 待获取最新值的变量
 * @param variable {en} Variable to get latest value
 * @returns variableRef，变量的最新ref值
 * @example
 * ```
 * import { useLatestRef } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const { wrapSize } = props;
 * const wrapSizeRef = useLatestRef(wrapSize);
 * ```
 */
export function useLatestRef<T>(variable: T) {
    const variableRef = useRef(variable);
    useEffect(() => {
        variableRef.current = variable;
    }, [variable]);
    return variableRef;
}

/**
 * 从navigator.userAgent中获取当前操作系统，如果无法获取ua，则从ContextProvider传入的system中获取值
 * @desc {en} Get the current operating system from navigator.userAgent, if ua cannot be obtained, get the value from the system passed in by ContextProvider
 * @returns system 操作系统，"" | "pc" | "android" | "ios"
 * @example
 * ```
 * import { useSystem } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const system = useSystem();
 * ```
 */
export function useSystem() {
    const { system: currentSystem } = useContext(GlobalContext);
    const [system, setSystem] = useState(() => currentSystem || getSystem());
    useEffect(() => {
        setSystem(currentSystem || getSystem());
    }, [currentSystem]);
    return system;
}

/**
 * 获取页面视口宽高大小，并在页面有resize时更新大小
 * @desc {en} Get the width and height of the page viewport, and update the size when the page is resized
 * @param needListen 是否开启resize事件监听
 * @param needListen {en} Whether to enable resize event monitoring
 * @returns 页面宽高，{ windowWidth, windowHeight }
 * @example
 * ```
 * import { useWindowSize } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const { windowHeight, windowWidth } = useWindowSize();
 * ```
 */
export function useWindowSize(listenResize?: boolean) {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0,
    );
    const [windowHeight, setWindowHeight] = useState(
        typeof window !== 'undefined' ? window.innerHeight : 0,
    );

    function setSize() {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    useListenResize(setSize, [], listenResize);
    useEffect(() => {
        setSize();
    }, []);

    return { windowWidth, windowHeight };
}

export interface PopupScrollRefType {
    ele: HTMLElement;
    maxScrollX: number;
    maxScrollY: number;
}

/**
 * 弹窗中滚动统一处理，防止滚动穿透
 * @desc {en} Unified processing of scrolling in pop-up windows to prevent scrolling penetration
 * @param visible 弹窗是否被打开
 * @param visible {en} Whether the popup is opened
 * @param popupDom 弹窗的dom元素
 * @param popupDom {en} DOM element of the popup
 * @param getScrollContainer 弹窗中的滚动容器，可传入多个
 * @param getScrollContainer {en} The scrolling container in the popup, which can pass in multiple
 * @param orientationDirection 弹窗内容朝向，默认为top（从上到下），用于实现模拟横屏
 * @param orientationDirection {en} The content orientation of the popup, the default is top (from top to bottom), which is used to simulate a horizontal screen
 * @param preventCallback 在滚动穿透被阻止（preventDefault被触发）时的回调
 * @param preventCallback {en} Callback when scrolling is blocked (preventDefault is triggered)
 * @param onTouchMove touchmove 自定义事件
 * @param onTouchMove {en} Touchmove custom event
 * @param gestureOutOfControl 是否禁用滚动穿透处理
 * @param gestureOutOfControl {en} Whether to disable scroll through processing
 * @example
 * ```
 * import { usePopupScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * usePopupScroll(visible, domRef.current, getScrollContainer, orientationDirection, onPreventTouchMove, onTouchMove, gestureOutOfControl);
 * ```
 */
export function usePopupScroll(
    visible: boolean,
    popupDom: HTMLDivElement | null,
    getScrollContainer?: () => (HTMLElement | null)[] | HTMLElement | null,
    orientationDirection: 'top' | 'bottom' | 'left' | 'right' = 'top',
    preventCallback?: (e: TouchEvent, direction: 'x' | 'y') => void,
    onTouchMove?: (e: TouchEvent, prevented: boolean, direction: 'x' | 'y') => void,
    gestureOutOfControl?: boolean,
) {
    type Touching = { dom: HTMLElement | null; inScrollIndexes: number[] };
    const scrollRef = useRef<PopupScrollRefType[]>([]);
    const touchingRef = useRef<Touching>({ dom: null, inScrollIndexes: [] });
    const touchStartYRef = useRef(0);
    const touchStartXRef = useRef(0);
    const preventCallbackRef = useLatestRef(preventCallback);
    const onTouchMoveRef = useLatestRef(onTouchMove);

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (gestureOutOfControl) {
                return;
            }
            touchStartXRef.current = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
            touchStartYRef.current = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
            const ele: (HTMLElement | null)[] | HTMLElement | null = getScrollContainer
                ? getScrollContainer()
                : null;
            if (ele) {
                const actualEle = Array.isArray(ele) ? ele : [ele];
                scrollRef.current = actualEle.reduce(
                    (acc, nowEle) => [
                        ...acc,
                        ...(nowEle && safeGetComputedStyle(nowEle).overflow !== 'hidden'
                            ? [
                                  {
                                      ele: nowEle,
                                      maxScrollX:
                                          orientationDirection === 'left' ||
                                          orientationDirection === 'right'
                                              ? nowEle.scrollHeight - nowEle.clientHeight
                                              : nowEle.scrollWidth - nowEle.clientWidth,
                                      maxScrollY:
                                          orientationDirection === 'left' ||
                                          orientationDirection === 'right'
                                              ? nowEle.scrollWidth - nowEle.clientWidth
                                              : nowEle.scrollHeight - nowEle.clientHeight,
                                  },
                              ]
                            : []),
                    ],
                    [],
                );
            } else {
                scrollRef.current = [];
            }
            touchingRef.current = { dom: null, inScrollIndexes: [] };
        },
        [getScrollContainer, gestureOutOfControl, orientationDirection],
    );

    function judgeInScroll(originNode: HTMLElement | null, scroll: PopupScrollRefType[]) {
        const inScrollIndexes: number[] = [];
        for (let i = 0; i < scroll.length; i += 1) {
            let node = originNode;
            while (node && scroll[i]) {
                if (node === scroll[i].ele) {
                    inScrollIndexes.push(i);
                    break;
                } else {
                    node = node.parentElement;
                }
            }
        }
        touchingRef.current = { dom: originNode, inScrollIndexes };
        return inScrollIndexes;
    }

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            function getScrollTop(scroll: PopupScrollRefType) {
                const { ele, maxScrollX, maxScrollY } = scroll;
                switch (orientationDirection) {
                    case 'left':
                        return maxScrollY - ele.scrollLeft;
                    case 'right':
                        return ele.scrollLeft;
                    case 'bottom':
                        return maxScrollX - ele.scrollTop;
                    case 'top':
                    default:
                        return ele.scrollTop;
                }
            }
            function getScrollLeft(scroll: PopupScrollRefType) {
                const { ele, maxScrollX, maxScrollY } = scroll;
                switch (orientationDirection) {
                    case 'left':
                        return ele.scrollTop;
                    case 'right':
                        return maxScrollX - ele.scrollTop;
                    case 'bottom':
                        return maxScrollY - ele.scrollLeft;
                    case 'top':
                    default:
                        return ele.scrollLeft;
                }
            }
            const touchMoveX =
                e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
            const touchMoveY =
                e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0;
            const scroll = scrollRef.current;
            const node = e.target as HTMLElement | null;
            const { dom: touchingDom, inScrollIndexes: touchingIndexes } = touchingRef.current;
            // target一样就取缓存结果，不取dom判断了
            // @en If the target is the same, the cached result is taken, and the dom judgment is not taken.
            const inScrollIndexes =
                touchingDom === node ? touchingIndexes : judgeInScroll(node, scroll);
            const distanceX = touchMoveX - touchStartXRef.current;
            const distanceY = touchMoveY - touchStartYRef.current;
            const absX = Math.abs(distanceX);
            const absY = Math.abs(distanceY);
            const direc = absY > absX ? 'y' : 'x';
            let prevented = false;
            if (gestureOutOfControl) {
                onTouchMoveRef.current?.(e, prevented, direc);
                return;
            }
            if (scroll.length && inScrollIndexes.length) {
                const needPrevents: boolean[] = [];
                for (let i = 0; i < inScrollIndexes.length; i += 1) {
                    const touchingScroll = scroll[inScrollIndexes[i]];
                    const scrollTop = getScrollTop(touchingScroll);
                    const scrollLeft = getScrollLeft(touchingScroll);
                    if (
                        (distanceY > 0 && absY > absX && scrollTop === 0) ||
                        (distanceX > 0 && absX > absY && scrollLeft === 0)
                    ) {
                        needPrevents.push(true);
                        continue;
                    }
                    if (
                        (distanceY < 0 &&
                            absY > absX &&
                            scrollTop + 1 >= touchingScroll.maxScrollY) ||
                        (distanceX < 0 &&
                            absX > absY &&
                            scrollLeft + 1 >= touchingScroll.maxScrollX)
                    ) {
                        needPrevents.push(true);
                        continue;
                    }
                    needPrevents.push(false);
                }
                // 满足一个不prevent的条件就停止prevent，否则prevent
                // @en Stop prevent if a non-prevent condition is met, otherwise prevent.
                if (needPrevents.indexOf(false) < 0) {
                    preventCallbackRef.current?.(e, direc);
                    e.cancelable && e.preventDefault();
                    prevented = true;
                }
            } else {
                preventCallbackRef.current?.(e, direc);
                e.cancelable && e.preventDefault();
                prevented = true;
            }
            onTouchMoveRef.current?.(e, prevented, direc);
        },
        [orientationDirection, gestureOutOfControl],
    );

    useEffect(() => {
        if (!visible || !popupDom) {
            return () => {};
        }
        popupDom.addEventListener('touchstart', handleTouchStart);
        popupDom.addEventListener('touchmove', handleTouchMove, {
            passive: false,
        });
        return () => {
            popupDom.removeEventListener('touchstart', handleTouchStart);
            popupDom.removeEventListener('touchmove', handleTouchMove);
        };
    }, [visible, popupDom, handleTouchStart, handleTouchMove]);
}

/**
 * 在滑动类组件中，如果有内部可滚动区域，则在内部滚动区域滚动时禁用滑动事件
 * @desc {en} In the sliding class component, if there is an inner scrollable area, the sliding event is disabled when the inner scrolling area is scrolled
 * @param getInnerScrollContainer 内部可滚动区域，可传入多个
 * @param getInnerScrollContainer {en} Inner scrollable area, can pass in multiple
 * @example
 * ```
 * import { useSwiperInnerScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * useSwiperInnerScroll(getInnerScrollContainer);
 * ```
 */
export function useSwiperInnerScroll(
    getInnerScrollContainer?: () => (HTMLElement | null)[] | HTMLElement | null,
) {
    const stopFunc = useCallback((e: TouchEvent) => e.stopPropagation(), []);

    useEffect(() => {
        if (!getInnerScrollContainer) {
            return;
        }
        const containers = getInnerScrollContainer();
        const validContainers = Array.isArray(containers) ? containers : [containers];
        validContainers.forEach(container => {
            if (container) {
                container.addEventListener('touchstart', stopFunc);
                container.addEventListener('touchmove', stopFunc);
            }
        });
        return () => {
            validContainers.forEach(container => {
                if (container) {
                    container.removeEventListener('touchstart', stopFunc);
                    container.removeEventListener('touchmove', stopFunc);
                }
            });
        };
    }, [getInnerScrollContainer]);
}

/**
 * 事件绑定统一封装
 * @desc {en} Unified encapsulation of event binding
 * @param dom 待绑定事件的dom元素
 * @param dom {en} The dom element to be bound to the event
 * @param event 待绑定事件名称
 * @param event {en} The name of the event to be bound
 * @param handler 待绑定事件回调
 * @param handler {en} The callback of the event to be bound
 * @param options 待绑定事件配置，默认为 { capture: true }
 * @param options {en} Event configuration to be bound, the default is { capture: true }
 * @example
 * ```
 * import { useAddListener } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * useAddListener(domRef.current, 'touchstart', onTouchStart);
 * useAddListener(domRef.current, 'touchend', onTouchEnd);
 * ```
 */
export function useAddListener(
    dom: HTMLDivElement | null,
    event: string,
    handler,
    options = { capture: true },
) {
    useEffect(() => {
        if (!dom) return;
        if (handler) {
            dom.addEventListener(event, handler, options);
        }
        return () => {
            if (handler) {
                dom.removeEventListener(event, handler, options);
            }
        };
    }, [handler]);
}

/**
 * 统计同时出现的全屏组件
 * @en Count simultaneous full-screen components
 */
let arcoFullScreenCount = 0;
let arcoFullScreenOriginOverflow = '';

/**
 * 在全屏组件出现时，将body的overflow设置为hidden，防止滚动穿透
 * @desc {en} When the full screen component appears, set the overflow of the body to hidden to prevent scrolling penetration
 * @param visible 全屏组件是否被打开
 * @param visible {en} Whether the full screen component is opened
 * @param preventBodyScroll 是否启用防滚动穿透，默认启用
 * @param preventBodyScroll {en} Whether to enable anti-scroll penetration, enabled by default
 * @param initialBodyOverflow body在初始状态下的overflow值，在全屏组件全部关闭后会还原
 * @param initialBodyOverflow {en} The overflow value of the body in the initial state, which will be restored after all full-screen components are closed
 * @example
 * ```
 * import { usePreventBodyScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * usePreventBodyScroll(visible, preventBodyScroll, initialBodyOverflow);
 * ```
 */
export function usePreventBodyScroll(
    visible: boolean,
    preventBodyScroll: boolean = true,
    initialBodyOverflow?: string,
) {
    // 新出现一个全屏组件则计数+1，并设置body hidden样式
    // @en When a new full-screen component appears, count + 1 and set the body hidden style
    const addFullScreen = useCallback(() => {
        const count = arcoFullScreenCount;
        // 在当前没有全屏组件出现时，记下body overflow的初始值
        // @en Note the initial value of body overflow when no full-screen components are currently present
        if (!count) {
            arcoFullScreenOriginOverflow =
                initialBodyOverflow !== void 0 ? initialBodyOverflow : document.body.style.overflow;
        }
        arcoFullScreenCount += 1;
        document.body.style.overflow = 'hidden';
    }, []);
    /**
     * 移除一个全屏组件时，根据剩余是否还有全屏组件判断是否需要还原overflow样式
     * @en When removing a full-screen component, determine whether the overflow style needs to be restored according to whether there are any remaining full-screen components.
     */
    const removeFullScreen = useCallback(() => {
        const newCount = arcoFullScreenCount - 1;
        arcoFullScreenCount = newCount;
        if (!newCount) {
            document.body.style.overflow = arcoFullScreenOriginOverflow;
        }
    }, []);
    useEffect(() => {
        if (!preventBodyScroll) {
            return () => {};
        }
        // 如果一开始就是visible=true则加上样式
        // @en If it is visible=true at the beginning, add the style.
        if (visible) {
            addFullScreen();
        }
        return () => {
            // 如果这里visible为true，则说明即将隐藏组件或在展示时卸载组件
            // @en If visible here is true, it means that the component is about to be hidden or unloaded when displayed.
            if (visible) {
                removeFullScreen();
            }
        };
    }, [visible]);
}

/**
 * 进度条计算公共逻辑，根据传入的参数计算出当前百分比和过渡效果开关，进度类组件内部使用
 * @desc {en} Progress bar calculation common logic, used internally by the progress class component
 * @returns [当前计算的百分比, 当前是否应有过渡效果]
 * @example
 * ```
 * import { usePreventBodyScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const [currentPercentage, transitionControl] = useProgress(mountedTransition, percentage, duration, mountedBezier, step);
 * ```
 */
export function useProgress(
    mountedTransition: boolean,
    percentage: number,
    duration: number,
    mountedBezier: BezierType,
    step: number,
): [number, boolean] {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const [transitionControl, setTransitionControl] = useState(false);
    const [count, setCount] = useState(0);
    const latestPercentage = useRef(percentage);
    useEffect(() => {
        mountedTransition
            ? scrollWithAnimation(
                  0,
                  percentage,
                  progress => {
                      const targetProgress = (progress / percentage) * latestPercentage.current;
                      setCurrentPercentage(Math.floor(targetProgress));
                  },
                  duration,
                  mountedBezier,
              )
            : setCurrentPercentage(percentage);
        const id = setTimeout(() => {
            setTransitionControl(true);
        }, 30);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        latestPercentage.current = percentage;
        setCount(Math.floor(percentage / step));
    }, [percentage, step]);

    useEffect(() => {
        percentage === 100 ? setCurrentPercentage(100) : setCurrentPercentage(count * step);
    }, [count, percentage, step]);

    return [currentPercentage, transitionControl];
}

/**
 * 单击和双击事件统一处理
 * @desc {en} Unified processing of single and double click events
 * @param onClick 单击事件回调
 * @param onClick {en} Callback of single click event
 * @param onDoubleClick 双击事件回调
 * @param onDoubleClick {en} Callback of double click event
 * @param delay 两次点击被判定为双击事件的最大间隔时间
 * @param delay {en} The maximum interval between two clicks is judged as a double-click event
 * @returns clickHandler，统一后的事件处理方法
 * @example
 * ```
 * import { useSingleAndDoubleClick } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const handleClick = useSingleAndDoubleClick(handleImageClick, handleImageDoubleClick);
 * ```
 */
export function useSingleAndDoubleClick(
    onClick: (e: React.MouseEvent) => void,
    onDoubleClick: (e: React.MouseEvent) => void,
    delay = 200,
) {
    const [clickTimes, setClickTimes] = useState(0);
    const eventRef = useRef<React.MouseEvent>();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (clickTimes === 1) onClick(eventRef.current!);
            setClickTimes(0);
        }, delay);

        if (clickTimes === 2) onDoubleClick(eventRef.current!);

        return () => clearTimeout(timer);
    }, [clickTimes]);

    return (e: React.MouseEvent) => {
        eventRef.current = e;
        setClickTimes(prev => prev + 1);
    };
}

let arcoSvgKeyCount = 0;

/**
 * 自动生成svg <def>标签的唯一标识，用于区分不同svg的<def>内容
 * @desc {en} Automatically generate the unique identifier of the svg <def> tag, which is used to distinguish the <def> content of different svg
 * @param userSetSvgKey 自定义唯一标识，传入则覆盖自动生成的值
 * @param userSetSvgKey {en} Customize the unique identifier, if passed in, it will override the automatically generated value
 * @returns 包含svgKey的对象 生成后的唯一标识
 * @globalVariable
 * ```
 * let arcoSvgKeyCount = 0;
 * ```
 * @example
 * ```
 * import { useGenSvgKey } from '@arco-design/mobile-react/esm/_helpers/hooks';
 *
 * const { svgKey } = useGenSvgKey(userSetSvgKey);
 * ```
 */
export function useGenSvgKey(userSetSvgKey: string) {
    const [innerSvgKey, setInnerSvgKey] = useState('');
    const svgKey = userSetSvgKey || innerSvgKey;

    useEffect(() => {
        setInnerSvgKey(`inner-${arcoSvgKeyCount}`);
        arcoSvgKeyCount += 1;
    }, []);

    return { svgKey };
}
