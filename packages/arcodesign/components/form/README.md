### 数据录入

# 表单 Form

表单组件用于集合数据录入

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|layout|表单项布局|"horizontal" \| "vertical" \| "inline"|"horizontal"|
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
|form|Form对象实例|IFormInstance|

> Form.Item

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|表单项名|ReactNode|必填|
|style|表单项Stylesheet|CSSProperties|-|
|className|表单项样式|string|-|
|field|表单项字段|string|必填|
|required|表单项是否必填|boolean|-|
|disabled|表单项是否禁用|boolean|-|
|layout|表单项布局|"horizontal" \| "vertical" \| "inline"|"horizontal"|
|children|表单项子节点|Element|必填|
|shouldUpdate|表单项是否刷新|boolean \| IShouldUpdateFunc|-|
|rules|表单项规则|IRules\[\]|-|
|extra|表单项下方节点|Element|-|
|trigger|触发事件更新事件名称|string|"onChange"|
|requiredIcon|自定义必填标识|ReactNode|-|
|initialValue|表单项初始数据|any|-|
|displayType|手动指定为内置组件的类型|"Input" \| "Textarea" \| "Checkbox" \| "CheckboxGroup" \| "DatePicker" \| "Picker" \| "Radio" \| "RadioGroup" \| "Slider" \| "Switch" \| "ImagePicker" \| "Rate" \| "Stepper"|-|

> IFormInstance

|参数|描述|类型|
|----------|-------------|------|
|getFieldValue|获取单个表单项值|(name: string) =\> any|
|getFieldsValue|获取多个表单项值|(name?: string\[\]) =\> Record\<string, any\>|
|getFieldError|获取单个表单项的错误|(name: string) =\> ReactNode\[\]|
|resetFields|重置表单项|() =\> void|
|setFieldValue|设置单个表单项值|(name: string, value: any) =\> boolean|
|setFieldsValue|设置多个表单项值|(value: Record\<string, any\>) =\> void|
|validateFields|校验所有表单项|() =\> Promise\<Record\<string, any\>\>|
|submit|提交表单|() =\> void|

> IFieldError

|参数|描述|类型|
|----------|-------------|------|
|value|-|any|
|errors|-|ReactNode\[\]|
|warnings|-|ReactNode\[\]|
|field|-|string|
|dom|-|HTMLDivElement|

> Element

|参数|描述|类型|
|----------|-------------|------|
|type|-|any|
|props|-|any|
|key|-|ReactText|

> IRules

```
ITypeRules<ValidatorType.Number> | ITypeRules<ValidatorType.String> | ITypeRules<ValidatorType.Array> | ITypeRules<ValidatorType.Boolean> | ITypeRules<ValidatorType.Object> | ITypeRules<ValidatorType.Custom>
```

> FormInternalComponentType

```
"Input" | "Textarea" | "Checkbox" | "CheckboxGroup" | "DatePicker" | "Picker" | "Radio" | "RadioGroup" | "Slider" | "Switch" | "ImagePicker" | "Rate" | "Stepper"
```

> FormItemRef

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
