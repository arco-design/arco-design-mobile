### 信息展示

# 气泡卡片 Popover

气泡卡片，支持六个方向，小箭头在各个方向均基于挂载的子元素居中放置，支持受控和非受控模式。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|children|气泡载体，组件会监听其变化以重新计算布局，建议用 useMemo 包裹|ReactNode|-|
|innerPopoverClassName|自定义气泡类名|string|''|
|visible|是否显示气泡，受控模式|boolean|-|
|content|气泡内容，组件会监听其变化以重新计算布局，建议用 useMemo 包裹|ReactNode|null|
|direction|气泡展示的位置|"topLeft" \| "topCenter" \| "topRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"|'topRight'|
|duration|自动关闭场景下的停留时长，单位毫秒，为0则表示不自动关闭|number|0|
|transitionTimeout|动画时长，单位毫秒|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|minWidth|气泡最小宽度|string|'10px'|
|maxWidth|气泡最大宽度|string|'90vw'|
|transitionName|气泡过渡动画类名，修改类名需自行实现动画|string|'fade'|
|verticalOffset|气泡垂直方向上相对于子元素的偏移量，单位为px|number|10|
|horizontalOffset|气泡水平方向上相对于子元素的偏移量，单位为px|number|8|
|useAutoDirection|气泡边界自适应，开启时会在气泡左右边界留出安全距离，气泡与视窗上下边界小于安全距离时改变气泡的垂直方向，使其在视窗中漏出|boolean \| \{ horizontal: boolean; vertical: boolean; \}|true|
|edgeOffset|气泡距离边界的安全距离，单位为px|number \| EdgeOffset|14|
|verticalScrollThrottle|滚动容器的滚动事件节流粒度，单位ms|number|100|
|arrowWidth|气泡尖角大小，单位为px|number|9|
|preventBodyClick|气泡出现后，是否屏蔽非内部元素的点击事件，点击非内部元素后只做隐藏气泡操作|boolean|false|
|clickOtherToClose|点击非子元素和气泡元素是否关闭气泡|boolean|true|
|clickSelfToClose|点击气泡和子元素是否关闭气泡|boolean|true|
|touchOtherToClose|触碰非子元素和气泡元素是否关闭气泡|boolean|false|
|touchSelfToClose|触碰气泡和子元素是否关闭气泡|boolean|false|
|touchToClose|触碰页面是否关闭气泡，是touchOtherToClose和touchSelfToClose的默认值|boolean|false|
|theme|气泡的主题，black主题是黑底白字，white主题是白底黑字|"black" \| "white"|'black'|
|needShadow|气泡内容是否需要阴影|boolean|false|
|bordered|气泡是否有border|boolean|白色主题默认有边框，黑色主题没有|
|defaultVisible|气泡是否可见的默认值，非受控模式|boolean|false|
|showCloseIcon|是否展示关闭按钮|boolean|false|
|textSuffix|文字气泡后置元素，如操作按钮等|ReactNode|null|
|mode|气泡挂载位置，follow模式挂载在当前子元素下，global模式挂载在body上|"follow" \| "global"|'follow'|
|showMask|是否展示蒙层|boolean|false|
|maskTransitionTimeout|蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|renderArrow|自定义箭头渲染|(options: \{ arrowWidth?: number; arrowLeft: number; direction: Direction; \}) =\> ReactNode|-|
|onChange|状态发生改变的回调事件|(visible: boolean) =\> void|() => void|
|onClickCloseIcon|点击关闭icon的回调|() =\> void|() => void|
|onClickTextSuffix|点击文字气泡后置元素回调|() =\> void|() => void|
|onClickMask|点击蒙层回调|() =\> void|() => void|
|getVerticalScrollContainer|获取页面垂直方向的滚动容器|() =\> HTMLElement|() => document|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|child|气泡包裹子元素dom|HTMLDivElement|
|innerPopover|气泡组件 ref|PopoverInnerRef|
|innerPopoverDom|气泡元素dom|HTMLDivElement|
|updatePosition|手动更新气泡的位置|() =\> void|
|dom|组件外层dom元素|HTMLDivElement|

> Popover.Menu

