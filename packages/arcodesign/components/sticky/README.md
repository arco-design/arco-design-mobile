### 布局

# 粘性布局 Sticky

粘性布局组件，元素相对于窗口或指定容器的吸顶效果。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|position|吸附位置，top 表示吸顶，bottom 表示吸底，both 表示既吸顶又吸底|"top" \| "bottom" \| "both"|"top"|
|topOffset|当距离容器顶部距离为该值时吸顶|number|0|
|bottomOffset|当距离容器底部距离为该值时吸底|number|0|
|followOffset|当sticky元素需要跟随依附容器离开视口时距离依附容器边缘的距离|number|0|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|children|组件内部内容|ReactNode|-|
|zIndex|层级指数，z\-index的值|number|100|
|portalWhenSticky|在处于sticky状态时是否portal|boolean|false|
|stickyStyle|处于sticky状态时，元素固定样式。推荐用fixed，如果为absolute则需自行为滚动容器的父容器设置 position: relative|"fixed" \| "absolute"|"fixed"|
|stickyCssStyle|处于sticky状态时的自定义样式|CSSProperties|-|
|getPortalContainer|被portal时挂载的容器|() =\> HTMLElement|() => document.body|
|onStickyStateChange|吸顶状态切换时触发 payload\.isSticky: 当前是否为吸顶/吸底状态 payload\.wasSticky: 前一个状态是否为吸顶/吸底状态|(payload: StickyEventPayload) =\> void|-|
|onTopChange|滚动时top变化回调，参数为元素距离容器顶部减去topOffset的距离|(top: number) =\> void|-|
|getContainer|指定sticky元素的依附容器，sticky元素不会超出容器，在容器离开视口时会跟随 如果返回string则使用querySelector选取容器|() =\> string \| HTMLElement|-|
|getScrollContainer|指定滚动容器；如果返回string则使用querySelector选取容器|() =\> string \| HTMLElement \| Window|() => window|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|recalculatePosition|局部滚动模式下，如果容器外部还有嵌套滚动，可主动调用此方法，让 sticky 的元素主动更新 fixed 位置|() =\> void|
|updatePlaceholderLayout|手动更新占位模块的高度|() =\> void|

> StickyEventPayload

|参数|描述|类型|
|----------|-------------|------|
|isSticky|当前是否为吸顶/吸底状态|boolean|
|wasSticky|前一个状态是否为吸顶/吸底状态|boolean|
|isTopSticky|当前是否为吸顶状态|boolean|
|isBottomSticky|当前是否为吸底状态|boolean|
