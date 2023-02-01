### 其他

# 下拉刷新 PullRefresh

下拉刷新数据组件。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|type|下拉刷新组件不同的实现方式，android \- 常规的外层容器 transform，ios \- 利用 ios scrollTop 负值实现下拉及回弹(性能优于transform)，仅ios可用。指定该属性值后优先级高于 useIosOptimize|"ios" \| "android"|跟随系统|
|useIosOptimize|在 ios 上是否使用 scrollTop 负值实现下拉及回弹，而不是 transform，关闭后所有机型都使用 transform 的方式|boolean|false|
|children|子元素|ReactNode|必填|
|className|样式类名|string|-|
|style|自定义样式|CSSProperties|-|
|disabled|是否禁用|boolean|false|
|finishDelay|加载完成后，展示加载完成的时间(ms)|number|300|
|loosingText|下拉到可释放时的展示元素（type 为 ios 失效）|ReactNode|-|
|loadingText|加载中的展示元素|ReactNode|-|
|pullingText|下拉时的展示元素|ReactNode|-|
|finishText|加载完成的展示元素|ReactNode|-|
|initialText|初始状态还未下拉时的展示元素|ReactNode|pullingText属性值|
|dampRate|阻尼系数（type 为 ios 失效）|number|4|
|onRefresh|刷新触发事件|() =\> Promise\<void\>|-|
|useHideAsNestedScroll|惯性滑动时隐藏展示元素|boolean|true|
|loosingMinHeight|释放可刷线的最小距离(px)|number|loosingText 的高度|
|allowPullWhenNotTop|未滚到顶部时向下滑动也允许触发下拉刷新，可能影响ios回弹动画效果|boolean|false|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|refresh|主动触发刷新，执行完成动画后异步返回|() =\> Promise\<void\>|
|updateIOSHeight|手动更新 IOS 容器自动高度|() =\> void|
