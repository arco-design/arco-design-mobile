### 数据录入

# 单选框 Radio

单选框，可用状态下点击切换选择，支持禁用，支持单选项组。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|选项的文字说明，传入children时此属性无效|string|""|
|value|Checkbox的值|ValueType|必填|
|defaultCheck|默认选中状态|boolean|false|
|checked|是否选中，传值即为受控模式|boolean|-|
|onChange|复选框选中状态回调函数|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|

> Radio.Group

单选项组

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|options|可选项, 传入children后此值无效|(RadioProps\<ValueType\> & RefAttributes\<RadioRef\>)\[\]|-|
|value|受控模式，选中的选项|ValueType|-|
|defaultValue|默认选中项|ValueType|-|
|onChange|单选项组选中状态变化回调函数|(value: ValueType) =\> void|-|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> ValueType

```
string|number
```

> IconType

|参数|描述|类型|
|----------|-------------|------|
|normal|未选中|ReactNode|
|active|选中态|ReactNode|
|disabled|禁用态|ReactNode|
|activeDisabled|禁用选中态|ReactNode|

> RadioProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|label|选项的文字说明，传入children时此属性无效|string|""|
|value|Checkbox的值|ValueType|必填|
|defaultCheck|默认选中状态|boolean|false|
|checked|是否选中，传值即为受控模式|boolean|-|
|onChange|复选框选中状态回调函数|(checked: boolean, value: ValueType, e: MouseEvent\<Element, MouseEvent\>) =\> void|() => {}|
|shape|图标的形状|"circle" \| "square"|'circle'|
|layout|排版样式(内联\|块级\|图标靠右两端对齐)|"inline" \| "block" \| "justify"|'inline'|
|disabled|是否禁用|boolean|false|
|icons|自定义图标合集，传 null 表示无图标|IconType|Default icon|
|isRadio|是否为Radio组件，不推荐使用，仅用于支持Radio组件|boolean|false|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> RadioGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|

> RegExpMatchArray

