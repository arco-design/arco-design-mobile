### 反馈

# 可滑动弹出层 PopupSwiper

基于弹出层(Popup)封装的具有手势关闭功能的弹出层组件，拥有 Popup 组件的其他能力。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|percentToClose|滑动超过内容的百分之多少时关闭弹窗，范围为\[0, 1\]，如果该属性和\`distanceToClose\`属性均设置，则实际计算结果更大的生效|number|0.3|
|distanceToClose|滑动超过多少px时关闭弹窗，如果该属性和\`percentToClose\`属性均设置，则实际计算结果更大的生效|number|10|
|speedToClose|手指从按下到抬起之间的滑动速度超过多少时关闭弹窗(单位为px/s)，与滑动关闭距离阈值同时设置时，满足其中一个即生效|number|200|
|allowSwipeDirections|自定义可手势滑动退出的方向，可指定多个方向|DirectionType\[\]|必填|
|exitDirection|固定弹窗退出方向，默认跟随手势滑动方向|"left" \| "right" \| "top" \| "bottom"|-|
|onTouchStart|内容面板 touchstart 事件，返回true时表示阻止本组件内部处理事件|(e: TouchEvent) =\> boolean \| void|-|
|onTouchMove|内容面板 touchmove 事件，返回true时表示阻止本组件内部处理事件|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> boolean \| void|-|
|onTouchEnd|内容面板 touchend / touchcancel 事件，返回true时表示阻止本组件内部处理事件|(e: TouchEvent) =\> boolean \| void|-|
|direction|菜单滑出方向|"left" \| "right" \| "top" \| "bottom"|"bottom"|
|needBottomOffset|从底部滑出的菜单内容是否适配ipx底部|boolean|false|
|translateZ|\[即将废弃\] 开启translateZ强制提升|boolean|false|
|maskTransitionTimeout|菜单蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|菜单内容动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|内容过渡动画类名|string|\`slide-from-${props.direction}\`|
|className|自定义类名|string|-|
|maskClass|自定义蒙层类名|string|-|
|maskStyle|自定义蒙层样式|CSSProperties|-|
|contentClass|自定义内容类名|string|-|
|contentStyle|自定义内容样式|CSSProperties|-|
|visible|是否展示菜单（受控）|boolean|必填|
|close|关闭菜单方法|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|必填|
|maskTransitionType|蒙层过渡动画类名|string|"fade"|
|children|菜单内部内容|ReactNode|-|
|maskClosable|点击蒙层是否关闭菜单|boolean|true|
|animatingClosable|执行进场动画时点击蒙层是否可关闭菜单|boolean|false|
|mountOnEnter|是否在打开菜单时再加载内容|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
|orientationDirection|transform方向，用于通过transform模拟横屏的情况|"left" \| "right" \| "top" \| "bottom"|"top"|
|preventBodyScroll|弹窗打开时是否禁止body的滚动|boolean|true|
|initialBodyOverflow|页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|false|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|getScrollContainer|内容内部滚动区域容器，在该容器中未滚动到顶部或底部时会释放滚动|() =\> HTMLElement \| HTMLElement\[\]|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|mask|蒙层 DOM|HTMLDivElement|
|content|内容 DOM|HTMLDivElement|
|setCloseScene|在关闭弹窗前修改 onClose 的 scene 参数值|(scene: string) =\> void|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|open|打开弹出层|(config: string \| PopupSwiperProps) =\> \{ close: () =\> void; update: (newConfig: PopupSwiperProps) =\> void; \}|

> DirectionType

```
"left" | "right" | "top" | "bottom"
```

> GlobalContextParams

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|是否使用暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|

> ILocale

|参数|描述|类型|
|----------|-------------|------|
|locale|语言类型|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; prepareText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
|Picker|-|\{ okText: string; cancelText: string; \}|
|Tag|-|\{ addTag: string; \}|
|Dialog|-|\{ okText: string; cancelText: string; \}|
|SwipeLoad|-|\{ normalText: string; activeText: string; \}|
|PullRefresh|-|\{ loadingText: string; pullingText: string; finishText: string; loosingText: string; \}|
|DropdownMenu|-|\{ select: string; \}|
|Pagination|-|\{ previousPage: string; nextPage: string; \}|
|Image|-|\{ loadError: string; \}|
|ImagePicker|-|\{ loadError: string; \}|
|SearchBar|-|\{ placeholder: string; cancelBtn: string; \}|
|Stepper|-|\{ minusButtonName: string; addButtonName: string; \}|
|Keyboard|-|\{ confirm: string; \}|
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.; \}; \}|
