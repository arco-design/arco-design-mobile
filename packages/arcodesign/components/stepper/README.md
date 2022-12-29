### 数据录入

# 步进器 Stepper

步进器组件，支持受控模式

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|inputStyle|input样式|CSSProperties|-|
|inputClass|input类名|string|-|
|value|绑定值，传入即受控|number|-|
|defaultValue|默认值|number|1|
|allowEmpty|是否允许内容为空|boolean|false|
|digits|格式化到小数点后固定位数，设置为 0 表示格式化到整数|number|0|
|disabled|是否禁用步进器|boolean|false|
|inputReadonly|输入框只读状态|boolean|false|
|max|最大值|number|Infinity|
|min|最小值|number|1|
|equalLimitDisabled|是否允许操作大于/小于极限值时，操作结果等于极限值|boolean|-|
|step|递增/减值|number|1|
|theme|边框风格|"square" \| "round" \| "default"|"default"|
|formatter|格式化内部值（优先级最高）|(innerValue: number) =\> number \| Promise\<number\>|-|
|addButton|增加按钮|ReactNode|-|
|minusButton|删除按钮|ReactNode|-|
|renderContent|自定义输入框函数|(innerValue: number) =\> ReactNode|-|
|onBlur|输入框失去焦点时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onChange|数据变化时的触发|(value: number) =\> void|-|
|onFocus|输入框获得焦点时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onAddButtonClick|点击增加按钮时触发|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onMinusButtonClick|点击减少按钮时触发|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClick|点击最外侧dom时触发|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onInput|输入框输入时触发|(e: ChangeEvent\<Element\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|input|输入框 DOM|HTMLInputElement|
|changeValue|改变内部值的方法|(newValue: number) =\> void|
