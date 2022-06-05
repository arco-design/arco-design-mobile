### Navigation

# TabBar 

TabBar component, a simplified version of Tabs, only supports tab switching.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|""|
|style|Custom style|CSSProperties|{}|
|children|Inner Content|ReactNode|null|
|activeIndex|The index value of the selected label|number|-|
|defaultActiveIndex|The index value of the default selected label|number|0|
|onChange|Callback when switching tabs|(index: number) =\> void|-|
|dataSource|Data source, if it is passed, TabBar\.TabBarItem will be invalid|(TabBarItemProps & RefAttributes\<TabBarItemRef\>)\[\]|-|
|activeCustomStyle|The style of the currently selected label|CSSProperties|-|
|fixed|Whether it is fixed at the bottom|boolean|true|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> TabBar.Item

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Title|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|extra|Additional elements (such as badge)|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|icon|Icon|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|child|Custom content|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|onClick|Click event|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> TabBarItemProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Title|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|extra|Additional elements (such as badge)|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|icon|Icon|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|child|Custom content|ReactNode \| ((active: boolean) =\> ReactNode)|-|
|onClick|Click event|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> TabBarItemRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
