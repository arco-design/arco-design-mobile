### 数据录入

# 日期时间选择器 DatePicker

日期时间选择器，基于`Picker`组件扩展，支持指定范围，单位可精确到秒。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|onOk|点击选中时执行的回调|(timestamp: number, obj: IDateObj) =\> void|-|
|currentTs|当前选中的时间，timestamp|number|Date.now()|
|onChange|选中后的回调|(timestamp: number, obj: IDateObj) =\> void|-|
|onValueChange|每列数据选择变化后的回调函数|(timestamp: number, obj: IDateObj, index: number) =\> void|-|
|mode|可选列类型，date \- 年月日，time \- 时分秒，datetime \- 年月日时分秒|"date" \| "time" \| "datetime"|"datetime"|
|typeArr|可选列数组|ItemType\[\]|[]|
|minTs|最小可选日期，timestamp|number|当前时间的前十年|
|maxTs|最大可选日期，timestamp|number|当前时间的后十年|
|useUTC|是否使用 UTC 时间|boolean|false|
|formatter|各可选项展示的格式化方法，参数type为ItemTypes，参数value为当前行的值，返回展示的文字|(value: number, type: ItemType) =\> string|(value: number) => (value < 10 ? \`0${value}\` : String(value))|
|valueFilter|可选择行过滤方法，参数type为ItemType，参数value为当前行的值，返回true表示该行可选择|(type: ItemType, value: number) =\> boolean|() => true|
|columnsProcessor|选择器列表项干预，可插入自定义选项|(columns: PickerData\[\]\[\], currentDateObj: IDateObj) =\> PickerData\[\]\[\]|-|
|visible|是否展示选择器|boolean|false|
|maskClosable|点击蒙层是否关闭菜单|boolean|false|
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
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|true|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|rows|行数(一列可选项的行数)，必须是奇数，最小为3个|number|5|
|disabled|是否不可用|boolean|false|
|onHide|点击遮罩层或取消、确定按钮的隐藏回调|(scene?: string) =\> void|-|
|itemStyle|每列样式|CSSProperties|-|
|okText|弹窗确认已选值的文案|string|"确定"|
|dismissText|弹窗取消的文案|string|"取消"|
|onDismiss|点击取消时执行的回调|() =\> void|-|
|clickable|是否可通过点击操作选择内容|boolean|true|
|hideEmptyCols|是否隐藏无数据的空列，常用于级联选择|boolean|false|
|title|选择器标题|string|""|
|touchToStop|是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥|number \| boolean|false|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> IDateObj

|参数|描述|类型|
|----------|-------------|------|
|year|年|number|
|month|月|number|
|date|日|number|
|hour|时|number|
|minute|分|number|
|second|秒|number|

> mode

```
"date" | "time" | "datetime"
```

> ItemType

```
"date" | "year" | "month" | "hour" | "minute" | "second"
```

> PickerData

|参数|描述|类型|
|----------|-------------|------|
|value|每一列展示的每项文案对应的值|ReactText|
|label|每一列展示的文案|ReactNode|
|children|级联状态下，该列对应的下一列数据|PickerData\[\]|
