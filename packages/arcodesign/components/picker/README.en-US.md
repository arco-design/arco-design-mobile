### Data Entry

# Picker 

The selector component, in the form of a popup layer.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|data|Data source, the length of the data list determines the number of picker columns when not cascading, and is determined by cols when cascading|PickerData\[\] \| PickerData\[\]\[\] \| ValueType\[\]\[\]|required|
|cascade|Whether to cascade|boolean|true|
|cols|Number of columns (maximum 5; only used when cascade=true)|number|3|
|rows|The number of rows (the number of rows in a column of optional items), must be an odd number, the minimum is 3|number|5|
|disabled|Whether t be disabled|boolean|false|
|value|Value, the format is \[value1, value2, value3\], corresponding to the corresponding level value of the data source, if not passed, the first value of each column is selected by default|ValueType\[\]|-|
|onHide|Callback for clicking on mask layer or cancel button, OK button|(scene?: string) =\> void|-|
|onChange|Callback after selection|(selectedValue: ValueType\[\]) =\> void|-|
|onPickerChange|The callback after each column data selection changes|(value: ValueType\[\], index: number) =\> void|-|
|itemStyle|Stylesheet per column|CSSProperties|-|
|visible|whether to show the picker|boolean|false|
|okText|Text of confirmed selected value of the popup|string|"OK"|
|dismissText|Popup canceled text|string|"Cancel"|
|onOk|Callback when clicking on Ok|(value: ValueType\[\]) =\> void|-|
|onDismiss|Callback when clicking to cancel|() =\> void|-|
|clickable|Whether content can be selected by clicking|boolean|true|
|hideEmptyCols|Whether to hide empty columns without data, often used for cascading selection|boolean|false|
|title|Picker title|string|""|
|maskClosable|Whether to click the mask to close the menu|boolean|false|
|touchToStop|Whether to stop sliding by long\-pressing, inputing in the number x means that the touch exceeds x milliseconds to count as long\-pressing, inputing true means that x=100, the long\-press event and the click event are mutually exclusive|number \| boolean|false|
|gestureOutOfControl|Whether to disable the scrolling container gesture judgment, leave it to users to judge|boolean|true|
|needBottomOffset|Whether the content of the menu that slides out from the bottom fits the bottom of ipx|boolean|false|
|translateZ|\[To be deprecated\] Enable translateZ forced promotion|boolean|false|
|maskTransitionTimeout|Menu mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|Menu content animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|Content transition animation classname|string|\`slide-from-${props.direction}\`|
|className|Custom classname|string|-|
|maskClass|Custom mask classname|string|-|
|maskStyle|Custom mask stylesheet|CSSProperties|-|
|contentClass|Custom content classname|string|-|
|contentStyle|Custom content stylesheet|CSSProperties|-|
|maskTransitionType|Mask transition animation classname|string|"fade"|
|animatingClosable|Whether the menu can be closed by clicking on the mask when performing the entry animation|boolean|false|
|mountOnEnter|Whether to reload content when the menu is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|preventBodyScroll|Whether to prohibit the scrolling of the body when the popup is opened|boolean|true|
|initialBodyOverflow|The initial overflow state of the page, that is, the state in which overflow should be restored when the popup is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|
|onClose|Callback after closing (animation is completed)|(scene?: string) =\> void|-|
|onOpen|Callback after opening (animation is completed)|() =\> void|-|
|onMaskClick|Callback when clicking the mask , also triggered when maskClosable=false|() =\> void|-|
|onTouchMove|Touch event callbacks for masking|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|Touch event callbacks for non\-scrolling areas or when scrolling to the top and bottom|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|getCellMovingStatus|Sliding state of each column|() =\> PickerCellMovingStatus\[\]|
|updateLayout|Manually update the element layout|() =\> void|
|getAllColumnValues|Get all column values|() =\> ValueType\[\]|
|getColumnValue|Get the value of the nth column|(index: number) =\> ValueType|
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
