### Data Entry

# DatePicker 

Date picker, based on the `Picker` component, supports the specified range, the unit can be accurate to seconds.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|onOk|Callback when clicking OK|(timestamp: number, obj: IDateObj) =\> void|-|
|currentTs|The currently selected time, timestamp|number|Date.now()|
|onChange|Callback when value is changed|(timestamp: number, obj: IDateObj) =\> void|-|
|onValueChange|The callback function after each column data selection changes|(timestamp: number, obj: IDateObj, index: number) =\> void|-|
|mode|Optional column type, date means year, month and day, time means hour, minute and second, datetime means year, month, day, hour, minute and second|"date" \| "time" \| "datetime"|"datetime"|
|typeArr|optional column list|ItemType\[\]|[]|
|minTs|Minimum selectable date, timestamp|number|10 years ago from the current time|
|maxTs|Maximum selectable date, timestamp|number|Next decade from current time|
|useUTC|Whether to use UTC|boolean|false|
|formatter|The formatting method of each optional item, the parameter type is ItemTypes, the parameter value is the value of the current row, and the displayed text is returned\.|(value: number, type: ItemType) =\> string|(value: number) => (value < 10 ? \`0${value}\` : String(value))|
|valueFilter|Row filtering method, the parameter type is ItemType, the parameter value is the value of the current row, and returns true to indicate that the row can be selected|(type: ItemType, value: number) =\> boolean|() => true|
|columnsProcessor|Selector list item intervention to insert custom options\.|(columns: PickerData\[\]\[\], currentDateObj: IDateObj) =\> PickerData\[\]\[\]|-|
|visible|whether to show the picker|boolean|false|
|maskClosable|Whether to click the mask to close the menu|boolean|false|
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
|gestureOutOfControl|Whether to disable the scrolling container gesture judgment, leave it to users to judge|boolean|true|
|onClose|Callback after closing (animation is completed)|(scene?: string) =\> void|-|
|onOpen|Callback after opening (animation is completed)|() =\> void|-|
|onMaskClick|Callback when clicking the mask , also triggered when maskClosable=false|() =\> void|-|
|onTouchMove|Touch event callbacks for masking|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|Touch event callbacks for non\-scrolling areas or when scrolling to the top and bottom|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|rows|The number of rows (the number of rows in a column of optional items), must be an odd number, the minimum is 3|number|5|
|disabled|Whether t be disabled|boolean|false|
|onHide|Callback for clicking on mask layer or cancel button, OK button|(scene?: string) =\> void|-|
|itemStyle|Stylesheet per column|CSSProperties|-|
|okText|Text of confirmed selected value of the popup|string|"OK"|
|dismissText|Popup canceled text|string|"Cancel"|
|onDismiss|Callback when clicking to cancel|() =\> void|-|
|clickable|Whether content can be selected by clicking|boolean|true|
|hideEmptyCols|Whether to hide empty columns without data, often used for cascading selection|boolean|false|
|title|Picker title|string|""|
|touchToStop|Whether to stop sliding by long\-pressing, inputing in the number x means that the touch exceeds x milliseconds to count as long\-pressing, inputing true means that x=100, the long\-press event and the click event are mutually exclusive|number \| boolean|false|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> IDateObj

|Property|Description|Type|
|----------|-------------|------|
|year|year|number|
|month|month|number|
|date|date|number|
|hour|hour|number|
|minute|minute|number|
|second|second|number|

> mode

```
"date" | "time" | "datetime"
```

> ItemType

```
"date" | "year" | "month" | "hour" | "minute" | "second"
```

> PickerData

|Property|Description|Type|
|----------|-------------|------|
|value|The value for each item displayed in each column|ReactText|
|label|Text displayed in each column|ReactNode|
|children|In the cascade state, the next column of data corresponding to this column|PickerData\[\]|
