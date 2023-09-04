### hooks 公共hooks

------

# useListenResize

监听页面resize事件的统一封装

======

## 示例

```
import { useListenResize } from '@arco-design/mobile-react/esm/_helpers/hooks';
useListenResize(setSize, [], listenResize);
```

## 类型

```
(resizeHandler: () => void, deps?: any[], needListen?: boolean) => void
```

## 源码

```

function useListenResize(resizeHandler: () => void, deps: any[] = [], needListen = true) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|resizeHandler|resize事件回调|() =\> void|必填|
|deps|触发事件绑定更新的依赖|any\[\]|[]|
|needListen|是否开启事件监听，默认开启|boolean|true|

> 输出

无

------

# useMountedState

useState自定义封装，统一处理在组件卸载后还使用setState的行为
tips：在unmount后有异步处理未完成的场景使用，不推荐无脑替换useState

======

## 示例

```
import { useMountedState } from '@arco-design/mobile-react/esm/_helpers/hooks';
const [scrollValue, setScrollValue] = useMountedState(value);
```

## 类型

```
(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>]
```

## 源码

```

function useMountedState<S>(initialState: S | (() => S)) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initialState|初始状态|S \| (() =\> S)|必填|

> 输出

[state, setState]，同useState返回值

------

# useSameRefState

用useState管理状态，且在状态更新之前同步至ref，并返回ref

======

## 示例

```
import { useSameRefState } from '@arco-design/mobile-react/esm/_helpers/hooks';
const [opened, openedRef, setOpened] = useSameRefState(false);
```

## 类型

```
(initialValue: T) => [T, MutableRefObject<T>, (data: T) => void]
```

## 源码

```

function useSameRefState<T>(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initialValue|初始状态|T|必填|

> 输出

[state, stateRef, setState]

------

# useRefState

用useState管理状态，且在状态更新后同步至ref，并返回ref

======

## 示例

```
import { useRefState } from '@arco-design/mobile-react/esm/_helpers/hooks';
const [index, indexRef, setIndex] = useRefState(currentIndex);
```

## 类型

```
(initialValue: T | (() => T)) => [T, MutableRefObject<T>, Dispatch<SetStateAction<T>>]
```

## 源码

```

