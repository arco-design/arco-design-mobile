### FeedBack

# Dialog 

A modal dialog, displayed in a floating layer, guides the user to perform related operations. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the bullet layer, you need to pass the scroll container to `getScrollContainer` to release scrolling when it is not scrolled to the top or bottom.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Dialog title|ReactNode|-|
|footer|Bottom button configuration|FooterButtonOptions\[\]|[]|
|footerType|Bottom button style, grid indicates the banner style, button indicates the button style, valid when platform = ios|"grid" \| "button"|"grid"|
|renderFooter|Custom rendering footer|() =\> ReactNode|-|
|footerCollapseCount|Vertical arrangement when the number of buttons at the bottom is greater than or equal to the set value|number|3|
|titleAlign|Title alignment|"left" \| "center" \| "right"|"left" when platform=android, "center" otherwise|
|contentAlign|Content alignment|"left" \| "center" \| "right"|"left" when platform=android, "center" otherwise|
|platform|The current operating system, corresponding to different styles|"ios" \| "android"|Follow the system|
|extra|Other elements in the dialog, such as the close button, etc\.|ReactNode|-|
|contentTransitionType|Content transition animation classname|string|"fade" when platform=android, "fade-scale" otherwise|
|maskTransitionTimeout|Mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|contentTransitionTimeout|Dialog content animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|450|
|className|Custom classname|string|-|
|maskClass|Custom mask classname|string|-|
|maskStyle|Custom mask stylesheet|CSSProperties|-|
|contentClass|Custom content classname|string|-|
|contentStyle|Custom content stylesheet|CSSProperties|-|
|visible|Whether to display the menu (controlled)|boolean|required|
|close|Close menu method|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|required|
|maskTransitionType|Mask transition animation classname|string|"fade"|
|children|Contents of menu|ReactNode|-|
|maskClosable|Whether to click the mask to close the menu|boolean|true|
|animatingClosable|Whether the menu can be closed by clicking on the mask when performing the entry animation|boolean|false|
|mountOnEnter|Whether to reload content when the menu is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|orientationDirection|The transform direction, used to simulate the situation of horizontal screen through transform|"left" \| "right" \| "top" \| "bottom"|"top"|
|preventBodyScroll|Whether to prohibit the scrolling of the body when the popup is opened|boolean|true|
|initialBodyOverflow|The initial overflow state of the page, that is, the state in which overflow should be restored when the popup is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|
|gestureOutOfControl|Whether to disable the scrolling container gesture judgment, leave it to users to judge|boolean|false|
|onClose|Callback after closing (animation is completed)|(scene?: string) =\> void|-|
|onOpen|Callback after opening (animation is completed)|() =\> void|-|
|onMaskClick|Callback when clicking the mask , also triggered when maskClosable=false|() =\> void|-|
|onTouchMove|Touch event callbacks for masking|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|Touch event callbacks for non\-scrolling areas or when scrolling to the top and bottom|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|getScrollContainer|Container of inner scroll area in content, scroll is released when not scrolled to the top or bottom in this container|() =\> HTMLElement \| HTMLElement\[\]|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|mask|Mask DOM|HTMLDivElement|
|content|Content DOM|HTMLDivElement|
|setCloseScene|Modify the scene of onClose before closing the popup|(scene: string) =\> void|

> Methods

|method|Description|Type|
|----------|-------------|------|
|alert|Open a confirmation dialog (with a confirmation button)|(config: AlertOptions & DialogProps) =\> \{ close: () =\> void; update: (newConfig: AlertOptions & DialogProps) =\> void; \}|
|confirm|Open a prompt dialog (with a confirm button and a cancel button)|(config: ConfirmOptions & AlertOptions) =\> \{ close: () =\> void; update: (newConfig: ConfirmOptions & AlertOptions) =\> void; \}|
|open|Open the general dialog|(config: DialogProps) =\> \{ close: () =\> void; update: (newConfig: DialogProps) =\> void; \}|

> FooterButtonOptions

|Property|Description|Type|
|----------|-------------|------|
|content|Button content|ReactNode \| ((locale: ILocale) =\> ReactNode)|
|className|Button classname|string|
|disabled|Whether to disable button|boolean|
|onClick|Button clicking event, when the return value is true, the dialog can be prevented from closing|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|

> ILocale

|Property|Description|Type|
|----------|-------------|------|
|locale|Language Type|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; prepareText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
|Picker|-|\{ okText: string; cancelText: string; \}|
|Tag|-|\{ addTag: string; \}|
|Dialog|-|\{ okText: string; cancelText: string; \}|
|SwipeLoad|-|\{ normalText: string; activeText: string; \}|
|PullRefresh|-|\{ loadingText: string; pullingText: string; finishText: string; loosingText: string; \}|
|DropdownMenu|-|\{ select: string; \}|
|Pagination|-|\{ previousPage: string; nextPage: string; \}|
|Image|-|\{ loadError: string; \}|
|ImagePicker|-|\{ loadError: string; \}|
|SearchBar|-|\{ placeholder: string; cancelBtn: string; \}|
|Stepper|-|\{ minusButtonName: string; addButtonName: string; \}|
|Keyboard|-|\{ confirm: string; \}|
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.; \}; \}|

> AlertOptions

|Property|Description|Type|
|----------|-------------|------|
|key|Component mount container id distinction|string|
|onOk|Callback when clicking OK button|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|
|okText|Ok button text|ReactNode|

> GlobalContextParams

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|Component classname prefix|string|"arco"|
|system|Manually control the current system, and the incoming value will be used directly after being passed in\. It is applicable when the initial value of the system needs to be specified in the ssr scenario\.|"" \| "ios" \| "android" \| "pc"|""|
|useDarkMode|Whether to use dark mode|boolean|false|
|isDarkMode|Whether it is in dark mode|boolean|false|
|theme|Theme variable\. The css variable will be replaced online after input\. The less variable needs to be set|Record\<string, string\>|-|
|locale|Internationalized language configuration|ILocale|-|
|useRtl|Whether to use rtl|boolean|false|

> ConfirmOptions

|Property|Description|Type|
|----------|-------------|------|
|onCancel|Callback when clicking cancel button|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|
|cancelText|Cancel button text|ReactNode|
