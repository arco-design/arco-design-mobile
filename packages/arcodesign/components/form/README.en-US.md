### Data Entry

# Form

Form, Form for collecting data input

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|layout|Form item layout|"horizontal" \| "vertical" \| "inline"|-|
|form|Form instance|IFormInstance|-|
|initialValues|Form initial value|Record\<string, any\>|-|
|onValuesChange|Callback when the form item value changes|(changedValues: any, values: any) =\> void|-|
|onSubmit|Callback when the form is submitted|(values: any, otherInfo?: IFieldError\[\]) =\> void|-|
|onSubmitFailed|Callback when the form is submitted failed|(values: any, errorInfo: IFieldError\[\] \| Error) =\> void|-|
|disabled|disable all form items|boolean|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLFormElement|

> Methods

|method|Description|Type|
|----------|-------------|------|
|useForm|-|(form?: IFormInstance) =\> void|

> Form.FormItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|label|The form item name|ReactNode|required|
|style|The form item stylesheet|CSSProperties|-|
|field|Form item field|string|required|
|required|Whether Form item is required|boolean|-|
|disabled|Whether Form item is disabled|boolean|-|
|layout|Form item layout|"horizontal" \| "vertical" \| "inline"|-|
|children|Form item children|Element|required|
|shouldUpdate|Form item is updated|boolean \| IShouldUpdateFunc|-|
|rules|Form item rules|IRules\[\]|-|
|extra|Form item extra node|Element|-|
|trigger|The function name when updating data|string|-|
|requiredIcon|The required icon node|ReactNode|-|
|initialValue|The initial value of form item|any|-|

> ILayout

```
"horizontal"|"vertical"|"inline"
```

> IFormInstance

|Property|Description|Type|
|----------|-------------|------|
|getFieldValue|-|(name: string) =\> any|
|getFieldsValue|-|(name?: string\[\]) =\> Record\<string, any\>|
|resetFields|-|() =\> void|
|setFieldsValue|-|(value: Record\<string, any\>) =\> void|
|validateFields|-|() =\> Promise\<Record\<string, any\>\>|
|submit|-|() =\> void|

> IFieldError

|Property|Description|Type|
|----------|-------------|------|
|value|-|any|
|errors|-|ReactNode\[\]|
|warnings|-|ReactNode\[\]|
|field|-|string|
|dom|-|HTMLDivElement|

> Element

|Property|Description|Type|
|----------|-------------|------|
|type|-|any|
|props|-|any|
|key|-|ReactText|

> IRules

```
ITypeRules<ValidatorType.Number>|
ITypeRules<ValidatorType.String>|
ITypeRules<ValidatorType.Array>|
ITypeRules<ValidatorType.Boolean>|
ITypeRules<ValidatorType.Object>|
ITypeRules<ValidatorType.Custom>
```

> IFormItemRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
