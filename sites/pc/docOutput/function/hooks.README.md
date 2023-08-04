### hooks 公共hooks

------

# useListenResize
======

## 类型

```
(resizeHandler: () => void, deps?: any[], needListen?: boolean) => void
```

## 源码

```
function useListenResize(resizeHandler: () => void, deps: any[] = [], needListen = true) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|resizeHandler|\-|() =\> void|必填|
|deps|\-|any\[\]|-|
|needListen|\-|boolean|-|

> 输出

描述：无

------

# useMountedState

useState自定义封装，统一处理在组件卸载后还使用setState的行为
tips：在unmount后有异步处理未完成的场景使用，不推荐无脑替换useState

======

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

描述：什么东西

------

# useRefState
======

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
|initialValue|\-|T \| (() =\> T)|必填|

> 输出

描述：无

------

# useRefMountedState
======

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
|initialValue|\-|T \| (() =\> T)|必填|

> 输出

描述：无

------

# useUpdateEffect
======

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
|effect|\-|() =\> void \| (() =\> void)|必填|
|dependencies|\-|any\[\]|-|

> 输出

描述：无

------

# useForceUpdate
======

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

描述：无

------

# useLatestRef
======

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
|variable|\-|T|必填|

> 输出

描述：无

------

# useSystem
======

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

描述：无

------

# useWindowSize
======

## 类型

```
(listenResize?: boolean) => { windowWidth: number; windowHeight: number; }
```

## 源码

```
function useWindowSize(listenResize?: boolean) {
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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|listenResize|\-|boolean|-|

> 输出

描述：无

------

# usePopupScroll
======

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
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|visible|\-|boolean|必填|
|popupDom|\-|HTMLDivElement|必填|
|getScrollContainer|\-|() =\> HTMLElement \| HTMLElement\[\]|-|
|orientationDirection|\-|"top" \| "bottom" \| "left" \| "right"|top|
|preventCallback|\-|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|onTouchMove|\-|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|gestureOutOfControl|\-|boolean|-|

> 输出

描述：无

------

# useSwiperInnerScroll
======

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
|getInnerScrollContainer|\-|() =\> HTMLElement \| HTMLElement\[\]|-|

> 输出

描述：无

------

# useAddListener
======

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
|dom|\-|HTMLDivElement|必填|
|event|\-|string|必填|
|handler|\-|any|必填|
|options|\-|\{ capture: boolean; \}|-|

> 输出

描述：无

------

# usePreventBodyScroll
======

## 类型

```
(visible: boolean, preventBodyScroll: boolean, initialBodyOverflow?: string) => void
```

## 源码

```
const
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
|visible|\-|boolean|必填|
|preventBodyScroll|\-|boolean|必填|
|initialBodyOverflow|\-|string|-|

> 输出

描述：无

------

# useSingleAndDoubleClick
======

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
|onClick|\-|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|onDoubleClick|\-|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|delay|\-|number|200|

> 输出

描述：无

------

# useGenSvgKey
======

## 类型

```
(userSetSvgKey: string) => { svgKey: string; }
```

## 源码

```
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
|userSetSvgKey|\-|string|必填|

> 输出

描述：无

------

# useProgress
======

## 类型

```
(mountedTransition: boolean, percentage: number, duration: number, mountedBezier: BezierType, step: number) => [number, boolean]
```

## 源码

```
const useProgress = (
    mountedTransition: boolean,
    percentage: number,
    duration: number,
    mountedBezier: BezierType,
    step: number,
): [number, boolean] => {
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

描述：无
