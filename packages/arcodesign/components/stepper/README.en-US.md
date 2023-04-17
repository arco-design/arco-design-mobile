### Data Entry

# Stepper 

Stepper component, provide controlled mode

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|inputStyle|Input stylesheet|CSSProperties|-|
|inputClass|Input class|string|-|
|value|Bundled value (Controlled)|number|-|
|defaultValue|Default value|number|1|
|allowEmpty|Whether the content is allowed to be empty|boolean|false|
|digits|Formatted to a decimal point after a fixed number of digits, set to 0 indicates formatting to an integer|number|0|
|disabled|Whether to disable the stepper|boolean|false|
|inputReadonly|Input read only status|boolean|false|
|max|Max value|number|Infinity|
|min|Min value|number|1|
|equalLimitDisabled|If an operation is allowed to be greater more/less than the limit value, the result of the operation is equal to the limit value|boolean|-|
|step|Incremental/Impairment value|number|1|
|theme|Border style|"square" \| "round" \| "default"|"default"|
|formatter|Format the inner value|(innerValue: number) =\> number \| Promise\<number\>|-|
|addButton|Add button|ReactNode|-|
|minusButton|Delete button|ReactNode|-|
|renderContent|The function of customizing the input|(innerValue: number) =\> ReactNode|-|
|onBlur|Triggers when the input loses focus|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onChange|Triggers when the data change|(value: number) =\> void|-|
|onFocus|Triggers when the input gets focus|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onAddButtonClick|Triggers when the add button is clicked|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onMinusButtonClick|Triggers when the minus button is clicked|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClick|Triggers when the most out dom is clicked|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onInput|Triggers when the input is inputting|(e: ChangeEvent\<Element\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The most out element dom|HTMLDivElement|
|input|Input dom|HTMLInputElement|
|changeValue|The function of changing inner value|(newValue: number) =\> void|
