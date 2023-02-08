### 通用

# 按钮 Button

按钮用于开始一个即时操作。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|type|样式类型|"primary" \| "ghost" \| "default"|"primary"|
|size|尺寸|"mini" \| "small" \| "medium" \| "large" \| "huge"|"large"|
|inline|是否为内联样式|boolean|false|
|loading|是否处于加载中状态|boolean|false|
|disabled|是否禁用|boolean|false|
|halfBorder|border是否为0\.5px|boolean|false|
|icon|图标名，传入Icon组件|ReactNode|-|
|showTextWhenLoading|加载中是否展示文字|boolean|true|
|needActive|是否需要点击态|boolean|true|
|style|自定义样式|CSSProperties|-|
|shape|按钮形状|"round" \| "semi" \| "square"|"semi"|
|color|自定义字体颜色|ButtonColorStatus|-|
|bgColor|自定义背景颜色|ButtonColorStatus|-|
|borderColor|自定义边框颜色|ButtonColorStatus|-|
|className|自定义类名|string|-|
|loadingIcon|加载图标，传入Icon组件type属性或node|ReactNode|-|
|children|子元素|ReactNode|-|
|onClick|点击按钮的回调函数|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClickDisabled|禁用状态下点击按钮的回调函数|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|disableWhenLoading|加载中是否禁用按钮操作|boolean|true|
|coverIconWhenLoading|加载中是否覆盖Icon|boolean|true|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLButtonElement|

> ButtonColorStatus

```
string | { normal: string; active: string; disabled: string; }
```
