### 信息展示

# 标签 Tag

标签组件，支持标签和标签组。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|type|样式类型。primary表示基本类型，hollow表示空心类型，solid表示实心类型|"primary" \| "hollow" \| "solid"|"primary"|
|icon|图标内容|ReactNode|-|
|children|标签内部内容|ReactNode|-|
|size|标签尺寸|"medium" \| "large" \| "small"|"medium"|
|color|文字颜色|string|-|
|bgColor|背景颜色|string|-|
|borderColor|边框颜色|string|-|
|borderStyle|边框样式|"solid" \| "none" \| "dotted" \| "dashed"|"solid"|
|halfBorder|是否是0\.5px边框|boolean|true|
|closeable|是否有关闭按钮|boolean|-|
|closeIcon|关闭按钮内容|ReactNode|-|
|closeColor|关闭按钮颜色|string|-|
|filleted|是否圆角|boolean|-|
|onClose|点击关闭按钮回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClick|点击标签回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> Tag.List

标签列表，支持动态编辑标签

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|list|标签列表|(TagProps & RefAttributes\<TagRef\>)\[\]|必填|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|type|样式类型。primary表示基本类型，hollow表示空心类型，solid表示实心类型|"primary" \| "hollow" \| "solid"|-|
|showAddButton|是否展示添加标签按钮|boolean|true|
|addArea|自定义添加标签按钮|ReactNode|-|
|horizontalPadding|标签横向间距|ReactText|-|
|verticalPadding|标签纵向间距|ReactText|-|
|onAdd|点击添加标签按钮回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClose|点击标签关闭按钮回调|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> TagProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|type|样式类型。primary表示基本类型，hollow表示空心类型，solid表示实心类型|"primary" \| "hollow" \| "solid"|"primary"|
|icon|图标内容|ReactNode|-|
|children|标签内部内容|ReactNode|-|
|size|标签尺寸|"medium" \| "large" \| "small"|"medium"|
|color|文字颜色|string|-|
|bgColor|背景颜色|string|-|
|borderColor|边框颜色|string|-|
|borderStyle|边框样式|"solid" \| "none" \| "dotted" \| "dashed"|"solid"|
|halfBorder|是否是0\.5px边框|boolean|true|
|closeable|是否有关闭按钮|boolean|-|
|closeIcon|关闭按钮内容|ReactNode|-|
|closeColor|关闭按钮颜色|string|-|
|filleted|是否圆角|boolean|-|
|onClose|点击关闭按钮回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClick|点击标签回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> TagListRef

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
