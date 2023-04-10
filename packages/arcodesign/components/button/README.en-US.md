### General

# Button 

Using for starting an immediate action

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|type|Style type|"primary" \| "ghost" \| "default"|"primary"|
|size|Size|"mini" \| "small" \| "medium" \| "large" \| "huge"|"large"|
|inline|Whether it's inline style|boolean|false|
|loading|Whether it's in loading status|boolean|false|
|disabled|Whether to disable|boolean|false|
|halfBorder|Whether the border is 0\.5px|boolean|false|
|icon|icon, input icon component|ReactNode|-|
|showTextWhenLoading|Whether to show text when loading|boolean|true|
|needActive|Whether it needs active status|boolean|true|
|style|Custom stylesheet|CSSProperties|-|
|shape|Button shape|"round" \| "semi" \| "square"|"semi"|
|color|Custom font color|ButtonColorStatus|-|
|bgColor|Custom background color|ButtonColorStatus|-|
|borderColor|Custom border color|ButtonColorStatus|-|
|className|Custom classname|string|-|
|loadingIcon|Loading icon, input the icon component or its type|ReactNode|-|
|children|Children element|ReactNode|-|
|onClick|Callback function when clicking button|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClickDisabled|Callback function when disabling button|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|disableWhenLoading|Disable button when loading|boolean|true|
|coverIconWhenLoading|Whether to override Icon during loading|boolean|true|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLButtonElement|

> ButtonColorStatus

```
string | { normal: string; active: string; disabled: string; }
```
