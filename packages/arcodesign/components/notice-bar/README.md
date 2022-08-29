### 信息展示

# 通知栏 NoticeBar

可自定义换行或滚动效果，支持循环滚动。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式，背景颜色和文字颜色可直接在这里指定\`background\`和\`color\`|CSSProperties|-|
|children|通知内容文字，如需垂直滚动效果可传入一个Carousel|ReactNode|-|
|leftContent|左侧内容|ReactNode|-|
|rightContent|右侧内容|ReactNode|-|
|marquee|通知文字处理方式，为\`overflow\`则文字超出容器长度时才滚动，为\`none\`则文字始终不滚动，为\`always\`则文字始终滚动|"overflow" \| "none" \| "always"|"overflow"|
|closeable|是否可关闭|boolean|true|
|closeIcon|自定义关闭图标|ReactNode|\<IconClose /\>|
|wrapable|是否需要换行，当 marquee=none 且 wrapable=false 时，文字超出会有溢出省略(ellipsis)效果|boolean|true|
|speed|文字滚动速度，单位是px/s|number|50|
|delay|文字开始滚动之前的延迟(ms)|number|1000|
|autoSetGradientStyle|是否根据\`style\`属性中自定义的背景色自动设置渐变背景色|boolean|true|
|onClick|点击通知栏事件|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClose|点击关闭按钮回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|close|手动关闭通知栏，即移除当前组件|() =\> void|
|updateData|手动更新组件布局|() =\> void|
