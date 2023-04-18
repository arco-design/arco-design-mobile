### Feedback

# Toast 

The toast component, supports calling methods in various scenarios.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|content|Tip content|ReactNode|-|
|duration|Duration of automatic shutdown (unit: ms), if set to 0, it will not automatically shutdown|number|3000|
|icon|Custom icon|ReactNode|-|
|layout|Content layout|"vertical" \| "horizontal"|"vertical"|
|transitionDuration|Open and close animation duration (unit: ms)|number|300|
|close|Close function|() =\> void|-|
|onClose|Callback after closing|() =\> void|-|
|loading|Whether it is in the loading state|boolean|-|
|loadingIcon|Loading icon, input the type or node of icon component|ReactNode|-|
|loadingInner|Inner element of loading icon, only takes effect when loading is true|string|-|
|disableBodyTouch|Whether to prohibit interaction in areas other than toast|boolean|false|
|visible|Whether to show toast|boolean|false|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|type|toast displays information types, different types correspond to different icons, info means plain text information without icons|"info" \| "success" \| "error" \| "warn"|"info"|
|direction|The direction where the toast appears|"center" \| "top" \| "bottom"|"center"|
|typeIconMap|Customize different icons corresponding to different types|Partial\<Record\<ToastType, ReactNode\>\>|-|
|initialBodyOverflow|The initial overflow state of the page, that is, the state of overflow should be restored when toast is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Methods

|method|Description|Type|
|----------|-------------|------|
|toast|Show regular toast|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|info|Show regular toast, the same as Toast\.toast|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|success|Show success prompt toast (including success icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|error|Display error prompt toast (including error icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|loading|Display loading prompt toast (including loading icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|warn|Display warning prompt toast (including warning icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|

> ToastType

```
"success" | "error" | "warn"
```

> GlobalContextParams

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|Component classname prefix|string|"arco"|
|system|Manually control the current system, and the incoming value will be used directly after being passed in\. It is applicable when the initial value of the system needs to be specified in the ssr scenario\.|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|Whether to use dark mode|boolean|false|
|isDarkMode|Whether it is in dark mode|boolean|false|
|theme|Theme variable\. The css variable will be replaced online after input\. The less variable needs to be set|Record\<string, string\>|-|
|locale|Internationalized language configuration|ILocale|-|
|useRtl|Whether to use rtl|boolean|false|

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
