### Data Entry

# Textarea 

A multi-line textarea, supports adaptive content height.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|rows|Default number of lines in the text field|number|-|
|autosize|Adaptive content height|boolean|-|
|textareaClass|Custom classname of text field dom|string|-|
|textareaStyle|Custom stylesheet of text field dom|CSSProperties|-|
|cloneNodeWhenAutosize|When autosize=true, whether to calculate the new height through cloneNode|boolean|false|
|showStatistics|Whether to display word count|boolean|true|
|statisticsMaxlength|Maximum input length for word count|number|-|
|statisticsLengthCaculator|Customize word count method|(value: string) =\> number|-|
|onErrStatusChange|Callback when the error state of word count switches, triggered only when the state changes|(hasError: boolean) =\> void|-|
|onErrValueChange|Callback when word count is in error status, triggered when the value changes|(hasError: boolean, currentLength: number, maxLength?: number) =\> void|-|
|renderStatistics|Custom word count content|(currentLength: number, maxLength: number) =\> ReactNode|-|
|nativeProps|Other unlisted native properties, lower priority than listed component properties|TextareaHTMLAttributes\<HTMLTextAreaElement\>|-|
|id|Input id|string|-|
|name|Input name|string|-|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|value|Binding value, if input, the component is controlled|string|-|
|defaultValue|Default value|string|-|
|maxLength|Maximum input length|number|-|
|border|Border display type|"all" \| "half" \| "bottom" \| "none"|"half"|
|placeholder|Placeholder text|string|-|
|disabled|Whether the input box is disabled|boolean|-|
|readOnly|Read\-only|boolean|-|
|autoFocus|Whether to automatically get the focus|boolean|-|
|blockChangeWhenCompositing|When inputting Chinese on ios, onChange is not triggered during pinyin input, but only after confirming the selection|boolean|false|
|label|text to the left of the input box|ReactNode|-|
|required|Whether it is required|boolean|-|
|validator|Regular validation, input is not allowed if it does not meet the validation|RegExp \| ((value: string) =\> boolean)|-|
|prepend|The content of the header of the input box, outside the input box|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|append|The content at the end of the input box, outside the input box|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|blurBeforeFocus|Blur before focusing, that is, the keyboard will be re\-bounced when switching between different inputs\. It is often used to reload the keyboard when the input type is switched\. It is valid on Android\.|boolean|-|
|clearable|whether there is a clear button|boolean|-|
|clearShowType|Clear button display timing: focus \- display when focused, value \- display when there is value, always \- always display|"focus" \| "value" \| "always"|"focus"|
|preventEventWhenClearing|Whether to block the onBlur and onFocus events generated when the clear button is clicked in focus mode|boolean|true|
|clearIcon|Clear button type, also customizable|ReactNode|\<IconClear className="clear-icon" /\>|
|onClear|Callback when clear button is pressed|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|prefix|The prefix of the input box, inside the input box, can also be customized|ReactNode|-|
|suffix|The suffix content of the input box, inside the input box, can also be customized|ReactNode|-|
|onChange|Fired when the data changes (when bluring the focus)|(e: ChangeEvent\<HTMLTextAreaElement\>, value: string) =\> void|-|
|onInput|Callback when data changes|(e: ChangeEvent\<HTMLTextAreaElement\>, value: string) =\> void|-|
|onFocus|Callback when the input box is focused|(e: FocusEvent\<HTMLTextAreaElement, Element\>) =\> void|-|
|onBlur|Callback when the input box is blured|(e: FocusEvent\<HTMLTextAreaElement, Element\>) =\> void|-|
|onClick|Callback when clicking the input box|(e: MouseEvent\<HTMLTextAreaElement, MouseEvent\>) =\> void|-|
|onKeyUp|Native keyup event|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onKeyDown|Native keydown event|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onKeyPress|Native keypress event|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|
|onPressEnter|Callback when the enter key is pressed|(e: KeyboardEvent\<HTMLTextAreaElement\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|textarea|Native textarea DOM|HTMLTextAreaElement|
|resize|Manually resize the input box, it takes effect when autosize=true|() =\> void|
