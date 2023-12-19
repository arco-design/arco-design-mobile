### Data Entry

# Slider 

Slide input component, displays the current value and optional range.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|
|disabled|Disabled|boolean|false|
|useRange|Use range selection|boolean|Judging by the incoming initial parameters, false if not|
|useAnimation|Use animation for non\-click state|boolean|true|
|min|Minimum value|number|0|
|max|Maximum value|number|100|
|defaultValue|Default initial value|number \| \[number, number\]|-|
|value|Value, component will be controlled|number \| \[number, number\]|-|
|step|Step|number|1|
|type|Component direction|"horizontal" \| "vertical"|"horizontal"|
|showTooltip|Whether to show tooltips|"auto" \| "always" \| "never"|"auto"|
|marks|Slider node configuration|number \| number\[\] \| Record\<string, ReactNode\>|-|
|showMarks|Whether to display the bottom mark text|boolean|false|
|useMarkOnly|Whether only the value of the mark is available, overriding step|boolean|false|
|prefixLabel|prefix icon or label|ReactNode \| ((value: number \| \[\.\.\.\]) =\> ReactNode)|-|
|suffixLabel|Suffix icon or label|ReactNode \| ((value: number \| \[\.\.\.\]) =\> ReactNode)|-|
|size|Slider bar thickness (unit: px)|ReactText|2|
|draggableTrackOnly|Only allow dragging of sliders,  the default is false|boolean|false|
|formatTooltip|Custom tooltip content|(value: number) =\> ReactNode|-|
|onAfterChange|Callback after value changes, the timing is the same as touchend|(value: number \| \[number, number\]) =\> void|-|
|onChange|Callback when value changes in real time|(value: number \| \[number, number\]) =\> void|-|
|renderThumb|Custom slider|(value: number) =\> ReactNode|-|
|renderThumbPopover|Custom slider popover，priority is higher than formatTooltip\. value \- current sliding progress, visible \- visibility of the bubble, index \- current slider index, thumbEl \- current slider element\.|(config: \{ value: number; visible: boolean; index: number; thumbEl: ReactNode; \}) =\> ReactNode|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
