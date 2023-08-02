### 信息展示

# 头像 Avatar

头像展示组件，支持圆形和方形两种形状，支持图片文字头像，支持五种尺寸。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|shape|形状|"circle" \| "square"|"circle"|
|size|尺寸|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|"small"|
|src|图片头像的资源地址|string|-|
|imageProps|图片头像组件参数，透传给Image组件|Partial\<ImageProps & RefAttributes\<ImageRef\>\>|-|
|decoration|图片头像上的装饰|ReactNode|null|
|textAvatar|文字头像，中文建议取两个字，英文建议在三个字以下|string|""|
|avatarStyle|头像元素的自定义样式|CSSProperties|{}|
|autoFixFontSize|是否自动根据头像尺寸调整字体大小|boolean|true|
|autoFixFontOffset|自动调整文字头像大小时，文字距离头像容器左右的安全距离|number|2|
|avatarName|头像旁的用户名信息|string|""|
|avatarDesc|头像旁的辅助信息，需要和用户名一起出现|string|""|
|renderInfo|自定义头像描述信息|ReactNode|null|
|defaultOverLap|头像组件为空时默认的状态|ReactNode|用户图标|
|onClick|点击头像的回调事件|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|() => {}|
|onClickDecoration|点击头像上的装饰|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|() => {}|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|

> Avatar.Group

头像叠层

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|isGroup|是否为头像组|boolean|必填|
|shape|形状，优先级低于Avatar组件本身|"circle" \| "square"|"circle"|
|size|尺寸，优先级低于Avatar组件本身|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|"medium"|
|zIndexOrder|头像组叠层层级顺序，z\-index值大小，desc \- 降序，asc \- 升序|"desc" \| "asc"|"desc"|
|children|自定义组件内容|ReactNode|null|
|className|自定义类名|string|""|
|style|自定义样式|CSSProperties|{}|

> AvatarGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|
