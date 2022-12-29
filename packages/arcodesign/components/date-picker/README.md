### 数据录入

# 日期时间选择器 DatePicker

日期时间选择器，基于`Picker`组件扩展，支持指定范围，单位可精确到秒。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|onOk|点击选中时执行的回调|(timestamp: number, obj: IDateObj) =\> void|-|
|currentTs|当前选中的时间，timestamp|number|Date.now()|
|onChange|选中后的回调|(timestamp: number, obj: IDateObj) =\> void|-|
|onValueChange|每列数据选择变化后的回调函数|(timestamp: number, obj: IDateObj, index: number) =\> void|-|
|mode|可选列类型，date \- 年月日，time \- 时分秒，datetime \- 年月日时分秒|"date" \| "time" \| "datetime"|"datetime"|
|typeArr|可选列数组|ItemType\[\]|[]|
|minTs|最小可选日期，timestamp|number|当前时间的前十年|
|maxTs|最大可选日期，timestamp|number|当前时间的后十年|
|useUTC|是否使用 UTC 时间|boolean|false|
|formatter|各可选项展示的格式化方法，参数type为ItemTypes，参数value为当前行的值，返回展示的文字|(value: number, type: ItemType) =\> string|(value: number) => (value < 10 ? \`0${value}\` : String(value))|
|valueFilter|可选择行过滤方法，参数type为ItemType，参数value为当前行的值，返回true表示该行可选择|(type: ItemType, value: number) =\> boolean|() => true|
|columnsProcessor|选择器列表项干预，可插入自定义选项|(columns: PickerData\[\]\[\], currentDateObj: IDateObj) =\> PickerData\[\]\[\]|-|
|visible|是否展示选择器|boolean|false|
|maskClosable|点击蒙层是否关闭菜单|boolean|false|
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
|gestureOutOfControl|是否禁用滚动容器手势判断，禁用后交给业务方自己判断|boolean|true|
|onClose|关闭后回调（动画执行完毕）|(scene?: string) =\> void|-|
|onOpen|打开后回调（动画执行完毕）|() =\> void|-|
|onMaskClick|点击蒙层回调，maskClosable=false时也会触发|() =\> void|-|
|onTouchMove|弹窗的touchmove回调|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|非滚动区域或滚动到顶部及底部时的触摸事件回调|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|rows|行数(一列可选项的行数)，必须是奇数，最小为3个|number|5|
|disabled|是否不可用|boolean|false|
|onHide|点击遮罩层或取消、确定按钮的隐藏回调|(scene?: string) =\> void|-|
|itemStyle|每列样式|CSSProperties|-|
|okText|弹窗确认已选值的文案|string|"确定"|
|dismissText|弹窗取消的文案|string|"取消"|
|onDismiss|点击取消时执行的回调|() =\> void|-|
|clickable|是否可通过点击操作选择内容|boolean|true|
|hideEmptyCols|是否隐藏无数据的空列，常用于级联选择|boolean|false|
|title|选择器标题|string|""|
|touchToStop|是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥|number \| boolean|false|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|charAt|Returns the character at the specified index\.|(pos: ) =\> void|
|charCodeAt|Returns the Unicode value of the character at the specified location\.|(index: ) =\> void|
|concat|Returns a string that contains the concatenation of two or more strings\.|(strings: ) =\> void|
|indexOf|Returns the position of the first occurrence of a substring\.|(searchString: , position: ) =\> void|
|lastIndexOf|Returns the last occurrence of a substring in the string\.|(searchString: , position: ) =\> void|
|localeCompare|Determines whether two strings are equivalent in the current locale\. Determines whether two strings are equivalent in the current or specified locale\.|(that: ) =\> void|
|match|Matches a string with a regular expression, and returns an array containing the results of that search\. Matches a string or an object that supports being matched against, and returns an array
 containing the results of that search, or null if no matches are found\.|(regexp: ) =\> void|
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
|codePointAt|Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
 value of the UTF\-16 encoded code point starting at the string element at position pos in
 the String resulting from converting this object to a String\.
 If there is no element at that position, the result is undefined\.
 If a valid UTF\-16 surrogate pair does not begin at pos, the result is the code unit at pos\.|(pos: number) =\> void|
|includes|Returns true if searchString appears as a substring of the result of converting this
 object to a String, at one or more positions that are
 greater than or equal to position; otherwise, returns false\.|(searchString: , position: ) =\> void|
|endsWith|Returns true if the sequence of elements of searchString converted to a String is the
 same as the corresponding elements of this object (converted to a String) starting at
 endPosition – length(this)\. Otherwise returns false\.|(searchString: string, endPosition?: number) =\> void|
|normalize|Returns the String value result of normalizing the string into the normalization form
 named by form as specified in Unicode Standard Annex \#15, Unicode Normalization Forms\. Returns the String value result of normalizing the string into the normalization form
 named by form as specified in Unicode Standard Annex \#15, Unicode Normalization Forms\.|(form: ) =\> void|
|repeat|Returns a String value that is made from count copies appended together\. If count is 0,
 the empty string is returned\.|(count: ) =\> void|
|startsWith|Returns true if the sequence of elements of searchString converted to a String is the
 same as the corresponding elements of this object (converted to a String) starting at
 position\. Otherwise returns false\.|(searchString: string, position?: number) =\> void|
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
|padStart|Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length\.
 The padding is applied from the start (left) of the current string\.|(maxLength: , fillString: ) =\> void|
|padEnd|Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length\.
 The padding is applied from the end (right) of the current string\.|(maxLength: , fillString: ) =\> void|
|trimEnd|Removes the trailing white space and line terminator characters from a string\.|() =\> void|
|trimStart|Removes the leading white space and line terminator characters from a string\.|() =\> void|
|trimLeft|Removes the leading white space and line terminator characters from a string\.|() =\> void|
|trimRight|Removes the trailing white space and line terminator characters from a string\.|() =\> void|
|matchAll|Matches a string with a regular expression, and returns an iterable of matches
 containing the results of that search\.|(regexp: ) =\> void|
|replaceAll|Replace all instances of a substring in a string, using a regular expression or search string\. Replace all instances of a substring in a string, using a regular expression or search string\.|(searchValue: , replaceValue: ) =\> void|
|at|Takes an integer value and returns the item at that index, allowing for positive and negative integers\. Negative integers count back from the last item in the array\.|(index: number) =\> void|

> IDateObj

|参数|描述|类型|
|----------|-------------|------|
|year|年|number|
|month|月|number|
|date|日|number|
|hour|时|number|
|minute|分|number|
|second|秒|number|

> mode

```
"date"|"time"|"datetime"
```

> ItemType

```
"date"|"year"|"month"|"hour"|"minute"|"second"
```

> PickerData

|参数|描述|类型|
|----------|-------------|------|
|value|每一列展示的每项文案对应的值|ReactText|
|label|每一列展示的文案|ReactNode|
|children|级联状态下，该列对应的下一列数据|PickerData\[\]|
