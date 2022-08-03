### Others

# ContextProvider 

Global data control component, used to replace global data.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|Component classname prefix|string|"arco"|
|system|Manually control the current system, and the incoming value will be used directly after being passed in\. It is applicable when the initial value of the system needs to be specified in the ssr scenario\.|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|Whether to use dark mode|boolean|false|
|isDarkMode|Whether it is in dark mode|boolean|false|
|theme|Theme variable\. The css variable will be replaced online after input\. The less variable needs to be set|Record\<string, string\>|-|
|locale|Internationalized language configuration|ILocale|-|

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
