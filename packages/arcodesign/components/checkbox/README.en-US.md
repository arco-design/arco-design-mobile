### Data Entry

# Checkbox 

Checkbox, click to switch selection when available, support disabled status, support checkbox group.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|label|The text description of the option, invalid when the component has children|string|""|
|value|Checkbox value|ValueType|required|
|defaultCheck|Default selected status|boolean|false|
|checked|Whether it is selected or not, the component is in the controlled mode when the property is set|boolean|-|
|onChange|Callback when the checkbox status changes|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|Icon shape|"circle" \| "square"|'circle'|
|layout|Typography style (inline \| block level \| justified with right icon)|"inline" \| "block" \| "justify"|'inline'|
|disabled|Whether to disable|boolean|false|
|icons|Custom icon collection, input null to indicate no icon|IconType|Default icon|
|isRadio|Whether it is a Radio component\. It is deprecated, only used to support Radio component|boolean|false|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> Checkbox.Group

Checkbox group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|options|Checkbox group options, invalid after inputing children|(CheckboxProps\<ValueType\> & RefAttributes\<CheckboxRef\>)\[\]|-|
|value|Checkbox value in controlled mode|ValueType\[\]|-|
|defaultValue|Default selected option|ValueType\[\]|[]|
|min|Minimum number of options|number|0|
|max|Maximum number of options, 0 means no limit|number|0|
|onChange|Callback when the checkbox value changes|(value: ValueType\[\]) =\> void|() => {}|
|shape|Icon shape|"circle" \| "square"|'circle'|
|layout|Typography style (inline \| block level \| justified with right icon)|"inline" \| "block" \| "justify"|'inline'|
|disabled|Whether to disable|boolean|false|
|icons|Custom icon collection, input null to indicate no icon|IconType|Default icon|
|isRadio|Whether it is a Radio component\. It is deprecated, only used to support Radio component|boolean|false|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> ValueType

```
string | number
```

> IconType

|Property|Description|Type|
|----------|-------------|------|
|normal|unselected|ReactNode|
|active|selected|ReactNode|
|disabled|disabled|ReactNode|
|activeDisabled|active but disabled|ReactNode|

> CheckboxProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|label|The text description of the option, invalid when the component has children|string|""|
|value|Checkbox value|ValueType|required|
|defaultCheck|Default selected status|boolean|false|
|checked|Whether it is selected or not, the component is in the controlled mode when the property is set|boolean|-|
|onChange|Callback when the checkbox status changes|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|Icon shape|"circle" \| "square"|'circle'|
|layout|Typography style (inline \| block level \| justified with right icon)|"inline" \| "block" \| "justify"|'inline'|
|disabled|Whether to disable|boolean|false|
|icons|Custom icon collection, input null to indicate no icon|IconType|Default icon|
|isRadio|Whether it is a Radio component\. It is deprecated, only used to support Radio component|boolean|false|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> CheckboxGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
