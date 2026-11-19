### 其他

# 全局配置 ContextProvider

全局数据控制组件，用于替换全局数据。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|是否监听系统原生的暗黑模式变化(prefers\-color\-scheme: dark)以判断是否切为暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|darkModeSelector|当处于暗黑模式时，body上挂载的类名，为空值时不挂载类名|string|"arco-theme-dark"|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|
|onDarkModeChange|当系统原生暗黑模式发生变化时触发，useDarkMode=true 时有效|(isDark: boolean) =\> void|-|
|createRoot|React19 修改了 createRoot 的引入路径，导致组件内部无法直接引入（低react版本会找不到模块）。因此使用 react 19 的用户需从外部传入 createRoot 方法|CreateRootFnType|-|

> ILocale

|参数|描述|类型|
|----------|-------------|------|
|locale|语言类型|string|
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
