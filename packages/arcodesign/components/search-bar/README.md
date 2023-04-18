### 数据录入

# 搜索栏 SearchBar

搜索栏组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|shape|输入框形状|"square" \| "round"|"square"|
|textAlign|搜索栏内容位置|"left" \| "center" \| "right"|"left"|
|prepend|搜索栏头部插入的内容|ReactNode \| ((focusing: boolean, value: string) =\> ReactNode)|-|
|append|搜索栏尾部要插入的内容, 默认在搜索栏激活态时会插入一个按钮|ReactNode \| ((focusing: boolean, value: string) =\> ReactNode)|(focusing) => focusing ? (<span>取消</span>) : null|
|actionButton|搜索栏最右侧要插入的按钮，默认情况下插入一个取消按钮|ReactNode|<CancelButton />|
|enableAssociation|是否开启搜索联想框功能|boolean|false|
|associationVisible|（受控模式）搜索联想框的可见态|boolean|-|
|associationShowType|非受控模式下，搜索联想框的展示时机 \- focus 仅聚焦时 \- value 搜索词不为空 \- default 搜索栏被聚焦或者搜索词不为空 \- always 一直展示|"value" \| "focus" \| "default" \| "always"|"default"|
|associationItems|每一项搜索内容|SearchAssociationBaseItem\[\]|-|
|highlightMode|搜索结果高亮模式，可以是内置的两种模式，或者一个自定义的高亮函数(接受选项内容content、搜索关键字keyword、默认的高亮class，返回一个ReactNode) \- prefix 高亮最长前缀匹配字符串 \- contain 高亮所有搜索关键字 \- none 关闭高亮|SearchAssociationHighlightMode|"none"|
|highlightStyle|要为高亮结果添加的样式，仅非自定高亮模式下生效|CSSProperties|-|
|highlightClassName|要为高亮结果添加的class，仅非自定义高亮模式下生效|string|-|
|onCancel|右侧取消按钮的点击回调|() =\> void|-|
|onAssociationItemClick|每行搜索结果的点击回调|(item: SearchAssociationBaseItem, index: number) =\> void|-|
|onAssociationClick|搜索联想框整体被点击的回调|(event: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|renderAssociationItem|自定义渲染每行搜索结果|(item: SearchAssociationBaseItem, index: number, node: ReactNode) =\> ReactNode|-|
|renderAssociation|自定义渲染搜索联想框整体内容|(Content: ReactNode) =\> ReactNode|-|
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
|placeholder|占位文本|string|-|
|disabled|输入框是否禁用|boolean|-|
|readOnly|是否只读|boolean|-|
|autoFocus|是否自动获取焦点|boolean|-|
|blockChangeWhenCompositing|当 ios 输入中文时，输拼音的过程不触发onChange，仅确认选择后触发|boolean|false|
|validator|正则验证，不符合验证的不允许输入|RegExp \| ((value: string) =\> boolean)|-|
|blurBeforeFocus|在聚焦之前blur掉，即切换不同input时会重新弹起键盘，常用于input type切换时重新加载键盘，安卓上有效|boolean|-|
|clearable|是否有清除按钮|boolean|-|
|clearShowType|清除按钮展示时机：focus \- 聚焦时展示 value \- 有值则展示 always \- 始终展示|"value" \| "focus" \| "always"|"focus"|
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
|toggleAssociation|仅非受控模式下生效，手动控制搜索联想框的显隐，如果没有传入值则默认将显隐状态反转|(newVisible?: boolean) =\> void|

> SearchBarShape

```
"square" | "round"
```

> SearchAssociationShowType

```
"value" | "focus" | "default" | "always"
```

> SearchAssociationBaseItem

|参数|描述|类型|
|----------|-------------|------|
|content|基础内容|string|

> SearchAssociationHighlightMode

```
"prefix" | "contain" | "none" | (content: string, keyword: string, defaultHighlightClassName: string) => ReactNode
```
