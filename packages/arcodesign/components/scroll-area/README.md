### 布局

# 滚动区域 ScrollArea

自定义滚动条样式的滚动容器，用自定义的滚动条替换浏览器原生滚动条

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|direction|滚动方向|"vertical" \| "horizontal" \| "both"|"vertical"|
|scrollbarVisibility|滚动条的显示方式：\`auto\` 滚动时显示，停止滚动一段时间后隐藏；\`always\` 内容溢出时始终显示；\`hidden\` 不显示滚动条|"auto" \| "always" \| "hidden"|"auto"|
|hideDelay|\`scrollbarVisibility\` 为 \`auto\` 时，停止滚动后滚动条隐藏的延时，单位 ms|number|1000|
|viewportClassName|滚动容器（视口）的自定义类名|string|""|
|viewportStyle|滚动容器（视口）的自定义样式|CSSProperties|-|
|onScroll|滚动时的回调|(e: UIEvent<HTMLDivElement, UIEvent>) =\> void|-|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|
|viewport|滚动容器（视口）DOM 元素|HTMLDivElement|
|scrollTo|滚动到指定位置|(options: ScrollToOptions) =\> void|
|update|重新计算滚动条的尺寸和位置，一般无需手动调用|() =\> void|
