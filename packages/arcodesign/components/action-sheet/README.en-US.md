### FeedBack

# ActionSheet 

ActionSheet Component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|items|Option setting, see ActionSheetItemOptions for details|ActionSheetItemOptions\[\]|required|
|cancelText|Cancel button content, the value will be shown, actionSheet will be closed when clicked|ReactNode|-|
|title|Title content|ReactNode|-|
|subTitle|Sub title content|ReactNode|-|
|needBottomOffset|Whether the content of the menu that slides out from the bottom fits the bottom of the iphoneX|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|onClose|Callback after closing (animation is completed)|(scene?: string) =\> void|-|
|visible|Whether to display the menu (controlled)|boolean|required|
|close|Close menu method|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|required|
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
|contentTransitionVarType|Content transition animation classname variable identifier|string|-|
|maskClosable|Whether to click the mask to close the menu|boolean|true|
|animatingClosable|Whether the menu can be closed by clicking on the mask when performing the entry animation|boolean|false|
|mountOnEnter|Whether to reload content when the menu is opened|boolean|true|
|preventBodyScroll|Whether to prohibit the scrolling of the body when the popup is opened|boolean|true|
|initialBodyOverflow|The initial overflow state of the page, that is, the state in which overflow should be restored when the popup is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|
|gestureOutOfControl|Whether to disable the scrolling container gesture judgment, leave it to users to judge|boolean|false|
|onOpen|Callback after opening (animation is completed)|() =\> void|-|
|onMaskClick|Callback when clicking the mask , also triggered when maskClosable=false|() =\> void|-|
|onTouchMove|Touch event callbacks for masking|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|Touch event callbacks for non\-scrolling areas or when scrolling to the top and bottom|(e: TouchEvent, direction: "x" \| "y") =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Methods

|method|Description|Type|
|----------|-------------|------|
|open|Open actionsheet|(config: ActionSheetProps) =\> \{ close: () =\> void; update: (newConfig: ActionSheetProps) =\> void; \}|

> ActionSheetItemOptions

|Property|Description|Type|
|----------|-------------|------|
|content|Option text|ReactNode|
|status|Status, it isn't clickable in disabled status, its font is red in danger status|"normal" \| "disabled" \| "danger"|
|className|Custom classname for option content|string|
|style|Custom stylesheet for option content|CSSProperties|
|onClick|Click option event, actionSheet will be prevent from closing when returning true|(e?: MouseEvent\<HTMLElement, MouseEvent\>) =\> boolean \| void \| Promise\<boolean \| void\>|

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
|createRoot|Users using react 19 need to pass in the createRoot method from outside|CreateRootFnType|-|

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
