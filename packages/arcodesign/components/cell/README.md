### 信息展示

# 单元格 Cell

单元格组件，含单元格及单元格组合，常用于设置项、表单等。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|icon|单元格左侧图标|ReactNode|-|
|label|标签名|ReactNode|-|
|desc|描述|ReactNode|-|
|text|主体文字，如果有标签名则靠右，否则靠左|string|-|
|children|主体内容，如果有标签名则靠右，否则靠左|ReactNode|-|
|showArrow|是否展示右侧箭头|boolean|-|
|arrow|右侧箭头内容|ReactNode|-|
|prepend|单元格前缀内容，在单元格上方|ReactNode|-|
|append|单元格后缀内容，在单元格下方|ReactNode|-|
|bordered|是否有外边框|boolean|true|
|onClick|点击单元格事件回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> Cell.Group

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|header|自定义头部内容|ReactNode|-|
|footer|自定义尾部内容|ReactNode|-|
|bordered|是否有外边框|boolean|true|
|options|单元格配置，优先级高于children|(CellProps & RefAttributes\<CellRef\>)\[\]|-|
|children|内部单元格|ReactNode|-|
|onClick|点击单元格组回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> CellProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|icon|单元格左侧图标|ReactNode|-|
|label|标签名|ReactNode|-|
|desc|描述|ReactNode|-|
|text|主体文字，如果有标签名则靠右，否则靠左|string|-|
|children|主体内容，如果有标签名则靠右，否则靠左|ReactNode|-|
|showArrow|是否展示右侧箭头|boolean|-|
|arrow|右侧箭头内容|ReactNode|-|
|prepend|单元格前缀内容，在单元格上方|ReactNode|-|
|append|单元格后缀内容，在单元格下方|ReactNode|-|
|bordered|是否有外边框|boolean|true|
|onClick|点击单元格事件回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> CellGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
