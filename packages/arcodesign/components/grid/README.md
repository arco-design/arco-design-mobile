### 布局

# 宫格 Grid

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|data|传入的数据|GridData\[\]|必填|
|columns|一行的列数|number|3|
|border|是否有边框|boolean|false|
|gutter|格子间的间距|number \| \{ x: number; y: number; \}|0|
|shape|格子的形状，可选值为 circle|string|"square"|
|isSliding|溢出时是否支持滑动|boolean|false|
|direction|格子内容排列的方向，可选值为 horizontal|string|"vertical"|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> GridData

|参数|描述|类型|
|----------|-------------|------|
|img|传入图标的资源地址|ReactNode|
|title|传入的标题文字内容|ReactNode|
|content|传入的描述文字内容|ReactNode|
|className|自定义样式|string|
|onClick|点击后的回调函数|(item: GridData) =\> void|
|itemStyle|每个格子自定义样式|CSSProperties|
|renderGrid|自定义单个 grid 的创建函数|(item: GridData, colIndex: number, rowIndex: number) =\> ReactNode|
