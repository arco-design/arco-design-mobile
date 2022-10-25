### Navigation

# Dropdown 

Dropdown panel, showing options to choose from

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|showDropdown|Whether to expand the dropdown box|boolean|required|
|options|Displayed options, lower priority than dropdownNode|OptionsItem\[\]|[]|
|children|Custom dropdown element|ReactNode|-|
|onCancel|Cancel selection|() =\> void|required|
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
|multiple|Whether to support multiple selection|boolean|false|
|defaultSelectedValue|Default checked value|string \| number \| ReactText\[\]|-|
|selectedValue|The currently selected option value|string \| number \| ReactText\[\]|-|
|onOptionClick|Callback when clicking option|((val: ReactText, op: OptionsItem) =\> void) \| ((selected: boolean, val: ReactText, op: OptionsItem) =\> void)|-|
|onOptionChange|Callback when the option changes|((val: ReactText, op: OptionsItem) =\> void) \| ((vals: ReactText\[\], op: OptionsItem) =\> void)|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Dropdown.Options

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|options|Displayed list of options|OptionsItem\[\]|required|
|useColumn|Use multi\-column label style, input true, it's 4 columns, and input number n, it will be n columns|number \| boolean|false|
|icon|Icon on the right side of the options list|ReactNode|-|
|multiple|Whether to support multiple selection|boolean|false|
|defaultSelectedValue|Default checked value|string \| number \| ReactText\[\]|-|
|selectedValue|The currently selected option value|string \| number \| ReactText\[\]|-|
|onOptionClick|Callback when clicking option|((val: ReactText, op: OptionsItem) =\> void) \| ((selected: boolean, val: ReactText, op: OptionsItem) =\> void)|-|
|onOptionChange|Callback when the option changes|((val: ReactText, op: OptionsItem) =\> void) \| ((vals: ReactText\[\], op: OptionsItem) =\> void)|-|

> OptionsItem

|Property|Description|Type|
|----------|-------------|------|
|label|option label|ReactNode|
|value|option value|ReactText|
|disabled|Whether the option is available, the default false means available|boolean|

> DropdownOptionsRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
