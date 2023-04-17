### 反馈

# 对话框 Dialog

模态对话框，在浮层中显示，引导用户进行相关操作。默认做了防滚动穿透处理，如果弹层内容中需要滚动，则需将滚动容器传入`getScrollContainer`属性以在未滚动到顶部或底部时释放滚动。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|弹窗标题|ReactNode|-|
|footer|底部按钮配置|FooterButtonOptions\[\]|[]|
|footerType|底部按钮样式，grid表示通栏样式，button表示按钮样式，platform=ios时有效|"grid" \| "button"|"grid"|
|renderFooter|自定义渲染footer|() =\> ReactNode|-|
|footerCollapseCount|底部按钮大于等于多少个时竖向排布|number|3|
|titleAlign|标题对齐方向|"left" \| "center" \| "right"|platform=android 时为"left"，否则为"center"|
|contentAlign|内容对齐方向|"left" \| "center" \| "right"|platform=android 时为"left"，否则为"center"|
|platform|当前所在操作系统，对应不同样式|"ios" \| "android"|跟随当前所在系统|
|extra|弹窗中的其他元素，比如关闭按钮等|ReactNode|-|
|contentTransitionType|内容过渡动画类名|string|platform=android 时为"fade"，否则为"fade-scale"|
|maskTransitionTimeout|蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|contentTransitionTimeout|弹窗内容动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|450|
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
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
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
|alert|打开确认框(含一个确认按钮)|(config: AlertOptions & DialogProps) =\> \{ close: () =\> void; update: (newConfig: AlertOptions & DialogProps) =\> void; \}|
|confirm|打开提示框(含一个确认按钮和一个取消按钮)|(config: ConfirmOptions & AlertOptions) =\> \{ close: () =\> void; update: (newConfig: ConfirmOptions & AlertOptions) =\> void; \}|
|open|打开常规对话框|(config: DialogProps) =\> \{ close: () =\> void; update: (newConfig: DialogProps) =\> void; \}|

> FooterButtonOptions

|参数|描述|类型|
|----------|-------------|------|
|content|按钮内容|ReactNode \| ((locale: ILocale) =\> ReactNode)|
|className|按钮类名|string|
|disabled|是否禁用按钮|boolean|
|onClick|点击按钮事件，返回值为true时可以阻止dialog关闭|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|

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

> AlertOptions

|参数|描述|类型|
|----------|-------------|------|
|key|组件挂载容器id区分|string|
|onOk|点击确认按钮回调|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|
|okText|确认按钮文字|ReactNode|

> GlobalContextParams

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "ios" \| "android" \| "pc"|""|
|useDarkMode|是否使用暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|

> ConfirmOptions

|参数|描述|类型|
|----------|-------------|------|
|onCancel|点击取消按钮回调|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|
|cancelText|取消按钮文字|ReactNode|
