### utils componentUtils

------

# getStyleWithVendor

获取带浏览器前缀的样式

======

## 类型

```
(style: CSSProperties) => CSSProperties
```

## 源码

```

function getStyleWithVendor(style: CSSProperties): CSSProperties {
    const allowReg = /(transform|transition|animation)/i;
    const newStyle = Object.keys(style).reduce<CSSProperties>((acc, key) => {
        const webkitStyle = allowReg.test(key)
            ? {
                  [`Webkit${key.replace(/^(.)/, (_, p1) => p1.toUpperCase())}`]: style[key],
              }
            : {};
        return {
            ...acc,
            [key]: style[key],
            ...webkitStyle,
        };
    }, {});
    return newStyle;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|原始样式|CSSProperties|必填|

> 输出

无

------

# setStyleWithVendor

给元素设置带浏览器前缀的样式

======

## 类型

```
(dom: HTMLElement, style: CSSProperties) => void
```

## 源码

```

function setStyleWithVendor(dom: HTMLElement, style: CSSProperties) {
    const vendorStyle = getStyleWithVendor(style);
    for (const key in vendorStyle) {
        dom.style[key] = vendorStyle[key];
    }
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|dom|需要设置样式的元素|HTMLElement|必填|
|style|Original style|CSSProperties|必填|

> 输出

无

------

# getDefaultValue

计算默认值，仅未定义时使用默认值

======

## 类型

```
(value: T | undefined, defaultValue: T) => T
```

## 源码

```

const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
    return value === void 0 ? defaultValue : value;
}
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|value|输入的值|T \| undefined|必填|
|defaultValue|默认值|T|必填|

> 输出

如果输入的值是未定义的，那么返回默认值，否则返回输入的值

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

perties} newStyle 添加了浏览器前缀的新样式
 * @return {CSSProperties} newStyle {en} New style with browser vendor prefix
 */
function useListenResizegetStyleWithVendor(style: CSSProperties): CSSProperties {
    const allowReg = /(transform|transition|animation)/i;
    const newStyle = Object.keys(style).reduce<CSSProperties>((acc, key) => {
        const webkitStyle = allowReg.test(key)
            ? {
                  [`Webkit${key.replace(/^(.)/, (_, p1) => p1.toUpperCase())}`]: style[key],
              }
            : {};
        return {
            ...acc,
            [key]: style[key],
            ...webkitStyle,
        };
    }, {});
    return newStyle;
}

/**
 * 给元素设置带浏览器前缀的样式
 * @desc {en} Set element style with browser vendor prefix
 * @param {HTMLElement} dom 需要设置样式的元素
 * @param {HTMLElement} dom {en} Element to set style
 * @param {CSSProperties} style Original style
 * @param {CSSProperties} style {en} Original style
 */
export function setStyleWithVendor(dom: HTMLElement, style: CSSProperties) {
    const vendorStyle = getStyleWithVendor(style);
    for (const key in vendo
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|resizeHandler|resize事件回调|() =\> void|必填|
|deps|触发事件绑定更新的依赖|any\[\]|  |
|needListen|是否开启事件监听，默认开启|boolean|{});|

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

constrStyle) {
        dom.style[key] = vendorStyle[key];
    }
}

/**
 * 计算默认值，仅未定义时使用默认值
 * @desc {en} Calculate the value, use default value only if undefined
 * @param {T | undefined} value 输入的值
 * @param {T | undefined} value {en} The input value
 * @param {T} defaultValue 默认值
 * @param {T} defaultValue {en} The default value
 * @returns {T} 如果输入的值是未定义的，那么返回默认值，否则返回输入的值
 * @returns {T} {en} Returns the default value if the input is undefined, otherwise returns the input value
 */
const getDefaultValue = <T>(value: T | undefined, defaultValue: T): T => {
    return value === void 0 ? defaultValue : value;
};
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

const
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

const
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

const
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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|effect|useEffect回调|() =\> void \| (() =\> void)|必填|
|dependencies|useEffect依赖|any\[\]|-|

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

const
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

const
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

const
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

const
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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|visible|弹窗是否被打开|boolean|必填|
|popupDom|弹窗的dom元素|HTMLDivElement|必填|
|getScrollContainer|弹窗中的滚动容器，可传入多个|() =\> HTMLElement \| HTMLElement\[\]|-|
|orientationDirection|弹窗内容朝向，默认为top（从上到下），用于实现模拟横屏|"top" \| "bottom" \| "left" \| "right"|-|
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

const
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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|dom|待绑定事件的dom元素|HTMLDivElement|必填|
|event|待绑定事件名称|string|必填|
|handler|待绑定事件回调|any|必填|
|options|待绑定事件配置，默认为 \{ capture: true \}|\{ capture: boolean; \}|-|

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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|visible|全屏组件是否被打开|boolean|必填|
|preventBodyScroll|是否启用防滚动穿透，默认启用|boolean|-|
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

const
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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|onClick|单击事件回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|onDoubleClick|双击事件回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|必填|
|delay|两次点击被判定为双击事件的最大间隔时间|number|-|

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

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|userSetSvgKey|自定义唯一标识，传入则覆盖自动生成的值|string|必填|

> 输出

生成后的唯一标识

------

# render
======

## 类型

```
(app: ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>, container: Element | DocumentFragment) => { render: (container: ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>) => void; _unmount: () => void; }
```

## 源码

```

const
```

======

> 输入

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|app|\-|ReactElement\<any, string \| ((props: any) =\> ReactElement\<any, any\>) \| (new (props: any) =\> Component\<any, any, any\>)\>|必填|
|container|\-|Element \| DocumentFragment|必填|

> 输出

无
