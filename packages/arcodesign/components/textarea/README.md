### 数据录入

# 多行文本框 Textarea

多行文本输入框组件，支持自适应内容高度。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|rows|文本域默认行数|number|-|
|autosize|自适应内容高度|boolean|-|
|textareaClass|文本域dom自定义类名|string|-|
|textareaStyle|文本域dom自定义样式|CSSProperties|-|
|cloneNodeWhenAutosize|autosize=true 时，是否通过 cloneNode 计算新高度|boolean|false|
|showStatistics|是否展示字数统计|boolean|true|
|statisticsMaxlength|字数统计时的最大输入长度|number|-|
|statisticsLengthCaculator|自定义统计字数方法|(value: string) =\> number|-|
|onErrStatusChange|字数统计错误状态切换回调，仅当状态发生改变时触发|(hasError: boolean) =\> void|-|
|onErrValueChange|字数统计错误状态回调，当值有改变时就会触发|(hasError: boolean, currentLength: number, maxLength?: number) =\> void|-|
|renderStatistics|自定义字数统计内容|(currentLength: number, maxLength: number) =\> ReactNode|-|
|nativeProps|其他未列出的原生属性，优先级低于已列出的组件属性|TextareaHTMLAttributes\<HTMLTextAreaElement\>|-|
|id|输入框的id|string|-|
|name|输入框的name|string|-|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|value|绑定值，传入即受控|string|-|
|defaultValue|默认值|string|-|
|maxLength|最大输入长度|number|-|
|border|边框展示类型|"all" \| "half" \| "bottom" \| "none"|"half"|
|placeholder|占位文本|string|-|
|disabled|输入框是否禁用|boolean|-|
|readOnly|是否只读|boolean|-|
|autoFocus|是否自动获取焦点|boolean|-|
|blockChangeWhenCompositing|当 ios 输入中文时，输拼音的过程不触发onChange，仅确认选择后触发|boolean|false|
|label|输入框左侧文本|ReactNode|-|
|required|是否必填项|boolean|-|
|validator|正则验证，不符合验证的不允许输入|RegExp \| ((value: string) =\> boolean)|-|
|prepend|输入框头部内容，在输入框外部|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|append|输入框尾部内容，在输入框外部|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|blurBeforeFocus|在聚焦之前blur掉，即切换不同input时会重新弹起键盘，常用于input type切换时重新加载键盘，安卓上有效|boolean|-|
|clearable|是否有清除按钮|boolean|-|
|clearShowType|清除按钮展示时机：focus \- 聚焦时展示 value \- 有值则展示 always \- 始终展示|"focus" \| "value" \| "always"|"focus"|
|preventEventWhenClearing|在聚焦模式下点击清除按钮时，是否要屏蔽对应产生的onBlur和onFocus事件|boolean|true|
|clearIcon|清除按钮类型，也可自定义|ReactNode|\<IconClear className="clear-icon" /\>|
|onClear|按下清除按钮回调|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|prefix|输入框前置内容，在输入框内部，也可自定义|ReactNode|-|
|suffix|输入框后置内容，在输入框内部，也可自定义|ReactNode|-|
|onChange|数据改变时触发（失去焦点时）|(e: ChangeEvent\<HTMLTextAreaElement\>, value: string) =\> void|-|
|onInput|数据改变时触发|(e: ChangeEvent\<HTMLTextAreaElement\>, value: string) =\> void|-|
|onFocus|输入框聚焦时触发|(e: FocusEvent\<HTMLTextAreaElement, Element\>) =\> void|-|
|onBlur|输入框失去焦点时触发|(e: FocusEvent\<HTMLTextAreaElement, Element\>) =\> void|-|
|onClick|点击输入框事件|(e: MouseEvent\<HTMLTextAreaElement, MouseEvent\>) =\> void|-|
|onKeyUp|原生的keyup事件|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onKeyDown|原生的keydown事件|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onKeyPress|原生的keypress事件|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onPressEnter|按下回车键时触发|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|textarea|原生文本框 DOM|HTMLTextAreaElement|
|resize|手动 resize 输入框，autosize=true 时生效|() =\> void|
