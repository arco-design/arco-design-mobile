### 反馈

# 轻提示 Toast

轻提示组件，支持各个场景下调用方法。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|content|提示内容|ReactNode|-|
|duration|自动关闭的延时（单位: ms），设置为0则不会自动关闭|number|3000|
|icon|自定义图标|ReactNode|-|
|layout|内容排列布局|"vertical" \| "horizontal"|"vertical"|
|transitionDuration|打开关闭动画执行时长（单位: ms）|number|300|
|close|关闭函数|() =\> void|-|
|onClose|关闭后的回调函数|() =\> void|-|
|loading|是否为加载态|boolean|-|
|loadingIcon|加载图标，传入Icon组件type属性或node|ReactNode|-|
|loadingInner|加载图标内部元素，仅在 loading 为 true 时生效|string|-|
|disableBodyTouch|是否禁止toast以外区域的交互|boolean|false|
|visible|是否显示toast|boolean|false|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|type|toast展示信息类型，不同类型对应不同图标，info表示纯文字信息无图标|"info" \| "success" \| "error" \| "warn"|"info"|
|direction|toast出现位置|"center" \| "top" \| "bottom"|"center"|
|typeIconMap|自定义不同类型对应的不同图标|Partial\<Record\<ToastType, ReactNode\>\>|-|
|initialBodyOverflow|页面初始 overflow 状态，即关闭toast时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|toast|展示常规提示框|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|info|展示常规提示框，同 Toast\.toast|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|success|展示成功提示框(含成功icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|error|展示错误提示框(含错误icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|loading|展示加载中提示框(含加载中icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|warn|展示警告提示框(含警告icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|

> ToastType

```
"success" | "error" | "warn"
```

> GlobalContextParams

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|是否使用暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|

> ILocale

|参数|描述|类型|
|----------|-------------|------|
|locale|语言类型|string|
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
