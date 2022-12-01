# Form



======

> 属性/Props

|参数|描述|类型|默认值|
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

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLFormElement|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|useForm|-|(form?: IFormInstance) =\> void|

> Form.FormItem

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|-|ReactNode|必填|
|style|-|CSSProperties|-|
|field|-|string|必填|
|required|-|boolean|-|
|disabled|-|boolean|-|
|layout|-|"horizontal" \| "vertical" \| "inline"|-|
|shouldUpdate|-|boolean \| IShouldUpdateFunc|-|
|rules|-|IRules\[\]|-|
|extra|-|Element|必填|
|trigger|-|string|-|
|requiredIcon|-|ReactNode|必填|
|initialValue|-|any|-|

> ILayout

```
"horizontal"|"vertical"|"inline"
```

> IFormInstance

|参数|描述|类型|
|----------|-------------|------|
|getFieldValue|-|(name: string) =\> any|
|getFieldsValue|-|(name?: string\[\]) =\> Record\<string, any\>|
|resetFields|-|() =\> void|
|setFieldsValue|-|(value: Record\<string, any\>) =\> void|
|validateFields|-|() =\> Promise\<Record\<string, any\>\>|
|submit|-|() =\> void|

> IFieldError

|参数|描述|类型|
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

|参数|描述|类型|
|----------|-------------|------|
|type|-|any|
|props|-|any|
|key|-|ReactText|
