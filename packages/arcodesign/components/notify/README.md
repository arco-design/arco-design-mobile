### 反馈

# 消息通知 Notify

主动操作后显示的反馈信息横条，可采用方法调用或者组件调用的方式

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|content|需要展示的内容|ReactNode|-|
|type|通知类型|"success" \| "error" \| "warn" \| "info"|"info"|
|visible|是否显示通知|boolean|false|
|close|控制通知关闭的事件|() =\> void|-|
|onClose|通知关闭时的回调函数|() =\> void|-|
|getContainer|将通知放入某个模块|() =\> HTMLElement|-|
|transitionDuration|动画的执行时间 (单位ms)|number|300|
|duration|通知自动关闭时延 (单位ms) 设置为0时不会自动关闭|number|3000|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层dom元素|HTMLElement|
|updateLayout|更新元素布局|() =\> void|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|info|展示常规通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|success|展示成功通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|error|展示错误的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|warn|展示警告的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|

> NotifyType

```
"success"|"error"|"warn"|"info"
```
