### 导航

# 选项卡 Tabs

用于让用户在不同的视图中进行切换。为优化移动端渲染性能，如有替换DOM、发请求更新数据等操作，请在`onAfterChange`而非`onChange`回调中进行。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|tabs|TabBar内容数组，除必填项外也可附加其他数据，建议用 useMemo 包裹|TabData\[\]|必填|
|children|TabPane内容|ReactNode|-|
|activeTab|当前活动tab index，传入则为受控|number|-|
|defaultActiveTab|初始tab index值|number|0|
|disabled|是否禁用切换，包括点击TabBar切换和滑动切换|boolean|-|
|tabBarPosition|TabBar位置|"top" \| "bottom" \| "left" \| "right"|"top"|
|tabBarArrange|TabBar排列方式，tabBar在top或bottom位置时有效，start为靠左，center为居中，end为靠右|"start" \| "center" \| "end"|"center"|
|tabBarScroll|是否TabBar超出屏幕时靠左滚动排列|boolean|true|
|tabBarFixed|TabBar是否顶部固定|boolean|-|
|tabBarExtra|tabBar额外渲染内容|ReactNode|-|
|tabBarScrollBezier|tabBar滚动时变化的bezier曲线值|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|tabBarScrollDuration|tabBar滚动过渡时长，单位ms|number|300|
|tabBarScrollChance|tabBar滚动时机，\`jump\`表示在跳转tab时，\`after\-jump\`表示跳转动画执行后，\`none\`表示切换tab后不自动滚动|"jump" \| "after\-jump" \| "none"|"jump"|
|tabBarHasDivider|tabBar是否有分割线|boolean|-|
|tabBarResetWhenScroll|在竖向滚动tabPane时，自动重设tabBar滚动位置的时机|"none" \| "touchmove" \| "touchend"|"touchmove"|
|type|页签的样式，line为顺次排布，line\-divide为等分间距排布，card为分段器式排布|"line" \| "line\-divide" \| "card" \| "tag" \| "tag\-divide"|line|
|swipeable|是否允许滑动|boolean|true|
|duration|TabBar下划线滑动动画切换时间，单位ms|number|240|
|fullScreen|是否为全屏(100%)布局|boolean|false|
|autoHeight|容器高度自适应，仅在mode=swipe且是垂直布局时生效|boolean|false|
|transitionDuration|swipe模式下表示手指抬起后到动画结束时间，scroll模式下表示点击tab后滚动过渡时间，单位ms|number|300|
|useCaterpillar|是否使用毛毛虫效果|boolean|false|
|caterpillarProperty|使用毛毛虫效果时，执行动画更改的属性，\`scale\`表示更改 transform: scale 值，\`size\`表示更改宽高值。一般在避免border\-radius被scale拉伸的情况会使用\`size\`，但需注意其性能不如\`scale\`|"scale" \| "size"|"scale"|
|caterpillarMaxScale|毛毛虫效果开启时，TabBar下划线最长延展倍数（相对于自身长度）|number|2|
|percentToChangeTab|滑动切换距离阈值(宽度比例)，范围为\[0, 1\]，如果该属性和\`distanceToChangeTab\`属性均设置，则实际计算结果更大的生效|number|0.3|
|distanceToChangeTab|滑动切换距离阈值(固定px宽度)，如果该属性和\`percentToChangeTab\`属性均设置，则实际计算结果更大的生效|number|10|
|speedToChangeTab|滑动切换速度阈值(手指从按下到抬起之间的滑动速度，单位为px/s)，与滑动切换距离阈值同时设置时，满足其中一个即生效|number|200|
|disableClickTransition|点击tab切换时禁用动画|boolean|true|
|lazyloadCount|只加载当前页相邻的n个内容，为0时会隐藏/销毁所有相邻内容，不传则加载所有内容，在mode=swipe时生效|number|-|
|hideContentStyle|当开启懒加载时，针对不在懒加载范围内的内容设置样式，传入null则销毁内容|CSSProperties|null|
|renderHideContent|自行渲染不在懒加载范围内的pane，其中参数pane代表第index个tab原本要渲染的内容|(index: number, pane: ReactNode) =\> ReactNode|-|
|hideTabBarBeforeMounted|在组件加载完成前是否隐藏TabBar，防止溢出时多余的滚动效果|boolean|-|
|overflowThreshold|TabBar个数大于等于多少时认为会溢出，用于dom加载完成之前的ssr首屏渲染优化|number|5|
|showUnderline|是否展示下划线|boolean|true|
|underlineAdaptive|下划线是否根据 tab cell 长度自适应|boolean|false|
|stopTouchThreshold|触发onTouchStopped的最小阈值|number|0|
|touchSideDisableThreshold|距离屏幕边缘多远开始向右滑动时禁用tabs滑动事件|number|0|
|stopPropagation|swipe 模式下，触摸事件是否需要 stopPropagation|boolean|true|
|getInnerScrollContainer|swipe 模式下，组件内部的滚动容器，用于豁免滑动事件响应|() =\> HTMLElement \| HTMLElement\[\]|-|
|mode|tabs切换模式，swipe为滑动模式，scroll为滚动监听模式|"swipe" \| "scroll"|"swipe"|
|getScrollContainer|滚动模式下的滚动容器，用于监听滚动事件，mode=scroll 时有效|() =\> HTMLElement \| Window|-|
|scrollThrottle|滚动模式下的节流粒度，mode=scroll 时有效|number|300|
|scrollOffset|滚动模式下判断tab切换的偏移量，正数为向下偏移，负数为向上偏移，mode=scroll 时有效|number|0|
|scrollWhenMounted|滚动模式下，在组件初始加载时是否需要自动滚动到当前所选位置，mode=scroll 时有效|boolean|当初始index不为0时会自动滚动，为0时则不会自动滚动|
|goLastWhenScrollBottom|当滚动到最底部时，如果最后一个pane尚未到达底部，是否强行选中，mode=scroll 时有效|boolean|true|
|scrollVertical|是否监听垂直方向的滚动，否则监听水平方向滚动|boolean|true|
|tabBarClass|TabBar外层容器自定义类名|string|-|
|tabPaneClass|TabPane外层容器自定义类名|string|-|
|tabBarStyle|TabBar外层容器自定义样式|CSSProperties|-|
|tabPaneStyle|TabPane外层容器自定义样式|CSSProperties|-|
|tabPaneExtra|TabPane额外渲染元素，需绝对定位|ReactNode|-|
|translateZ|TabPane和TabBar开启translateZ|boolean|true|
|swipeEnergySaving|是否启用滑动节能模式，开启后TabPane外层容器不会随panes数量撑开并提升为合成层，仅滑动当前选中的pane，其他pane在选中前将被隐藏|boolean|false|
|onTouchStopped|当滑到第一页或最后一页，还想再滑动时触发|(direction: 1 \| \-1) =\> void|-|
|onChange|tab变化回调|(tab: TabData, index: number, from?: string) =\> void|-|
|onAfterChange|tab变化且动画执行完毕后回调|(tab: TabData, index: number, from?: string) =\> void|-|
|onTabClick|TabBar点击的事件|(tab: TabData, index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onTabBarOverflowChange|TabBar超出屏幕状态切换回调|(overflow: boolean) =\> void|-|
|onTouchStart|TabPane touchstart事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchMove|TabPane touchmove事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchEnd|TabPane touchend / touchcancel事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTabBarScroll|TabBar在溢出滚动时回调|(e: UIEvent\<HTMLDivElement, UIEvent\>) =\> void|-|
|onDistanceChange|tabs 左右滑动时回调，用于监听滑动距离以做滑动同步交互|(distance: number, wrapWidth: number, activeIndex: number) =\> void|-|
|onScroll|mode=scroll 时，触发滚动容器滚动回调|() =\> void|-|
|renderUnderline|自行渲染TabBar的下划线|(underlineStyle: UnderlineStyle, showLine: boolean, lineRef: MutableRefObject\<HTMLElement\>) =\> ReactNode|-|
|renderTabBar|自行渲染TabBar，常用于与Sticky配合使用|(TabBar: ReactNode, TabBarProps: TabCellProps) =\> ReactNode|-|
|renderTabBarItem|自行渲染TabBar的每一个item|(tab: TabData, index: number, extra: \{ active: boolean; \}) =\> ReactNode|-|
|renderTabBarInner|自行渲染TabBar内部内容，当需要给 \.@\{prefix\}\-tab\-cell 外层再嵌套一层dom时使用|(Inner: ReactNode) =\> ReactNode|-|
|tabBarGutter|tabBar间隙，type=line时有效|ReactText|-|
|tabBarPadding|TabBar两侧留白宽度，type=line时有效|string \| number \| \{ left?: ReactText; right?: ReactText; \}|-|
|underlineSize|TabBar下划线长度|ReactText|-|
|underlineThick|TabBar下划线厚度|ReactText|-|
|underlineInnerStyle|TabBar下划线内部样式，作用于 tab\-cell\-underline\-inner|CSSProperties|-|
|tabBarStopPropagation|当前 TabBar 的触摸事件是否需要 stopPropagation|boolean|true|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|bar|TabBar 内部子组件 Ref|TabCellRef|
|pane|Tab Pane 内部子组件 Ref|TabPaneRef|
|barOverflow|当前 TabBar 宽度是否已溢出|boolean|
|updateLayout|手动更新 Tabs 布局|() =\> void|
|changeIndex|非受控模式下手动切换 tab|(index: number, rightNow?: boolean) =\> void|
|scrollToIndex|滚动到指定 Tab，仅滚动监听模式下可用|(index: number, rightNow?: boolean) =\> void|

> TabData

```
string | { [x: string]: any; title: ReactNode; }
```

> UnderlineStyle

|参数|描述|类型|
|----------|-------------|------|
|outer|下划线外层样式，控制线的相对位置|CSSProperties|
|inner|下划线内层样式，控制线本身的宽高及缩放效果|CSSProperties|

> TabCellProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|类前缀|string|-|
|activeIndex|当前选中 Tab|number|必填|
|activeIndexRef|当前选中 Tab ref|MutableRefObject\<number\>|必填|
|tabDirection|Tab 布局方向，横向 or 竖向|"horizontal" \| "vertical"|必填|
|changeIndex|修改选中 Tab|(newIndex: number, from?: string) =\> void|必填|
|wrapWidth|外层容器宽度|number|必填|
|wrapHeight|外层容器高度|number|必填|
|cellTrans|TabBar是否启用过渡效果|boolean|必填|
|distance|手指滑动距离|number|必填|
|jumpingDis|下划线已滑动的距离|number|必填|
|tabBarStopPropagation|当前 TabBar 的触摸事件是否需要 stopPropagation|boolean|必填|
|tabs|TabBar内容数组，除必填项外也可附加其他数据，建议用 useMemo 包裹|TabData\[\]|必填|
|disabled|是否禁用切换，包括点击TabBar切换和滑动切换|boolean|-|
|tabBarPosition|TabBar位置|"top" \| "bottom" \| "left" \| "right"|"top"|
|tabBarArrange|TabBar排列方式，tabBar在top或bottom位置时有效，start为靠左，center为居中，end为靠右|"start" \| "center" \| "end"|"center"|
|tabBarScroll|是否TabBar超出屏幕时靠左滚动排列|boolean|true|
|tabBarFixed|TabBar是否顶部固定|boolean|-|
|tabBarExtra|tabBar额外渲染内容|ReactNode|-|
|tabBarScrollBezier|tabBar滚动时变化的bezier曲线值|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|tabBarScrollDuration|tabBar滚动过渡时长，单位ms|number|300|
|tabBarScrollChance|tabBar滚动时机，\`jump\`表示在跳转tab时，\`after\-jump\`表示跳转动画执行后，\`none\`表示切换tab后不自动滚动|"jump" \| "after\-jump" \| "none"|"jump"|
|tabBarHasDivider|tabBar是否有分割线|boolean|-|
|type|页签的样式，line为顺次排布，line\-divide为等分间距排布，card为分段器式排布|"line" \| "line\-divide" \| "card" \| "tag" \| "tag\-divide"|line|
|duration|TabBar下划线滑动动画切换时间，单位ms|number|240|
|transitionDuration|swipe模式下表示手指抬起后到动画结束时间，scroll模式下表示点击tab后滚动过渡时间，单位ms|number|300|
|useCaterpillar|是否使用毛毛虫效果|boolean|false|
|caterpillarProperty|使用毛毛虫效果时，执行动画更改的属性，\`scale\`表示更改 transform: scale 值，\`size\`表示更改宽高值。一般在避免border\-radius被scale拉伸的情况会使用\`size\`，但需注意其性能不如\`scale\`|"scale" \| "size"|"scale"|
|caterpillarMaxScale|毛毛虫效果开启时，TabBar下划线最长延展倍数（相对于自身长度）|number|2|
|hideTabBarBeforeMounted|在组件加载完成前是否隐藏TabBar，防止溢出时多余的滚动效果|boolean|-|
|overflowThreshold|TabBar个数大于等于多少时认为会溢出，用于dom加载完成之前的ssr首屏渲染优化|number|5|
|showUnderline|是否展示下划线|boolean|true|
|underlineAdaptive|下划线是否根据 tab cell 长度自适应|boolean|false|
|mode|tabs切换模式，swipe为滑动模式，scroll为滚动监听模式|"swipe" \| "scroll"|"swipe"|
|tabBarClass|TabBar外层容器自定义类名|string|-|
|tabBarStyle|TabBar外层容器自定义样式|CSSProperties|-|
|translateZ|TabPane和TabBar开启translateZ|boolean|true|
|onTabClick|TabBar点击的事件|(tab: TabData, index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onTabBarOverflowChange|TabBar超出屏幕状态切换回调|(overflow: boolean) =\> void|-|
|onTabBarScroll|TabBar在溢出滚动时回调|(e: UIEvent\<HTMLDivElement, UIEvent\>) =\> void|-|
|renderUnderline|自行渲染TabBar的下划线|(underlineStyle: UnderlineStyle, showLine: boolean, lineRef: MutableRefObject\<HTMLElement\>) =\> ReactNode|-|
|renderTabBarItem|自行渲染TabBar的每一个item|(tab: TabData, index: number, extra: \{ active: boolean; \}) =\> ReactNode|-|
|renderTabBarInner|自行渲染TabBar内部内容，当需要给 \.@\{prefix\}\-tab\-cell 外层再嵌套一层dom时使用|(Inner: ReactNode) =\> ReactNode|-|
|tabBarGutter|tabBar间隙，type=line时有效|ReactText|-|
|tabBarPadding|TabBar两侧留白宽度，type=line时有效|string \| number \| \{ left?: ReactText; right?: ReactText; \}|-|
|underlineSize|TabBar下划线长度|ReactText|-|
|underlineThick|TabBar下划线厚度|ReactText|-|
|underlineInnerStyle|TabBar下划线内部样式，作用于 tab\-cell\-underline\-inner|CSSProperties|-|

> TabCellRef

|参数|描述|类型|
|----------|-------------|------|
|dom|外层元素 DOM|HTMLDivElement|
|hasOverflow|当前 TabBar 宽度是否已溢出|boolean|
|scrollTo|滚动 bar 到指定位置，tabs 上下布局时是以 x 轴滚动，左右布局时以 y 轴滚动|(position: number, rightNow?: boolean) =\> void|
|scrollToCenter|滚动 bar 使当前选中item到屏幕中间|(rightNow?: boolean) =\> void|
|setCaterpillarAnimate|触发毛毛虫动画|(ratio?: number) =\> void|
|resetUnderlineStyle|重新计算下划线样式|() =\> void|

> TabPaneRef

|参数|描述|类型|
|----------|-------------|------|
|dom|外层元素 DOM|HTMLDivElement|
|getTransition|获取当前 transitionDuration|() =\> number|
|scrollToIndex|滚动到指定 Tab，仅滚动监听模式下可用|(index: number, rightNow?: boolean) =\> void|
|setCurrentHeight|autoHeight=true时，更新当前tabpane高度|() =\> void|
