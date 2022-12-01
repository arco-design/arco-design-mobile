# 



======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|layout|-|"horizontal" \| "vertical" \| "inline"|-|
|form|-|IFormInstance|-|
|initialValues|-|Record\<string, any\>|-|
|onValuesChange|-|(changedValues: any, values: any) =\> void|-|
|onSubmit|-|(values: any, otherInfo?: IFieldError\[\]) =\> void|-|
|onSubmitFailed|-|(values: any, errorInfo: IFieldError\[\] \| Error) =\> void|-|
|disabled|-|boolean|-|

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
