### Data Entry

# SearchBar 

SearchBar component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|shape|input box shape|"square" \| "round"|"square"|
|textAlign|Search bar content location|"left" \| "center" \| "right"|"left"|
|prepend|Content inserted in the header of the search box|ReactNode \| ((focusing: boolean, value: string) =\> ReactNode)|-|
|append|The content to be inserted at the end of the search box, a button will be inserted by default when the search box is activated|ReactNode \| ((focusing: boolean, value: string) =\> ReactNode)|(focusing) => focusing ? (<span>取消</span>) : null|
|actionButton|The button to insert on the far right side of the search box, a cancel button is inserted by default|ReactNode|<CancelButton />|
|enableAssociation|Whether to enable the search association box function|boolean|false|
|associationVisible|(Controlled mode) Visible state of search association box|boolean|-|
|associationShowType|In uncontrolled mode, the display timing of the search association box \- "focus" only when focused \- "value" search term is not empty \- "default" search bar is focused or search term is not empty \- "always" always displayed|"value" \| "focus" \| "default" \| "always"|"default"|
|associationItems|every search|SearchAssociationBaseItem\[\]|-|
|highlightMode|Search result highlighting mode, which can be two built\-in modes, or a custom highlighting function(Accept option content content, search keyword keyword, default highlight class, return a ReactNode) \- "prefix" to highlight the longest prefix matching string \- "contain" to highlight all search keywords \- "none" to turn off highlighting|SearchAssociationHighlightMode|"none"|
|highlightStyle|The style to be added to the highlighted result, only available in non\-custom highlight mode|CSSProperties|-|
|highlightClassName|The class to be added to the highlighting result, only valid in non\-custom highlighting mode|string|-|
|onCancel|Right cancel button click callback|() =\> void|-|
|onAssociationItemClick|Click callback for each row of search results|(item: SearchAssociationBaseItem, index: number) =\> void|-|
|onAssociationClick|The callback for the overall click of the search association box|(event: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|renderAssociationItem|Custom rendering of each row of search results|(item: SearchAssociationBaseItem, index: number, node: ReactNode) =\> ReactNode|-|
|renderAssociation|Customize the rendering of the overall content of the search association box|(Content: ReactNode) =\> ReactNode|-|
|type|Input box type|string|"text"|
|pattern|Regular expression to check the value of input box|string|-|
|inputClass|Custom classname for input DOM|string|-|
|inputStyle|Custom style for input DOM|CSSProperties|-|
|nativeProps|Other unlisted native properties have lower priority than listed component properties|InputHTMLAttributes\<HTMLInputElement\>|-|
|ariaLabel|accessible label|string|-|
|id|Input id|string|-|
|name|Input name|string|-|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|value|Binding value, if input, the component is controlled|string|-|
|defaultValue|Default value|string|-|
|maxLength|Maximum input length|number|-|
|placeholder|Placeholder text|string|-|
|disabled|Whether the input box is disabled|boolean|-|
|readOnly|Read\-only|boolean|-|
|autoFocus|Whether to automatically get the focus|boolean|-|
|blockChangeWhenCompositing|When inputting Chinese on ios, onChange is not triggered during pinyin input, but only after confirming the selection|boolean|false|
|validator|Regular validation, input is not allowed if it does not meet the validation|RegExp \| ((value: string) =\> boolean)|-|
|blurBeforeFocus|Blur before focusing, that is, the keyboard will be re\-bounced when switching between different inputs\. It is often used to reload the keyboard when the input type is switched\. It is valid on Android\.|boolean|-|
|clearable|whether there is a clear button|boolean|-|
|clearShowType|Clear button display timing: focus \- display when focused, value \- display when there is value, always \- always display|"value" \| "focus" \| "always"|"focus"|
|preventEventWhenClearing|Whether to block the onBlur and onFocus events generated when the clear button is clicked in focus mode|boolean|true|
|clearIcon|Clear button type, also customizable|ReactNode|\<IconClear className="clear-icon" /\>|
|onClear|Callback when clear button is pressed|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|prefix|The prefix of the input box, inside the input box, can also be customized|ReactNode|-|
|suffix|The suffix content of the input box, inside the input box, can also be customized|ReactNode|-|
|onChange|Fired when the data changes (when bluring the focus)|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onInput|Callback when data changes|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onFocus|Callback when the input box is focused|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onBlur|Callback when the input box is blured|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onClick|Callback when clicking the input box|(e: MouseEvent\<HTMLInputElement, MouseEvent\>) =\> void|-|
|onKeyUp|Native keyup event|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyDown|Native keydown event|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyPress|Native keypress event|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onPressEnter|Callback when the enter key is pressed|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|input|Native input box DOM|HTMLInputElement|
|toggleAssociation|It only takes effect in uncontrolled mode\. Manually control the display and hide of the search association box\. If there is no incoming value, the display and hidden state will be reversed by default\.|(newVisible?: boolean) =\> void|

> SearchBarShape

```
"square" | "round"
```

> SearchAssociationShowType

```
"value" | "focus" | "default" | "always"
```

> SearchAssociationBaseItem

|Property|Description|Type|
|----------|-------------|------|
|content|basic content|string|

> SearchAssociationHighlightMode

```
"prefix" | "contain" | "none" | (content: string, keyword: string, defaultHighlightClassName: string) => ReactNode
```
