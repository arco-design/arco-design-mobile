### 数据录入

# 表单 Form

表单组件用于集合数据录入

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|layout|表单项布局|"horizontal" \| "vertical" \| "inline"|-|
|form|表单实例|IFormInstance|-|
|initialValues|表单初始数据|Record\<string, any\>|-|
|onValuesChange|表单项数据变化时的回调|(changedValues: any, values: any) =\> void|-|
|onSubmit|表单项数据变化时的回调|(values: any, otherInfo?: IFieldError\[\]) =\> void|-|
|onSubmitFailed|表单项数据变化时的回调|(values: any, errorInfo: IFieldError\[\] \| Error) =\> void|-|
|disabled|表单禁止输入|boolean|-|

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
