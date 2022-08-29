### 数据录入

# 滑动输入条 Slider

滑动型输入器，展示当前值和可选范围。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|
|disabled|是否禁用|boolean|false|
|useRange|使用范围选择|boolean|根据 传入初始参数判断，没有则为 false|
|useAnimation|非点击状态使用动画|boolean|true|
|min|最小值|number|0|
|max|最大值|number|100|
|defaultValue|默认初始值|number \| \[number, number\]|-|
|value|基础值，组件受控|number \| \[number, number\]|-|
|step|最小单位|number|1|
|type|组件方向|"horizontal" \| "vertical"|"horizontal"|
|showTooltip|是否展示气泡|"auto" \| "always" \| "never"|"auto"|
|marks|滑动条节点配置|number \| number\[\] \| Record\<string, ReactNode\>|-|
|showMarks|是否展示标签底部文案|boolean|false|
|useMarkOnly|是否只可用标志的值，覆盖 step|boolean|false|
|prefixLabel|前缀 icon 或者 文案|ReactNode \| ((value: number \| \[\.\.\.\]) =\> ReactNode)|-|
|suffixLabel|后缀 icon 或者 文案|ReactNode \| ((value: number \| \[\.\.\.\]) =\> ReactNode)|-|
|size|组件横条粗细，单位 px|ReactText|2|
|draggableTrackOnly|只允许拖动滑块 默认 false|boolean|false|
|formatTooltip|自定义气泡内容|(value: number) =\> ReactNode|-|
|onAfterChange|修改后事件，时机同 touchend|(value: number \| \[number, number\]) =\> void|-|
|onChange|实时修改事件|(value: number \| \[number, number\]) =\> void|-|
|renderThumb|自定义滑块|(value: number) =\> ReactNode|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
