### Feedback

# Popup 

A full-screen menu based on a modal popup, supporting all directions. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the popup layer, you need to pass the scroll container to the `getScrollContainer` property to release scrolling when it is not scrolled to the top or bottom.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|direction|The direction the menu slides out|"left" \| "right" \| "top" \| "bottom"|"bottom"|
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
|open|Open the popup|(config: PopupProps) =\> \{ close: () =\> void; update: (newConfig: PopupProps) =\> void; \}|

> DirectionType

```
"left" | "right" | "top" | "bottom"
```

> GlobalContextParams

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|Component classname prefix|string|"arco"|
|system|Manually control the current system, and the incoming value will be used directly after being passed in\. It is applicable when the initial value of the system needs to be specified in the ssr scenario\.|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|Whether to monitor the system's native dark mode changes (prefers\-color\-scheme: dark) to determine whether to switch to dark mode|boolean|false|
|isDarkMode|Whether it is in dark mode, the value shall prevail after being specified|boolean|false|
|darkModeSelector|When in dark mode, the class name mounted on the body, if it is empty, the class name will not be mounted|string|"arco-theme-dark"|
|theme|Theme variable\. The css variable will be replaced online after input\. The less variable needs to be set|Record\<string, string\>|-|
|locale|Internationalized language configuration|ILocale|-|
|useRtl|Whether to use rtl|boolean|false|
|onDarkModeChange|Triggered when the system's native dark mode changes, valid when useDarkMode=true|(isDark: boolean) =\> void|-|

> ILocale

|Property|Description|Type|
|----------|-------------|------|
|locale|Language Type|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
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
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; \.\.\. 4 more \.\.\.; pickerDefaultHint: string; \}|
|NavBar|-|\{ backBtnAriaLabel: string; \}|
|Uploader|-|\{ uploadBtn: string; retryUpload: string; \}|
