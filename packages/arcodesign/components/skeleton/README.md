### 信息展示

# 骨架屏 Skeleton

在内容加载过程中展示一组占位图形。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|animation|加载动画效果，可选“扫光”、“呼吸”两种效果，不传入表示不展示动画效果|"gradient" \| "breath"|-|
|title|是否显示标题占位图|boolean \| SkeletonTitleProps|true|
|paragraph|是否显示段落占位图|boolean \| SkeletonParagraphProps|true|
|avatar|是否显示头像占位图|boolean \| SkeletonAvatarProps|false|
|grid|是否显示金刚位占位图（该参数非空时，不展示标题/段落/头像占位符）|boolean \| SkeletonGridProps|false|
|children|子元素|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|

> SkeletonTitleProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|width|标题占位图宽度|ReactText|'38%'|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonParagraphProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|rows|段落占位图的行数|number|3|
|width|段落占位图宽度，若为数组格式对应每行宽度，否则表示最后一行的宽度|string \| number \| ReactText\[\]|'58%'|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonAvatarProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|shape|头像形状|"circle" \| "square"|'circle'|
|size|头像尺寸|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|'smaller'|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonGridProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|columns|金刚位列数|number|4|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|
