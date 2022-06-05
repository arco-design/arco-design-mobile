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
|toast|展示常规提示框|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|info|展示常规提示框，同 Toast\.toast|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|success|展示成功提示框(含成功icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|error|展示错误提示框(含错误icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|loading|展示加载中提示框(含加载中icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|
|warn|展示警告提示框(含警告icon)|(config: string \| ToastProps) =\> \{ update: (config: ToastProps) =\> void; close: () =\> void \}|

> ToastType

```
"success"|"error"|"warn"
```
