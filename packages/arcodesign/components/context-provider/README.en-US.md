### Others

# ContextProvider 

Global data control component, used to replace global data.

======

> Props

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
