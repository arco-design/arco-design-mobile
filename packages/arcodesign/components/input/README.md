### 数据录入

# 输入框 Input

输入框组件，支持添加前后缀。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|type|输入框类型|string|"text"|
|pattern|检查控件值的正则表达式|string|-|
|inputClass|输入框dom自定义类名|string|-|
|inputStyle|输入框dom自定义样式|CSSProperties|-|
|nativeProps|其他未列出的原生属性，优先级低于已列出的组件属性|InputHTMLAttributes\<HTMLInputElement\>|-|
|ariaLabel|无障碍label|string|-|
|id|输入框的id|string|-|
|name|输入框的name|string|-|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|value|绑定值，传入即受控|string|-|
|defaultValue|默认值|string|-|
|maxLength|最大输入长度|number|-|
|border|边框展示类型|"all" \| "half" \| "bottom" \| "none"|"half"|
|placeholder|占位文本|string|-|
|disabled|输入框是否禁用|boolean|-|
|readOnly|是否只读|boolean|-|
|autoFocus|是否自动获取焦点|boolean|-|
|label|输入框左侧文本|ReactNode|-|
|required|是否必填项|boolean|-|
|validator|正则验证，不符合验证的不允许输入|RegExp \| ((value: string) =\> boolean)|-|
|prepend|输入框头部内容，在输入框外部|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|append|输入框尾部内容，在输入框外部|ReactNode \| ((focusing: boolean, inputValue: string) =\> ReactNode)|-|
|blurBeforeFocus|在聚焦之前blur掉，即切换不同input时会重新弹起键盘，常用于input type切换时重新加载键盘，安卓上有效|boolean|-|
|clearable|是否有清除按钮|boolean|-|
|clearShowType|清除按钮展示时机：focus \- 聚焦时展示 value \- 有值则展示 always \- 始终展示|"focus" \| "value" \| "always"|"focus"|
|preventEventWhenClearing|在聚焦模式下点击清除按钮时，是否要屏蔽对应产生的onBlur和onFocus事件|boolean|true|
|clearIcon|清除按钮类型，也可自定义|ReactNode|\<IconClear className="clear-icon" /\>|
|onClear|按下清除按钮回调|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|prefix|输入框前置内容，在输入框内部，也可自定义|ReactNode|-|
|suffix|输入框后置内容，在输入框内部，也可自定义|ReactNode|-|
|onChange|数据改变时触发（失去焦点时）|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onInput|数据改变时触发|(e: ChangeEvent\<HTMLInputElement\>, value: string) =\> void|-|
|onFocus|输入框聚焦时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onBlur|输入框失去焦点时触发|(e: FocusEvent\<HTMLInputElement, Element\>) =\> void|-|
|onClick|点击输入框事件|(e: MouseEvent\<HTMLInputElement, MouseEvent\>) =\> void|-|
|onKeyUp|原生的keyup事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyDown|原生的keydown事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onKeyPress|原生的keypress事件|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|
|onPressEnter|按下回车键时触发|(e: KeyboardEvent\<HTMLInputElement\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|input|原生输入框 DOM|HTMLInputElement|

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
