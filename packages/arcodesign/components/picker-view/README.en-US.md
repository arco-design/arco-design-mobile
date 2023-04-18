### Data Entry

# PickerView 

The picker view component, not has contain popup, which is convenient for the user to flexibly customize the picker.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|data|Data source, the length of the data list determines the number of picker columns when not cascading, and the number of picker columns is determined by cols when cascading|PickerData\[\] \| PickerData\[\]\[\] \| ValueType\[\]\[\]|required|
|cascade|Whether to cascade|boolean|true|
|cols|Number of columns (maximum 5; only used when cascade=true)|number|3|
|rows|The number of rows (the number of rows in a column of optional items), must be an odd number, the minimum is 3|number|5|
|disabled|Disabled|boolean|false|
|value|Value, the format is \[value1, value2, value3\], corresponding to the corresponding level value of the data source|ValueType\[\]|required|
|onPickerChange|The callback function after each column data selection changes|(value: ValueType\[\], index: number) =\> void|-|
|itemStyle|Stylesheet per column|CSSProperties|-|
|className|Custom classname|string|-|
|clickable|Whether content can be selected by clicking|boolean|true|
|hideEmptyCols|Whether to hide empty columns without data, often used for cascading selection|boolean|false|
|touchToStop|Whether to stop sliding by long\-pressing, inputing the number x means that the touch exceeds x milliseconds to count as long\-pressing, inputing true means that x=100, the long\-press event and the click event are mutually exclusive|number \| boolean|false|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|getCellMovingStatus|Sliding state of each column|() =\> PickerCellMovingStatus\[\]|
|getAllColumnValues|Get all column values|() =\> ValueType\[\]|
|getColumnValue|Get the value of the nth column|(index: number) =\> ValueType|
|updateLayout|Manually update the element layout|() =\> void|
|resetValue|Reset the selector's value to the input value \`value\`|() =\> void|
|scrollToCurrentIndex|Jump directly to the current most recent line (will break scrolling when called)|() =\> void|

> PickerData

|Property|Description|Type|
|----------|-------------|------|
|value|The value for each item displayed in each column|ValueType|
|label|Text displayed in each column|ReactNode|
|children|In the cascade state, the next column of data corresponding to this column|PickerData\[\]|

> ValueType

```
string | number
```

> PickerCellMovingStatus

```
"normal" | "moving" | "scrolling"
```
