### 数据录入

# 数字键盘 Keyboard

数字键盘组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|normalKeyClass|常规键位自定义类名|string|-|
|normalKeyStyle|常规键位自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|type|键盘展示类型，不同类型有不同布局。number \- 纯数字常规键盘，confirm \- 带确认按钮的键盘，tool \- 带运算符的键盘|"number" \| "confirm" \| "tool"|"number"|
|randomOrder|是否打乱键盘中的数字展示位置|boolean|必填|
|title|键盘顶部展示标题内容，样式纯自定义|ReactNode|-|
|rightColumns|自定义渲染数字右侧（第四列）的内容|ReactNode|-|
|confirmClosable|点击确认后是否自动关闭键盘|boolean|false|
|confirmButton|自定义渲染确认按钮内部内容|ReactNode|-|
|deleteButton|自定义渲染删除按钮内部内容|ReactNode|-|
|keyboardButton|自定义渲染收起键盘按钮内部内容|ReactNode|-|
|close|收起键盘回调|(e?: MouseEvent\<HTMLElement, MouseEvent\>) =\> \{\}|必填|
|onConfirm|点击确认按钮回调|() =\> \{\}|-|
|onDelete|点击删除按钮回调|() =\> \{\}|-|
|onChange|点击常规按钮回调|(data: ReactText) =\> \{\}|-|
|direction|菜单滑出方向|"left" \| "right" \| "top" \| "bottom"|"bottom"|
|needBottomOffset|从底部滑出的菜单内容是否适配ipx底部|boolean|false|
|translateZ|\[即将废弃\] 开启translateZ强制提升|boolean|false|
|maskTransitionTimeout|菜单蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|菜单内容动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|内容过渡动画类名|string|\`slide-from-${props.direction}\`|
|maskClass|自定义蒙层类名|string|-|
|maskStyle|自定义蒙层样式|CSSProperties|-|
|contentClass|自定义内容类名|string|-|
|contentStyle|自定义内容样式|CSSProperties|-|
|visible|是否展示菜单（受控）|boolean|必填|
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
|keyboard|最外层 DOM 元素|HTMLDivElement|
|dom|最外层元素 DOM|HTMLDivElement|
|mask|蒙层 DOM|HTMLDivElement|
|content|内容 DOM|HTMLDivElement|
|setCloseScene|在关闭弹窗前修改 onClose 的 scene 参数值|(scene: string) =\> void|

> DirectionType

```
"left" | "right" | "top" | "bottom"
```
