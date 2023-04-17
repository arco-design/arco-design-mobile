### 反馈

# 加载 Loading

加载中组件，分为四种类型，`circle`为环形，`arc`为弧线，`spin`为旋转，`dot`为圆点。所有类型均可定制颜色，环形和弧线类型可定制线圈半径及粗细，旋转和圆点类型可定制内部元素透明度。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|color|主颜色，如果想使用 css 控制主颜色，可使用公共 mixin \`\.set\-loading\-color(@color)\`|string|-|
|type|loading类型|"spin" \| "circle" \| "arc" \| "dot"|"dot"|
|list|当类型为\`dot\`或\`spin\`时有效，定义内部各元素的透明度|number\[\]|-|
|duration|一次loading周期的毫秒数|number|1000|
|svgKey|区分不同loading组件间的\`\<def\>\`内容|string|-|
|radius|圆圈半径，类型为\`circle\`或\`arc\`时可用|number|9|
|stroke|圆圈描边宽度，类型为\`circle\`或\`arc\`或\`spin\`时可用|number|2|
|filleted|边缘是否为圆角|boolean|true|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> LoadingType

```
"spin" | "circle" | "arc" | "dot"
```
