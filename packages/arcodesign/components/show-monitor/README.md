### 其他

# 滚动视口监听 ShowMonitor

通过滚动事件监测 children 是否进入视口或离开视口。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|getScrollContainer|滚动视口选择器|() =\> HTMLElement \| Window|() => window|
|throttle|节流粒度(ms)|number|300|
|listenResize|是否监听 resize|boolean|true|
|listenScroll|是否监听 scroll|boolean|true|
|once|只监听变化一次，为 true 时仅在进入视口时触发一次 onVisibleChange|boolean|false|
|overflow|是否为局部滚动|boolean|false|
|threshold|元素进入视口区域触发回调比例，\[0\-1\]|number|0|
|offset|预加载提前量 \[offsetTop, offsetRight, offsetBottom, offsetLeft\]。 如果类型为 number，等效为\[number, number, number, number\]； 如果类型为 \[number1, number2\], 等效为\[number1, 0, number2, 0\]； 支持 Intersection Observer 的浏览器需要搭配 getScrollContainer, 设置父级容器|number \| \[number, number\] \| \[number, number, number, number\]|0|
|children|子节点|ReactNode|必填|
|disabled|是否禁用监听|boolean|false|
|onVisibleChange|进入或离开视口的回调函数|(visible: boolean, node: HTMLDivElement) =\> void|必填|
|onClick|点击组件的回调事件|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|checkVisible|忽略元素前后状态，手动检查元素是否在视口内，触发onVisibleChange回调函数|() =\> boolean|
|flushVisibleStatus|重置元素初始可见态为false，并重新对元素可见度发起检测，优先级低于disabled（通常用在对ShowMonitor内部元素变化时发起的重新监听）|() =\> void|
