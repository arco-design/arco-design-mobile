### 信息展示

# 骨架屏 Skeleton

在内容加载过程中展示一组占位图形。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|是否显示标题占位图|boolean \| SkeletonTitleProps|true|
|paragraph|是否显示段落占位图|boolean \| SkeletonParagraphProps|true|
|avatar|是否显示头像占位图|boolean \| SkeletonAvatarProps|false|
|grid|是否显示金刚位占位图（如该参数非空时，默认展示四列金刚位，且不展示标题/段落/头像占位符）|boolean \| SkeletonGridProps|false|
|showAnimation|是否展示动画效果|boolean|true|
|animation|加载动画效果，可选“扫光”、“呼吸”两种效果|"gradient" \| "breath"|"gradient"|
|animationGradientColor|扫光动效高光颜色|string|"rgba(0, 0, 0, 0.04)"|
|backgroundColor|占位块背景色|string|"#F7F8FA"|
|children|子元素|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|

> Skeleton.Node

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> Skeleton.Title

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|width|标题占位图宽度|ReactText|"40%"|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> Skeleton.Paragraph

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|rows|段落占位图的行数|number|3|
|width|段落占位图宽度，若为数组格式对应每行宽度，否则表示最后一行的宽度|string \| number \| ReactText\[\]|"60%"|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> Skeleton.Avatar

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> Skeleton.Grid

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|columns|金刚位列数|number|4|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonTitleProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|width|标题占位图宽度|ReactText|"40%"|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonParagraphProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|rows|段落占位图的行数|number|3|
|width|段落占位图宽度，若为数组格式对应每行宽度，否则表示最后一行的宽度|string \| number \| ReactText\[\]|"60%"|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonAvatarProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> SkeletonGridProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|columns|金刚位列数|number|4|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|
