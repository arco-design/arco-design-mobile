### Data Display

# Collapse 

Collapse supports accordion mode.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|header|Title|ReactNode|-|
|value|Unique ID of the accordion panel|string|required|
|icon|Expand icon for collapse panels|ReactNode|-|
|hideIcon|whether to hide the icon|boolean|false|
|disabled|Whether it is not expandable|boolean|false|
|content|Panel content|ReactNode|required|
|active|whether to expand|boolean|-|
|defaultActive|Default expanded status|boolean|false|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|onCollapse|Optional controlled, triggered when the collapse panel is expanded|(value: string) =\> void|-|
|animationTimeout|Animation duration|number|-|
|animationFunction|Animation function|string|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM of the component|HTMLDivElement|
|head|Collapse panel header DOM|HTMLDivElement|
|updateLayout|Manually update component layout (height calculation)|() =\> void|

> Collapse.Group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|onCollapse|Optional controlled, triggered when the collapse panel is expanded|(value: string) =\> void|-|
|animationTimeout|Animation duration|number|-|
|animationFunction|Animation function|string|-|
|useAccordion|Whether to use accordion mode|boolean|false|
|activeItems|Optional controlled, expandable item array, or the state corresponding to each item|string\[\]|-|
|defaultActiveItems|Default state|string\[\]|-|
|disabled|Disable all|boolean|false|
|items|array of collapse panels|(CollapseProps & RefAttributes\<CollapseRef\>)\[\]|-|
|children|Children elements, which have higher priority than items|ReactNode|-|
|groupKey|Distinguish different groups, it is recommended to pass in when groups are nested|string|-|

> CollapseProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|header|Title|ReactNode|-|
|value|Unique ID of the accordion panel|string|required|
|icon|Expand icon for collapse panels|ReactNode|-|
|hideIcon|whether to hide the icon|boolean|false|
|disabled|Whether it is not expandable|boolean|false|
|content|Panel content|ReactNode|required|
|active|whether to expand|boolean|-|
|defaultActive|Default expanded status|boolean|false|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|onCollapse|Optional controlled, triggered when the collapse panel is expanded|(value: string) =\> void|-|
|animationTimeout|Animation duration|number|-|
|animationFunction|Animation function|string|-|

> CollapseGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|-|HTMLDivElement|
