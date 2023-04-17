### 数据录入

# 输入框 Input

输入框组件，支持添加前后缀。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|type|输入框类型|string|"text"|
|pattern|检查控件值的正则表达式|string|-|
|inputClass|输入框dom自定义类名|string|-|
|inputStyle|输入框dom自定义样式|CSSProperties|-|
|nativeProps|其他未列出的原生属性，优先级低于已列出的组件属性|InputHTMLAttributes\<HTMLInputElement\>|-|
|ariaLabel|无障碍label|string|-|
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
|onChange|数据改变时触发（失去焦点时）|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onInput|数据改变时触发|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onFocus|输入框聚焦时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onBlur|输入框失去焦点时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onClick|点击输入框事件|(e: MouseEvent\<HTMLInputElement, MouseEvent\>) =\> void|-|
|onKeyUp|原生的keyup事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyDown|原生的keydown事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyPress|原生的keypress事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onPressEnter|按下回车键时触发|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|input|原生输入框 DOM|HTMLInputElement|
