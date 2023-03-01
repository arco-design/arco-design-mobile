### 数据录入

# 单选框 Radio

单选框，可用状态下点击切换选择，支持禁用，支持单选项组。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|选项的文字说明，传入children时此属性无效|string|""|
|value|Checkbox的值|ValueType|必填|
|defaultCheck|默认选中状态|boolean|false|
|checked|是否选中，传值即为受控模式|boolean|-|
|onChange|复选框选中状态回调函数|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|

> Radio.Group

单选项组

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|options|可选项, 传入children后此值无效|(RadioProps\<ValueType\> & RefAttributes\<RadioRef\>)\[\]|-|
|value|受控模式，选中的选项|ValueType|-|
|defaultValue|默认选中项|ValueType|-|
|onChange|单选项组选中状态变化回调函数|(value: ValueType) =\> void|-|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> ValueType

```
string | number
```

> IconType

|参数|描述|类型|
|----------|-------------|------|
|normal|未选中|ReactNode|
|active|选中态|ReactNode|
|disabled|禁用态|ReactNode|
|activeDisabled|禁用选中态|ReactNode|

> RadioProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|选项的文字说明，传入children时此属性无效|string|""|
|value|Checkbox的值|ValueType|必填|
|defaultCheck|默认选中状态|boolean|false|
|checked|是否选中，传值即为受控模式|boolean|-|
|onChange|复选框选中状态回调函数|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> RadioGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|
