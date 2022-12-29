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
|dom|最外层元素 DOM|HTMLFormElement|

> Methods

|method|Description|Type|
|----------|-------------|------|
|useForm|-|(form?: IFormInstance) =\> void|

> Form.FormItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|label|-|ReactNode|required|
|style|-|CSSProperties|-|
|field|-|string|required|
|required|-|boolean|-|
|disabled|-|boolean|-|
|layout|-|"horizontal" \| "vertical" \| "inline"|-|
|shouldUpdate|-|boolean \| IShouldUpdateFunc|-|
|rules|-|IRules\[\]|-|
|extra|-|Element|required|
|trigger|-|string|-|
|requiredIcon|-|ReactNode|required|
|initialValue|-|any|-|

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

> IRules

```
ITypeRules<ValidatorType.Number>|ITypeRules<ValidatorType.String>|ITypeRules<ValidatorType.Array>|ITypeRules<ValidatorType.Boolean>|ITypeRules<ValidatorType.Object>|ITypeRules<ValidatorType.Custom>
```

> Element

|Property|Description|Type|
|----------|-------------|------|
|type|-|any|
|props|-|any|
|key|-|ReactText|
