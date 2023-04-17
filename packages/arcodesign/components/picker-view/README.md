### 数据录入

# 选择器视图 PickerView

选择器视图组件，不含弹窗，方便使用方灵活定制选择器。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|data|数据源，非级联时data数组的长度决定picker列数，级联时以cols决定 pick列数|PickerData\[\] \| PickerData\[\]\[\] \| ValueType\[\]\[\]|必填|
|cascade|是否联动|boolean|true|
|cols|列数(最大为5；cascade=true时才使用)|number|3|
|rows|行数(一列可选项的行数)，必须是奇数，最小为3个|number|5|
|disabled|是否不可用|boolean|false|
|value|值, 格式是\[value1, value2, value3\], 对应数据源的相应级层value|ValueType\[\]|必填|
|onPickerChange|每列数据选择变化后的回调函数|(value: ValueType\[\], index: number) =\> void|-|
|itemStyle|每列样式|CSSProperties|-|
|className|自定义类名|string|-|
|clickable|是否可通过点击操作选择内容|boolean|true|
|hideEmptyCols|是否隐藏无数据的空列，常用于级联选择|boolean|false|
|touchToStop|是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥|number \| boolean|false|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|getCellMovingStatus|每一列的滑动状态|() =\> PickerCellMovingStatus\[\]|
|getAllColumnValues|获取所有列的值|() =\> ValueType\[\]|
|getColumnValue|获取第 n 列的值|(index: number) =\> ValueType|
|updateLayout|手动更新元素布局|() =\> void|
|resetValue|重置选择器的值为传入的\`value\`值|() =\> void|
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
