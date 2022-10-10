### 数据录入

# 开关 Switch

开关组件，支持点击和滑动触发开关动作。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|platform|组件的平台特有样式, 可选值为 android, ios|string|跟随当前所在系统|
|checked|是否设置为打开状态 有checked时defaultChecked不会使用|boolean|-|
|defaultChecked|默认的初始状态|boolean|false|
|text|开关文案|SwitchText|-|
|shape|圆角样式， fully \- 全圆角，semi \- 直角|"fully" \| "semi"|"fully"|
|innerArea|内部区域元素|ReactNode|-|
|disabled|是否设置为禁用状态|boolean|false|
|onChange|状态改变时触发的回调函数|(checked: boolean) =\> void|-|
|onTouchStart|touchStart事件回调|(e: TouchEvent\<HTMLDivElement\>) =\> void|-|
|onTouchEnd|touchEnd事件回调|(e: TouchEvent\<HTMLDivElement\>) =\> void|-|
|onClick|click事件回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> SwitchText

|参数|描述|类型|
|----------|-------------|------|
|on|打开时的展示文案|string|
|off|关闭时的展示文案|string|
