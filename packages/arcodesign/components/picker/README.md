### 数据录入

# 选择器 Picker

选择器组件，形式是弹起的浮层。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|data|数据源，非级联时data数组的长度决定picker列数，级联时以cols决定 pick列数|PickerData\[\] \| PickerData\[\]\[\] \| ValueType\[\]\[\]|必填|
|cascade|是否联动|boolean|true|
|cols|列数(最大为5；cascade=true时才使用)|number|3|
|rows|行数(一列可选项的行数)，必须是奇数，最小为3个|number|5|
|disabled|是否不可用|boolean|false|
|value|值, 格式是\[value1, value2, value3\], 对应数据源的相应级层value，如果不传默认选每一列的第一个值|ValueType\[\]|-|
|onHide|点击遮罩层或取消、确定按钮的隐藏回调|(scene?: string) =\> void|-|
|onChange|选中后的回调|(selectedValue: ValueType\[\]) =\> void|-|
|onPickerChange|每列数据选择变化后的回调函数|(value: ValueType\[\], index: number) =\> void|-|
|itemStyle|每列样式|CSSProperties|-|
|visible|是否展示选择器|boolean|false|
|okText|弹窗确认已选值的文案|string|"确定"|
|dismissText|弹窗取消的文案|string|"取消"|
|onOk|点击选中时执行的回调|(value: ValueType\[\]) =\> void|-|
|onDismiss|点击取消时执行的回调|() =\> void|-|
|clickable|是否可通过点击操作选择内容|boolean|true|
|hideEmptyCols|是否隐藏无数据的空列，常用于级联选择|boolean|false|
|title|选择器标题|string|""|
|maskClosable|点击蒙层是否关闭菜单|boolean|false|
|touchToStop|是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥|number \| boolean|false|
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|true|
|needBottomOffset|从底部滑出的菜单内容是否适配ipx底部|boolean|false|
|translateZ|\[即将废弃\] 开启translateZ强制提升|boolean|false|
|maskTransitionTimeout|菜单蒙层动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|菜单内容动画时长|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|内容过渡动画类名|string|\`slide-from-${props.direction}\`|
|className|自定义类名|string|-|
|maskClass|自定义蒙层类名|string|-|
|maskStyle|自定义蒙层样式|CSSProperties|-|
|contentClass|自定义内容类名|string|-|
|contentStyle|自定义内容样式|CSSProperties|-|
|maskTransitionType|蒙层过渡动画类名|string|"fade"|
|animatingClosable|执行进场动画时点击蒙层是否可关闭菜单|boolean|false|
|mountOnEnter|是否在打开菜单时再加载内容|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
|preventBodyScroll|弹窗打开时是否禁止body的滚动|boolean|true|
|initialBodyOverflow|页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|getCellMovingStatus|每一列的滑动状态|() =\> PickerCellMovingStatus\[\]|
|updateLayout|手动更新元素布局|() =\> void|
|getAllColumnValues|获取所有列的值|() =\> ValueType\[\]|
|getColumnValue|获取第 n 列的值|(index: number) =\> ValueType|
|scrollToCurrentIndex|直接跳到当前最近一行（调用时将中断滚动）|() =\> void|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|charAt|Returns the character at the specified index\.|(pos: ) =\> void|
|charCodeAt|Returns the Unicode value of the character at the specified location\.|(index: ) =\> void|
|concat|Returns a string that contains the concatenation of two or more strings\.|(strings: ) =\> void|
|indexOf|Returns the position of the first occurrence of a substring\.|(searchString: , position: ) =\> void|
|lastIndexOf|Returns the last occurrence of a substring in the string\.|(searchString: , position: ) =\> void|
|localeCompare|Determines whether two strings are equivalent in the current locale\. Determines whether two strings are equivalent in the current or specified locale\.|(that: ) =\> void|
|match|Matches a string with a regular expression, and returns an array containing the results of that search\. Matches a string or an object that supports being matched against, and returns an array containing the results of that search, or null if no matches are found\.|(regexp: ) =\> void|
|replace|Replaces text in a string, using a regular expression or search string\. Replaces text in a string, using a regular expression or search string\. Replaces text in a string, using an object that supports replacement within a string\. Replaces text in a string, using an object that supports replacement within a string\.|(searchValue: , replaceValue: ) =\> void|
|search|Finds the first substring match in a regular expression search\. Finds the first substring match in a regular expression search\.|(regexp: ) =\> void|
|slice|Returns a section of a string\.|(start: , end: ) =\> void|
|split|Split a string into substrings using the specified separator and return them as an array\. Split a string into substrings using the specified separator and return them as an array\.|(separator: , limit: ) =\> void|
|substring|Returns the substring at the specified location within a String object\.|(start: , end: ) =\> void|
|toLowerCase|Converts all the alphabetic characters in a string to lowercase\.|() =\> void|
|toLocaleLowerCase|Converts all alphabetic characters to lowercase, taking into account the host environment's current locale\.|(locales?: string \| string\[\]) =\> void|
|toUpperCase|Converts all the alphabetic characters in a string to uppercase\.|() =\> void|
|toLocaleUpperCase|Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale\.|(locales?: string \| string\[\]) =\> void|
|trim|Removes the leading and trailing white space and line terminator characters from a string\.|() =\> void|
|substr|Gets a substring beginning at the specified location and having the specified length\.|(from: , length: ) =\> void|
|codePointAt|Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point value of the UTF\-16 encoded code point starting at the string element at position pos in the String resulting from converting this object to a String\. If there is no element at that position, the result is undefined\. If a valid UTF\-16 surrogate pair does not begin at pos, the result is the code unit at pos\.|(pos: number) =\> void|
|includes|Returns true if searchString appears as a substring of the result of converting this object to a String, at one or more positions that are greater than or equal to position; otherwise, returns false\.|(searchString: , position: ) =\> void|
|endsWith|Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at endPosition – length(this)\. Otherwise returns false\.|(searchString: string, endPosition?: number) =\> void|
|normalize|Returns the String value result of normalizing the string into the normalization form named by form as specified in Unicode Standard Annex \#15, Unicode Normalization Forms\. Returns the String value result of normalizing the string into the normalization form named by form as specified in Unicode Standard Annex \#15, Unicode Normalization Forms\.|(form: ) =\> void|
|repeat|Returns a String value that is made from count copies appended together\. If count is 0, the empty string is returned\.|(count: ) =\> void|
|startsWith|Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at position\. Otherwise returns false\.|(searchString: string, position?: number) =\> void|
|anchor|Returns an \<a\> HTML anchor element and sets the name attribute to the text value|(name: ) =\> void|
|big|Returns a \<big\> HTML element|() =\> void|
|blink|Returns a \<blink\> HTML element|() =\> void|
|bold|Returns a \<b\> HTML element|() =\> void|
|fixed|Returns a \<tt\> HTML element|() =\> void|
|fontcolor|Returns a \<font\> HTML element and sets the color attribute value|(color: string) =\> void|
|fontsize|Returns a \<font\> HTML element and sets the size attribute value Returns a \<font\> HTML element and sets the size attribute value|(size: number) =\> void|
|italics|Returns an \<i\> HTML element|() =\> void|
|link|Returns an \<a\> HTML element and sets the href attribute value|(url: string) =\> void|
|small|Returns a \<small\> HTML element|() =\> void|
|strike|Returns a \<strike\> HTML element|() =\> void|
|sub|Returns a \<sub\> HTML element|() =\> void|
|sup|Returns a \<sup\> HTML element|() =\> void|
|__@iterator|Iterator|() =\> void|
|padStart|Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length\. The padding is applied from the start (left) of the current string\.|(maxLength: , fillString: ) =\> void|
|padEnd|Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length\. The padding is applied from the end (right) of the current string\.|(maxLength: , fillString: ) =\> void|
|trimEnd|Removes the trailing white space and line terminator characters from a string\.|() =\> void|
|trimStart|Removes the leading white space and line terminator characters from a string\.|() =\> void|
|trimLeft|Removes the leading white space and line terminator characters from a string\.|() =\> void|
|trimRight|Removes the trailing white space and line terminator characters from a string\.|() =\> void|
|matchAll|Matches a string with a regular expression, and returns an iterable of matches containing the results of that search\.|(regexp: ) =\> void|
|replaceAll|Replace all instances of a substring in a string, using a regular expression or search string\. Replace all instances of a substring in a string, using a regular expression or search string\.|(searchValue: , replaceValue: ) =\> void|
|at|Takes an integer value and returns the item at that index, allowing for positive and negative integers\. Negative integers count back from the last item in the array\.|(index: number) =\> void|

> PickerData

|参数|描述|类型|
|----------|-------------|------|
|value|每一列展示的每项文案对应的值|ValueType|
|label|每一列展示的文案|ReactNode|
|children|级联状态下，该列对应的下一列数据|PickerData\[\]|

> ValueType

```
string|number
```

> PickerCellMovingStatus

```
"normal"|"moving"|"scrolling"
```

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
