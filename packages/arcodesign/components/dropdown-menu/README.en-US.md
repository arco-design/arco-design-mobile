### Navigation

# DropdownMenu 

Dropdown component, click the selector (select) to expand the dropdown box (dropdown), display the options (options), compatible with multiple selectors.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|defaultSelectIndex|The number of the selector that is initially selected|number|-|
|selectIndex|The selected number of selector (controlled)|number|-|
|disabled|Selector disabled state|boolean\[\]|-|
|selectTips|Description of selectors|string\[\]|-|
|onSelectChange|Callback when the selected selector changes|(selectIndex: number) =\> void|-|
|icon|Icon to the right of the selector|ReactNode|-|
|defaultShowDropdown|Initial dropdown state|boolean|-|
|showDropdown|Optionally controlled, the state of the dropdown box when the component is mounted|boolean|-|
|onDropdownChange|Callback when displayed status of drop\-down box changes|(dropdown: boolean, selectIndex?: number) =\> void|-|
|getContainer|Get the dropdown box's container|() =\> HTMLDivElement|-|
|chooseAndClose|Whether to close the panel after selection, only single selection is valid|boolean|true|
|onCancel|Callback for cancelling selection|() =\> void|-|
|children|Custom dropdown element|ReactNode|-|
|extraForDropdown|Dropdown parameter|DropdownCommonProps|-|
|multiple|Whether to support multiple selection|boolean|false|
|options|The options displayed in the dropdown box, in which the cascade option only supports single selection|string\[\] \| OptionsItem\[\]\[\] \| CascadeOptions\[\]|required|
|defaultValues|initial selection item|ReactText\[\] \| ReactText\[\]\[\]|-|
|values|(Controlled) The item selected by each selector|ReactText\[\] \| ReactText\[\]\[\]|-|
|renderSelectLabel|Custom selector|((op: OptionsItem, index: number) =\> ReactNode) \| ((op: OptionsItem\[\], index: number) =\> ReactNode)|-|
|onOptionClick|Callback when clicking option|((value: ReactText, item: OptionsItem, selectIndex?: number) =\> void) \| ((selected: boolean, val: ReactText, item: OptionsItem, selectIndex?: number) =\> void)|-|
|onOptionChange|Callback when options change|((value: ReactText, item: OptionsItem, selectIndex?: number) =\> void) \| ((vals: ReactText\[\], item: OptionsItem, selectIndex?: number) =\> void)|-|
|onValuesChange|Callback when the total value of all selector options changes|((values: ReactText\[\]) =\> void) \| ((values: ReactText\[\]\[\]) =\> void)|-|
|getFormattedOptions|Format the input options|((options: string\[\] \| OptionsItem\[\]\[\] \| CascadeOptions\[\], values?: ReactText\[\]) =\> \{ formattedOptions: OptionsItem\[\]\[\]; formattedValue: ReactText\[\]; \}) \| ((options: string\[\] \| \.\.\. 1 more \.\.\. \| CascadeOptions\[\], values?: ReactText\[\]\[\]) =\> \{ \.\.\.; \})|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> DropdownCommonProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|extraNode|Dropdown bottom element|ReactNode|-|
|top|Position where the dropDown box appears|number|-|
|bottom|Position Where the drop\-down box appears when expanding upwards|number|-|
|direction|Expand direction|"up" \| "down"|"down"|
|height|Dropdown box height in controlled mode|number|-|
|maxHeight|The maximum height of the dropdown|number|500|
|clickOtherToClose|Click on other areas to cancel the selection|boolean|true|
|touchToClose|Whether to cancel the selection when touchstart is triggered, otherwise cancel the selection after the click|boolean|true|
|dropdownAnimationTimeout|Expand and collapse animation duration|number|300|
|dropdownAnimationFunction|Expand and collapse animation curve function|string|"cubic-bezier(0.32, 0.96, 0.6, 1)"|
|showMask|Whether to show the mask layer|boolean|true|
|maskAnimationTimeout|Mask animation duration|number|500|
|maskAnimationFunction|Mask animation function|string|"cubic-bezier(0.32, 0.96, 0.6, 1)"|
|useColumn|Use multi\-column label style, input true, it's 4 columns, and input number n, it will be n columns|number \| boolean|false|
|optionIcon|Icon in each option|ReactNode|-|
|mountOnEnter|Whether to reload the content when the dropdown box is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|preventBodyScroll|Whether to prohibit the scrolling of the body when the dropdown box is opened|boolean|true|
|initialBodyOverflow|The initial overflow state of the page, that is, the state in which overflow should be restored when the dropdown box is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|
|getAnchorElement|Element used for positioning, with lower priority than top/bottom|() =\> HTMLElement|The parent element of the current DOM|
|isStopTouchEl|Whether to prevent the panel from closing when an element is clicked, the priority is higher than \`getStopTouchElement\`, valid when clickOtherToClose=true|(el: HTMLElement) =\> boolean|-|
|getStopTouchElements|Element that prevents the panel from closing, valid when clickOtherToClose=true|() =\> HTMLElement\[\]|The parent element of the current component|
|getScrollContainer|Content inner scroll container, scrolling will be releases when it is not scrolled to the top or bottom|() =\> HTMLElement \| HTMLElement\[\]|-|
|getPortalContainer|Get mounted container|() =\> HTMLElement|-|

> OptionsItem

|Property|Description|Type|
|----------|-------------|------|
|label|option label|ReactNode|
|value|option value|ReactText|
|disabled|Whether the option is available, the default false means available|boolean|

> CascadeOptions

|Property|Description|Type|
|----------|-------------|------|
|children|The next level content of the cascade selection|OptionsItem\[\]|
|label|option label|ReactNode|
|value|option value|ReactText|
|disabled|Whether the option is available, the default false means available|boolean|
