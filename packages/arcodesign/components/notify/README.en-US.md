### Feedback

# Notify 

The feedback information bar displayed after active operation can be called by method or by component.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom style|CSSProperties|-|
|content|Notification content|ReactNode|-|
|type|Notification type|"success" \| "error" \| "warn" \| "info"|-|
|visible|Whether to show notification|boolean|false|
|close|Close function|() =\> void|-|
|onClose|Callback after closing|() =\> void|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|transitionDuration|Animation execution time (unit: ms)|number|300|
|duration|The delay of notification automatic closing (unit: ms)\. Will not automatically close when it is set to 0|number|3000|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLElement|
|updateLayout|Update DOM layout|() =\> void|

> Methods

|method|Description|Type|
|----------|-------------|------|
|info|展示常规通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|success|展示成功通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|error|展示错误的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|warn|展示警告的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|

> NotifyType

```
"success"|"error"|"warn"|"info"
```
