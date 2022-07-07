/**
 * @type hooks
 * @name 公共hooks
 * @name_en General Hooks
 */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { getSystem, scrollWithAnimation } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { BezierType } from '../progress';

export function useListenResize(resizeHandler: () => void, deps: any[] = [], needListen = true) {
    useEffect(() => {
        if (!needListen) {
            return () => {};
        }
        window.addEventListener('resize', resizeHandler);
        window.addEventListener('orientationchange', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('orientationchange', resizeHandler);
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
    useEffect(
        () => () => {
            leavingRef.current = true;
        },
        [],
    );
    const result: [S, typeof setState] = [state, setValidState];
    return result;
}

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

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, []);
    return update;
}

export function useLatestRef<T>(variable: T) {
    const variableRef = useRef(variable);
    useEffect(() => {
        variableRef.current = variable;
    }, [variable]);
    return variableRef;
}

export function useSystem() {
    const { system: currentSystem } = useContext(GlobalContext);
    const [system, setSystem] = useState(() => currentSystem || getSystem());
    useEffect(() => {
        setSystem(currentSystem || getSystem());
    }, [currentSystem]);
    return system;
}

export function useWindowSize(listenResize?: boolean) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

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

/* eslint-disable max-lines-per-function */
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
                        ...(nowEle && window.getComputedStyle(nowEle).overflow !== 'hidden'
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

export function usePreventBodyScroll(
    visible: boolean,
    preventBodyScroll: boolean,
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

export const useProgress = (
    mountedTransition: boolean,
    percentage: number,
    duration: number,
    mountedBezier: BezierType,
    step: number,
): [number, boolean] => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const [transitionControl, setTransitionControl] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        mountedTransition
            ? scrollWithAnimation(
                  0,
                  percentage,
                  progress => {
                      setCurrentPercentage(Math.floor(progress));
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
        setCount(Math.floor(percentage / step));
    }, [percentage, step]);

    useEffect(() => {
        percentage === 100 ? setCurrentPercentage(100) : setCurrentPercentage(count * step);
    }, [count, percentage, step]);

    return [currentPercentage, transitionControl];
};

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

export function useGenSvgKey(userSetSvgKey: string) {
    const [innerSvgKey, setInnerSvgKey] = useState('');
    const svgKey = userSetSvgKey || innerSvgKey;

    useEffect(() => {
        setInnerSvgKey(`inner-${arcoSvgKeyCount}`);
        arcoSvgKeyCount += 1;
    }, []);

    return { svgKey };
}