function useRefState<T>(
    initialValue: T | (() => T),
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initialValue|初始状态|T \| (() =\> T)|必填|

> 输出

[state, stateRef, setState]

------

# useRefMountedState

用useState管理状态，且在状态更新后同步至ref，并返回ref，统一处理在组件卸载后还使用setState的行为

======

## 示例

```
import { useRefMountedState } from '@arco-design/mobile-react/esm/_helpers/hooks';
const [active, activeRef, setActive] = useRefMountedState(false);
```

## 类型

```
(initialValue: T | (() => T)) => [T, MutableRefObject<T>, Dispatch<SetStateAction<T>>]
```

## 源码

```

function useRefMountedState<T>(
    initialValue: T | (() => T),
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useMountedState<T>(initialValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|initialValue|初始状态|T \| (() =\> T)|必填|

> 输出

[state, stateRef, setState]

------

# useUpdateEffect

useEffect特殊封装，仅在非首次依赖更新时触发回调

======

## 示例

```
import { useUpdateEffect } from '@arco-design/mobile-react/esm/_helpers/hooks';
useUpdateEffect(() => {
     handleIndexChange(index);
}, [index]);
```

## 类型

```
(effect: () => void | (() => void), dependencies?: any[]) => void
```

## 源码

```

function useUpdateEffect(effect: () => void | (() => void), dependencies: any[] = []) {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|effect|useEffect回调|() =\> void \| (() =\> void)|必填|
|dependencies|useEffect依赖|any\[\]|[]|

> 输出

无

------

# useForceUpdate

手动触发一次组件的rerender

======

## 示例

```
import { useForceUpdate } from '@arco-design/mobile-react/esm/_helpers/hooks';
const update = useForceUpdate();
function forceUpdate() {
     update();
}
```

## 类型

```
() => () => void
```

## 源码

```

function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, []);
    return update;
}
```

======

> 输入

无

> 输出

无

------

# useLatestRef

获取任意变量的最新ref值（用于监听属性、方法等非state变量）

======

## 示例

```
import { useLatestRef } from '@arco-design/mobile-react/esm/_helpers/hooks';
const { wrapSize } = props;
const wrapSizeRef = useLatestRef(wrapSize);
```

## 类型

```
(variable: T) => MutableRefObject<T>
```

## 源码

```

function useLatestRef<T>(variable: T) {
    const variableRef = useRef(variable);
    useEffect(() => {
        variableRef.current = variable;
    }, [variable]);
    return variableRef;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|variable|待获取最新值的变量|T|必填|

> 输出

variableRef，变量的最新ref值

------

# useSystem

从navigator.userAgent中获取当前操作系统，如果无法获取ua，则从ContextProvider传入的system中获取值

======

## 示例

```
import { useSystem } from '@arco-design/mobile-react/esm/_helpers/hooks';
const system = useSystem();
```

## 类型

```
() => "" | "pc" | "android" | "ios"
```

## 源码

```

function useSystem() {
    const { system: currentSystem } = useContext(GlobalContext);
    const [system, setSystem] = useState(() => currentSystem || getSystem());
    useEffect(() => {
        setSystem(currentSystem || getSystem());
    }, [currentSystem]);
    return system;
}
```

======

> 输入

无

> 输出

操作系统，"" | "pc" | "android" | "ios"

------

# useWindowSize

获取页面视口宽高大小，并在页面有resize时更新大小

======

## 示例

```
import { useWindowSize } from '@arco-design/mobile-react/esm/_helpers/hooks';
const { windowHeight, windowWidth } = useWindowSize();
```

## 类型

```
(listenResize?: boolean) => { windowWidth: number; windowHeight: number; }
```

## 源码

```

function useWindowSize(listenResize?: boolean) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|listenResize|\-|boolean|-|

> 输出

windowWidth, windowHeight }

------

# usePopupScroll

弹窗中滚动统一处理，防止滚动穿透

======

## 示例

```
import { usePopupScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
usePopupScroll(visible, domRef.current, getScrollContainer, orientationDirection, onPreventTouchMove, onTouchMove, gestureOutOfControl);
```

## 类型

```
(visible: boolean, popupDom: HTMLDivElement, getScrollContainer?: () => HTMLElement | HTMLElement[], orientationDirection?: "top" | "bottom" | "left" | "right", preventCallback?: (e: TouchEvent, direction: "x" | "y") => void, onTouchMove?: (e: TouchEvent, prevented: boolean, direction: "x" | "y") => void, gestureOutOfControl?: boolean) => void
```

## 源码

```

function usePopupScroll(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|visible|弹窗是否被打开|boolean|必填|
|popupDom|弹窗的dom元素|HTMLDivElement|必填|
|getScrollContainer|弹窗中的滚动容器，可传入多个|() =\> HTMLElement \| HTMLElement\[\]|-|
|orientationDirection|弹窗内容朝向，默认为top（从上到下），用于实现模拟横屏|"top" \| "bottom" \| "left" \| "right"|'top'|
|preventCallback|在滚动穿透被阻止（preventDefault被触发）时的回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|onTouchMove|touchmove 自定义事件|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|gestureOutOfControl|是否禁用滚动穿透处理|boolean|-|

> 输出

无

------

# useSwiperInnerScroll

在滑动类组件中，如果有内部可滚动区域，则在内部滚动区域滚动时禁用滑动事件

======

## 示例

```
import { useSwiperInnerScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
useSwiperInnerScroll(getInnerScrollContainer);
```

## 类型

```
(getInnerScrollContainer?: () => HTMLElement | HTMLElement[]) => void
```

## 源码

```

function useSwiperInnerScroll(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|getInnerScrollContainer|内部可滚动区域，可传入多个|() =\> HTMLElement \| HTMLElement\[\]|-|

> 输出

无

------

# useAddListener

事件绑定统一封装

======

## 示例

```
import { useAddListener } from '@arco-design/mobile-react/esm/_helpers/hooks';
useAddListener(domRef.current, 'touchstart', onTouchStart);
useAddListener(domRef.current, 'touchend', onTouchEnd);
```

## 类型

```
(dom: HTMLDivElement, event: string, handler: any, options?: { capture: boolean; }) => void
```

## 源码

```

function useAddListener(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|dom|待绑定事件的dom元素|HTMLDivElement|必填|
|event|待绑定事件名称|string|必填|
|handler|待绑定事件回调|any|必填|
|options|待绑定事件配置，默认为 \{ capture: true \}|\{ capture: boolean; \}|{ capture: true }|

> 输出

无

------

# usePreventBodyScroll

在全屏组件出现时，将body的overflow设置为hidden，防止滚动穿透

======

## 示例

```
import { usePreventBodyScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
usePreventBodyScroll(visible, preventBodyScroll, initialBodyOverflow);
```

## 类型

```
(visible: boolean, preventBodyScroll?: boolean, initialBodyOverflow?: string) => void
```

## 源码

```

function usePreventBodyScroll(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|visible|全屏组件是否被打开|boolean|必填|
|preventBodyScroll|是否启用防滚动穿透，默认启用|boolean|true|
|initialBodyOverflow|body在初始状态下的overflow值，在全屏组件全部关闭后会还原|string|-|

> 输出

无

------

# useProgress

进度条计算公共逻辑，根据传入的参数计算出当前百分比和过渡效果开关，进度类组件内部使用

======

## 示例

```
import { usePreventBodyScroll } from '@arco-design/mobile-react/esm/_helpers/hooks';
const [currentPercentage, transitionControl] = useProgress(mountedTransition, percentage, duration, mountedBezier, step);
```

## 类型

```
(mountedTransition: boolean, percentage: number, duration: number, mountedBezier: BezierType, step: number) => [number, boolean]
```

## 源码

```

function useProgress(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|mountedTransition|\-|boolean|必填|
|percentage|\-|number|必填|
|duration|\-|number|必填|
|mountedBezier|\-|BezierType|必填|
|step|\-|number|必填|

> 输出

[当前计算的百分比, 当前是否应有过渡效果]

------

# useSingleAndDoubleClick

单击和双击事件统一处理

======

## 示例

```
import { useSingleAndDoubleClick } from '@arco-design/mobile-react/esm/_helpers/hooks';
const handleClick = useSingleAndDoubleClick(handleImageClick, handleImageDoubleClick);
```

## 类型

```
(onClick: (e: MouseEvent<Element, MouseEvent>) => void, onDoubleClick: (e: MouseEvent<Element, MouseEvent>) => void, delay?: number) => (e: MouseEvent<Element, MouseEvent>) => void
```

## 源码

```

function useSingleAndDoubleClick(
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|onClick|单击事件回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|onDoubleClick|双击事件回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|delay|两次点击被判定为双击事件的最大间隔时间|number|200|

> 输出

clickHandler，统一后的事件处理方法

------

# useGenSvgKey

自动生成svg <def>标签的唯一标识，用于区分不同svg的<def>内容

======

## 示例

```
import { useGenSvgKey } from '@arco-design/mobile-react/esm/_helpers/hooks';
const { svgKey } = useGenSvgKey(userSetSvgKey);
```

## 类型

```
(userSetSvgKey: string) => { svgKey: string; }
```

## 源码

```
let arcoSvgKeyCount = 0;

function useGenSvgKey(userSetSvgKey: string) {
    const [innerSvgKey, setInnerSvgKey] = useState('');
    const svgKey = userSetSvgKey || innerSvgKey;

    useEffect(() => {
        setInnerSvgKey(`inner-${arcoSvgKeyCount}`);
        arcoSvgKeyCount += 1;
    }, []);

    return { svgKey };
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|userSetSvgKey|自定义唯一标识，传入则覆盖自动生成的值|string|必填|

> 输出

生成后的唯一标识