|参数|描述|类型|
|----------|-------------|------|
|index|-|number|
|input|-|string|
|groups|-|\{ \[key: string\]: string; \}|
|length|Gets or sets the length of the array\. This is a number one higher than the highest element defined in an array\.|number|
|toString|Returns a string representation of an array\.|() =\> string|
|toLocaleString|Returns a string representation of an array\. The elements are converted to string using their toLocalString methods\.|() =\> string|
|pop|Removes the last element from an array and returns it\.|() =\> string|
|push|Appends new elements to an array, and returns the new length of the array\.|(\.\.\.items: string\[\]) =\> number|
|concat|Combines two or more arrays\. Combines two or more arrays\.|\{ (\.\.\.items: ConcatArray\<string\>\[\]): string\[\]; (\.\.\.items: (string \| ConcatArray\<string\>)\[\]): string\[\]; \}|
|join|Adds all the elements of an array separated by the specified separator string\.|(separator?: string) =\> string|
|reverse|Reverses the elements in an Array\.|() =\> string\[\]|
|shift|Removes the first element from an array and returns it\.|() =\> string|
|slice|Returns a section of an array\.|(start?: number, end?: number) =\> string\[\]|
|sort|Sorts an array\.|(compareFn?: (a: string, b: string) =\> number) =\> RegExpMatchArray|
|splice|Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements\. Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements\.|\{ (start: number, deleteCount?: number): string\[\]; (start: number, deleteCount: number, \.\.\.items: string\[\]): string\[\]; \}|
|unshift|Inserts new elements at the start of an array\.|(\.\.\.items: string\[\]) =\> number|
|indexOf|Returns the index of the first occurrence of a value in an array\.|(searchElement: string, fromIndex?: number) =\> number|
|lastIndexOf|Returns the index of the last occurrence of a specified value in an array\.|(searchElement: string, fromIndex?: number) =\> number|
|every|Determines whether all the members of an array satisfy the specified test\.|(callbackfn: (value: string, index: number, array: string\[\]) =\> unknown, thisArg?: any) =\> boolean|
|some|Determines whether the specified callback function returns true for any element of an array\.|(callbackfn: (value: string, index: number, array: string\[\]) =\> unknown, thisArg?: any) =\> boolean|
|forEach|Performs the specified action for each element in an array\.|(callbackfn: (value: string, index: number, array: string\[\]) =\> void, thisArg?: any) =\> void|
|map|Calls a defined callback function on each element of an array, and returns an array that contains the results\.|\<U\>(callbackfn: (value: string, index: number, array: string\[\]) =\> U, thisArg?: any) =\> U\[\]|
|filter|Returns the elements of an array that meet the condition specified in a callback function\. Returns the elements of an array that meet the condition specified in a callback function\.|\{ \<S extends string\>(callbackfn: (value: string, index: number, array: string\[\]) =\> value is S, thisArg?: any): S\[\]; (callbackfn: (value: string, index: number, array: string\[\]) =\> unknown, thisArg?: any): string\[\]; \}|
|reduce|Calls the specified callback function for all the elements in an array\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\. Calls the specified callback function for all the elements in an array\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\.|\{ (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string\[\]) =\> string): string; (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string\[\]) =\> string, initialValue: string): string; \<U\>(callbackfn: (previousValue: U, currentValue: string, \.\.\.|
|reduceRight|Calls the specified callback function for all the elements in an array, in descending order\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\. Calls the specified callback function for all the elements in an array, in descending order\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\.|\{ (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string\[\]) =\> string): string; (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string\[\]) =\> string, initialValue: string): string; \<U\>(callbackfn: (previousValue: U, currentValue: string, \.\.\.|
|find|Returns the value of the first element in the array where predicate is true, and undefined otherwise\.|\{ \<S extends string\>(predicate: (this: void, value: string, index: number, obj: string\[\]) =\> value is S, thisArg?: any): S; (predicate: (value: string, index: number, obj: string\[\]) =\> unknown, thisArg?: any): string; \}|
|findIndex|Returns the index of the first element in the array where predicate is true, and \-1 otherwise\.|(predicate: (value: string, index: number, obj: string\[\]) =\> unknown, thisArg?: any) =\> number|
|fill|Returns the this object after filling the section identified by start and end with value|(value: string, start?: number, end?: number) =\> RegExpMatchArray|
|copyWithin|Returns the this object after copying a section of the array identified by start and end to the same array starting at position target|(target: number, start: number, end?: number) =\> RegExpMatchArray|
|entries|Returns an iterable of key, value pairs for every entry in the array|() =\> IterableIterator\<\[number, string\]\>|
|keys|Returns an iterable of keys in the array|() =\> IterableIterator\<number\>|
|values|Returns an iterable of values in the array|() =\> IterableIterator\<string\>|
|includes|Determines whether an array includes a certain element, returning true or false as appropriate\.|(searchElement: string, fromIndex?: number) =\> boolean|
|flatMap|Calls a defined callback function on each element of an array\. Then, flattens the result into a new array\. This is identical to a map followed by flat with depth 1\.|\<U, This = undefined\>(callback: (this: This, value: string, index: number, array: string\[\]) =\> U \| readonly U\[\], thisArg?: This) =\> U\[\]|
|flat|Returns a new array with all sub\-array elements concatenated into it recursively up to the specified depth\.|\<A, D extends number = 1\>(this: A, depth?: D) =\> FlatArray\<A, D\>\[\]|
|at|Takes an integer value and returns the item at that index, allowing for positive and negative integers\. Negative integers count back from the last item in the array\.|(index: number) =\> string|

> ConcatArray

|参数|描述|类型|
|----------|-------------|------|
|length|-|number|
|join|-|(separator?: string) =\> string|
|slice|-|(start?: number, end?: number) =\> T\[\]|

> IterableIterator

|参数|描述|类型|
|----------|-------------|------|
|next|-|(\.\.\.args: \[\] \| \[undefined\]) =\> IteratorResult\<T, any\>|
|return|-|(value?: any) =\> IteratorResult\<T, any\>|
|throw|-|(e?: any) =\> IteratorResult\<T, any\>|

> IteratorResult

```
IteratorYieldResult<string>|IteratorReturnResult<any>
```

> ReadonlyArray

|参数|描述|类型|
|----------|-------------|------|
|length|Gets the length of the array\. This is a number one higher than the highest element defined in an array\.|number|
|toString|Returns a string representation of an array\.|() =\> string|
|toLocaleString|Returns a string representation of an array\. The elements are converted to string using their toLocalString methods\.|() =\> string|
|concat|Combines two or more arrays\. Combines two or more arrays\.|\{ (\.\.\.items: ConcatArray\<T\>\[\]): T\[\]; (\.\.\.items: (T \| ConcatArray\<T\>)\[\]): T\[\]; \}|
|join|Adds all the elements of an array separated by the specified separator string\.|(separator?: string) =\> string|
|slice|Returns a section of an array\.|(start?: number, end?: number) =\> T\[\]|
|indexOf|Returns the index of the first occurrence of a value in an array\.|(searchElement: T, fromIndex?: number) =\> number|
|lastIndexOf|Returns the index of the last occurrence of a specified value in an array\.|(searchElement: T, fromIndex?: number) =\> number|
|every|Determines whether all the members of an array satisfy the specified test\.|(callbackfn: (value: T, index: number, array: readonly T\[\]) =\> unknown, thisArg?: any) =\> boolean|
|some|Determines whether the specified callback function returns true for any element of an array\.|(callbackfn: (value: T, index: number, array: readonly T\[\]) =\> unknown, thisArg?: any) =\> boolean|
|forEach|Performs the specified action for each element in an array\.|(callbackfn: (value: T, index: number, array: readonly T\[\]) =\> void, thisArg?: any) =\> void|
|map|Calls a defined callback function on each element of an array, and returns an array that contains the results\.|\<U\>(callbackfn: (value: T, index: number, array: readonly T\[\]) =\> U, thisArg?: any) =\> U\[\]|
|filter|Returns the elements of an array that meet the condition specified in a callback function\. Returns the elements of an array that meet the condition specified in a callback function\.|\{ \<S extends T\>(callbackfn: (value: T, index: number, array: readonly T\[\]) =\> value is S, thisArg?: any): S\[\]; (callbackfn: (value: T, index: number, array: readonly T\[\]) =\> unknown, thisArg?: any): T\[\]; \}|
|reduce|Calls the specified callback function for all the elements in an array\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\. Calls the specified callback function for all the elements in an array\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\.|\{ (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T\[\]) =\> T): T; (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T\[\]) =\> T, initialValue: T): T; \<U\>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T\[\])\.\.\.|
|reduceRight|Calls the specified callback function for all the elements in an array, in descending order\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\. Calls the specified callback function for all the elements in an array, in descending order\. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function\.|\{ (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T\[\]) =\> T): T; (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T\[\]) =\> T, initialValue: T): T; \<U\>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T\[\])\.\.\.|
|find|Returns the value of the first element in the array where predicate is true, and undefined otherwise\.|\{ \<S extends T\>(predicate: (this: void, value: T, index: number, obj: readonly T\[\]) =\> value is S, thisArg?: any): S; (predicate: (value: T, index: number, obj: readonly T\[\]) =\> unknown, thisArg?: any): T; \}|
|findIndex|Returns the index of the first element in the array where predicate is true, and \-1 otherwise\.|(predicate: (value: T, index: number, obj: readonly T\[\]) =\> unknown, thisArg?: any) =\> number|
|entries|Returns an iterable of key, value pairs for every entry in the array|() =\> IterableIterator\<\[number, T\]\>|
|keys|Returns an iterable of keys in the array|() =\> IterableIterator\<number\>|
|values|Returns an iterable of values in the array|() =\> IterableIterator\<T\>|
|includes|Determines whether an array includes a certain element, returning true or false as appropriate\.|(searchElement: T, fromIndex?: number) =\> boolean|
|flatMap|Calls a defined callback function on each element of an array\. Then, flattens the result into a new array\. This is identical to a map followed by flat with depth 1\.|\<U, This = undefined\>(callback: (this: This, value: T, index: number, array: T\[\]) =\> U \| readonly U\[\], thisArg?: This) =\> U\[\]|
|flat|Returns a new array with all sub\-array elements concatenated into it recursively up to the specified depth\.|\<A, D extends number = 1\>(this: A, depth?: D) =\> FlatArray\<A, D\>\[\]|