气泡菜单

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|menu|菜单项列表|(string \| PopoverMenuItem)\[\]|必填|
|menuLayout|菜单排列顺序，默认为竖向菜单，支持横向菜单和竖向菜单，横向菜单一行最多可放4个菜单|"vertical" \| "horizontal"|'vertical'|
|useClickStatus|菜单项是否有点击态|boolean|false|
|clickStatusDuration|菜单项点击态持续时长，单位毫秒|number|300|
|onSelect|选择可用菜单项的回调|(value: string, item: string \| PopoverMenuItem) =\> void|() => {}|
|onClickMenuItem|点击所有菜单项回调|(value: string, item: string \| PopoverMenuItem) =\> void|必填|
|children|气泡载体，组件会监听其变化以重新计算布局，建议用 useMemo 包裹|ReactNode|-|
|innerPopoverClassName|自定义气泡类名|string|''|
|visible|是否显示气泡，受控模式|boolean|-|
|content|气泡内容，组件会监听其变化以重新计算布局，建议用 useMemo 包裹|ReactNode|null|
|direction|气泡展示的位置|"topLeft" \| "topCenter" \| "topRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"|'topRight'|
|duration|自动关闭场景下的停留时长，单位毫秒，为0则表示不自动关闭|number|0|
|transitionTimeout|动画时长，单位毫秒|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|minWidth|气泡最小宽度|string|'10px'|
|maxWidth|气泡最大宽度|string|'90vw'|
|transitionName|气泡过渡动画类名，修改类名需自行实现动画|string|'fade'|
|verticalOffset|气泡垂直方向上相对于子元素的偏移量，单位为px|number|10|
|horizontalOffset|气泡水平方向上相对于子元素的偏移量，单位为px|number|8|
|useAutoDirection|气泡边界自适应，开启时会在气泡左右边界留出安全距离，气泡与视窗上下边界小于安全距离时改变气泡的垂直方向，使其在视窗中漏出|boolean \| \{ horizontal: boolean; vertical: boolean; \}|true|
|edgeOffset|气泡距离边界的安全距离，单位为px|number \| EdgeOffset|14|
|verticalScrollThrottle|滚动容器的滚动事件节流粒度，单位ms|number|100|
|arrowWidth|气泡尖角大小，单位为px|number|9|
|preventBodyClick|气泡出现后，是否屏蔽非内部元素的点击事件，点击非内部元素后只做隐藏气泡操作|boolean|false|
|clickOtherToClose|点击非子元素和气泡元素是否关闭气泡|boolean|true|
|clickSelfToClose|点击气泡和子元素是否关闭气泡|boolean|true|
|touchOtherToClose|触碰非子元素和气泡元素是否关闭气泡|boolean|false|
|touchSelfToClose|触碰气泡和子元素是否关闭气泡|boolean|false|
|touchToClose|触碰页面是否关闭气泡，是touchOtherToClose和touchSelfToClose的默认值|boolean|false|
|theme|气泡的主题，black主题是黑底白字，white主题是白底黑字|"black" \| "white"|'black'|
|needShadow|气泡内容是否需要阴影|boolean|false|
|bordered|气泡是否有border|boolean|白色主题默认有边框，黑色主题没有|
|defaultVisible|气泡是否可见的默认值，非受控模式|boolean|false|
|showCloseIcon|是否展示关闭按钮|boolean|false|
|textSuffix|文字气泡后置元素，如操作按钮等|ReactNode|null|
|mode|气泡挂载位置，follow模式挂载在当前子元素下，global模式挂载在body上|"follow" \| "global"|'follow'|
|showMask|是否展示蒙层|boolean|false|
|maskTransitionTimeout|蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|renderArrow|自定义箭头渲染|(options: \{ arrowWidth?: number; arrowLeft: number; direction: Direction; \}) =\> ReactNode|-|
|onChange|状态发生改变的回调事件|(visible: boolean) =\> void|() => void|
|onClickCloseIcon|点击关闭icon的回调|() =\> void|() => void|
|onClickTextSuffix|点击文字气泡后置元素回调|() =\> void|() => void|
|onClickMask|点击蒙层回调|() =\> void|() => void|
|getVerticalScrollContainer|获取页面垂直方向的滚动容器|() =\> HTMLElement|() => document|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> Direction

```
"topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight"
```

> EdgeOffset

|参数|描述|类型|
|----------|-------------|------|
|top|上|number|
|right|右|number|
|bottom|下|number|
|left|左|number|

> PopoverInnerRef

|参数|描述|类型|
|----------|-------------|------|
|dom|组件容器dom|HTMLDivElement|
|content|-|HTMLDivElement|

> PopoverMenuItem

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|text|菜单项文本|ReactNode|必填|
|value|菜单项值|string|text|
|icon|菜单项的icon组件|ReactNode|null|
|disabled|是否禁用菜单项|boolean|false|
