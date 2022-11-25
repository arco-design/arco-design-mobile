### 反馈

# 动作面板 ActionSheet

动作面板组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|items|选项配置，详情见 ActionSheetItemOptions|ActionSheetItemOptions\[\]|必填|
|cancelText|取消按钮内容，传值则会展示，点击后关闭动作面板|ReactNode|-|
|title|面板标题内容|ReactNode|-|
|subTitle|面板副标题内容|ReactNode|-|
|needBottomOffset|从底部滑出的菜单内容是否适配ipx底部|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|visible|是否展示菜单（受控）|boolean|必填|
|close|关闭菜单方法|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|必填|
|translateZ|\[即将废弃\] 开启translateZ强制提升|boolean|false|
|maskTransitionTimeout|菜单蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|菜单内容动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|内容过渡动画类名|string|\`slide-from-${props.direction}\`|
|className|自定义类名|string|-|
|maskClass|自定义蒙层类名|string|-|
|maskStyle|自定义蒙层样式|CSSProperties|-|
|contentClass|自定义内容类名|string|-|
|contentStyle|自定义内容样式|CSSProperties|-|
|maskTransitionType|蒙层过渡动画类名|string|"fade"|
|maskClosable|点击蒙层是否关闭菜单|boolean|true|
|animatingClosable|执行进场动画时点击蒙层是否可关闭菜单|boolean|false|
|mountOnEnter|是否在打开菜单时再加载内容|boolean|true|
|preventBodyScroll|弹窗打开时是否禁止body的滚动|boolean|true|
|initialBodyOverflow|页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|false|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|open|打开动作面板|(config: ActionSheetProps) =\> \{ close: () =\> void; update: (newConfig: ActionSheetProps) =\> void; \}|

> ActionSheetItemOptions

|参数|描述|类型|
|----------|-------------|------|
|content|选项文字内容|ReactNode|
|status|状态，disabled 状态下不可点，danger 状态字体飘红|"normal" \| "disabled" \| "danger"|
|className|选项文字自定义类名|string|
|style|选项文字自定义样式|CSSProperties|
|onClick|点击选项事件，返回值为 true 时可以阻止动作面板关闭|(e?: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|
