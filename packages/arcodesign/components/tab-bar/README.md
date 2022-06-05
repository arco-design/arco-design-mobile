### 导航

# 标签栏 TabBar

标签栏组件，Tabs 的简化版，仅支持标签切换

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|
|children|内部标签内容|ReactNode|null|
|activeIndex|选中标签的索引值|number|-|
|defaultActiveIndex|默认选中的索引值|number|0|
|onChange|切换标签时的回调函数|(index: number) =\> void|-|
|dataSource|数据源，传了 dataSource 则 TabBar\.TabBarItem 失效|(TabBarItemProps & RefAttributes\<TabBarItemRef\>)\[\]|-|
|activeCustomStyle|当前选中标签的样式|CSSProperties|-|
|fixed|是否固定在底部|boolean|true|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> TabBar.Item

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|标题|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|extra|附加元素 (如徽标)|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|icon|图标|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|child|自定义内容|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|onClick|点击事件|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> TabBarItemProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|标题|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|extra|附加元素 (如徽标)|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|icon|图标|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|child|自定义内容|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|onClick|点击事件|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> TabBarItemRef

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
