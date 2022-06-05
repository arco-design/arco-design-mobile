### 反馈

# 环形进度条 CircleProgress

环形进度条组件，以圆环形式表示百分比进度

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|percentPosition|文字显示位置|"center" \| "bottom"|"center"|
|showPercent|是否显示圆环内部文字|boolean|true|
|percentage|进度环百分比|number|必填|
|renderPercent|圆环内部文字显示（一个函数，返回ReactNode类型，回调参数为当前进度百分比）|(percentage: number) =\> ReactNode|-|
|trackColor|轨道颜色|string|-|
|progressColor|进度环颜色|string|-|
|disabled|是否置灰|boolean|false|
|trackStroke|轨道宽度|number|10|
|progressStroke|进度环宽度|number|12|
|progressColorStart|进度环渐变开始的颜色(当设置progressColorStart和progressColorEnd其中一个时，颜色会覆盖掉progressColor的颜色)|string|-|
|progressColorEnd|进度环渐变结束的颜色|string|-|
|duration|每增加step步长所需的毫秒数|number|30|
|step|步长（增加步长，以step增长）|number|1|
|clockwise|是否逆时针增加|boolean|false|
|radius|圆环半径|number|-|
|filleted|进度条两端是否圆角|boolean|true|
|mountedTransition|初始化percentage时是否以动画形式过渡到目的值|boolean|true|
|size|进度环尺寸|"mini" \| "default"|"default"|
|mountedBezier|初始化时动画的贝塞尔曲线|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|svgKey|区分不同svg的\`\<def\>\`内容|string|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
