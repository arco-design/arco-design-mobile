### 数据录入

# 选择器 Picker

选择器组件，形式是弹起的浮层。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|data|数据源，非级联时data数组的长度决定picker列数，级联时以cols决定 pick列数|PickerData\[\] \| PickerData\[\]\[\] \| ValueType\[\]\[\]|必填|
|cascade|是否联动|boolean|true|
|cols|列数(最大为5；cascade=true时才使用)|number|3|
|rows|行数(一列可选项的行数)，必须是奇数，最小为3个|number|5|
|disabled|是否不可用|boolean|false|
|value|值, 格式是\[value1, value2, value3\], 对应数据源的相应级层value，如果不传默认选每一列的第一个值|ValueType\[\]|-|
|onHide|点击遮罩层或取消、确定按钮的隐藏回调|(scene?: string) =\> void|-|
|onChange|选中后的回调|(selectedValue: ValueType\[\]) =\> void|-|
|onPickerChange|每列数据选择变化后的回调函数|(value: ValueType\[\], index: number) =\> void|-|
|itemStyle|每列样式|CSSProperties|-|
|visible|是否展示选择器|boolean|false|
|okText|弹窗确认已选值的文案|string|"确定"|
|dismissText|弹窗取消的文案|string|"取消"|
|onOk|点击选中时执行的回调|(value: ValueType\[\]) =\> void|-|
|onDismiss|点击取消时执行的回调|() =\> void|-|
|clickable|是否可通过点击操作选择内容|boolean|true|
|hideEmptyCols|是否隐藏无数据的空列，常用于级联选择|boolean|false|
|title|选择器标题|string|""|
|maskClosable|点击蒙层是否关闭菜单|boolean|false|
|touchToStop|是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥|number \| boolean|false|
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|true|
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
|maskTransitionType|蒙层过渡动画类名|string|"fade"|
|animatingClosable|执行进场动画时点击蒙层是否可关闭菜单|boolean|false|
|mountOnEnter|是否在打开菜单时再加载内容|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
|preventBodyScroll|弹窗打开时是否禁止body的滚动|boolean|true|
|initialBodyOverflow|页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|getCellMovingStatus|每一列的滑动状态|() =\> PickerCellMovingStatus\[\]|
|updateLayout|手动更新元素布局|() =\> void|
|getAllColumnValues|获取所有列的值|() =\> ValueType\[\]|
|getColumnValue|获取第 n 列的值|(index: number) =\> ValueType|
|scrollToCurrentIndex|直接跳到当前最近一行（调用时将中断滚动）|() =\> void|

> PickerData

|参数|描述|类型|
|----------|-------------|------|
|value|每一列展示的每项文案对应的值|ValueType|
|label|每一列展示的文案|ReactNode|
|children|级联状态下，该列对应的下一列数据|PickerData\[\]|

> ValueType

```
string | number
```

> PickerCellMovingStatus

```
"normal" | "moving" | "scrolling"
```
