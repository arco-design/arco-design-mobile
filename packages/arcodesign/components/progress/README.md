### 反馈

# 进度条 Progress

进度条组件，可根据外界传递进来的百分比进行进度展示

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|percentPosition|文字显示位置|"left" \| "innerLeft" \| "right" \| "follow"|"center"|
|showPercent|是否显示进度条内部文字|boolean|true|
|percentage|进度环百分比|number|必填|
|renderPercent|进度条内部文字显示（一个函数，返回ReactNode类型，回调参数为当前进度百分比）|(percentage: number) =\> ReactNode|-|
|trackColor|轨道颜色|string|-|
|progressColor|进度条颜色|string|-|
|disabled|是否置灰|boolean|false|
|trackStroke|轨道粗细|number|一般默认为4，percentPosition=innerLeft 时为18，mode=nav时为2|
|progressStroke|进度条粗细|number|继承 trackStroke 值|
|duration|每增加step步长所需的毫秒数|number|300|
|step|步长（增加步长，以step增长）|number|1|
|filleted|进度条是否两端圆角|boolean|true|
|mountedTransition|初始化percentage时是否以动画形式过渡到目的值|boolean|true|
|mountedBezier|初始化时动画的贝塞尔曲线|BezierType|[0.34, 0.69, 0.1, 1]|
|mode|模式可选为nav或者base模式|"nav" \| "base"|"base"|
|top|距离屏幕顶部的距离（只有当mode为"nav"才有效）|number|0|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> PercentPosition

```
"left" | "innerLeft" | "right" | "follow"
```
