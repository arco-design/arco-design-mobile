### Data Entry

# Radio 

Radio button, click to switch selection when available, supports disabled state and radio option group.

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

> Radio.Group

Radio group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|options|Optional, this value is invalid after inputing children|(RadioProps\<ValueType\> & RefAttributes\<RadioRef\>)\[\]|-|
|value|Checked option, controlled mode|ValueType|-|
|defaultValue|Default checked value|ValueType|-|
|onChange|Callback when checked state of the radio group  changes|(value: ValueType) =\> void|-|
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

> RadioProps

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

> RadioGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
