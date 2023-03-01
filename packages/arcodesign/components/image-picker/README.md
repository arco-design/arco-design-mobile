### 数据录入

# 图片选择器 ImagePicker

图片选择器组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|images|已选择图片列表|ImagePickItem\[\]|必填|
|accept|可以选择的文件类型|string|'image/*'|
|multiple|是否支持多选|boolean|-|
|capture|图片选取模式 Image selection mode \[capture MDN\](https://developer\.mozilla\.org/en\-US/docs/Web/HTML/Attributes/capture)|string \| boolean|-|
|columns|一行展示图片张数|number|3|
|gutter|格子间的间距|number|8|
|limit|最多选择图片张数，超出数量自动隐藏上传按钮，0表示不做限制|number|-|
|maxSize|文件大小限制，单位为K|number|-|
|hideDelete|是否隐藏删除Icon|boolean|false|
|hideSelect|是否隐藏选择Icon|boolean|false|
|alwaysShowSelect|是否总是展示选择Icon，默认情况下当图片数量超出limit值时会自动隐藏选择Icon|boolean|false|
|disabled|禁用选择和删除图片|boolean|-|
|deleteIcon|自定义删除图标|ReactNode|-|
|selectIcon|自定义选择图标|ReactNode|-|
|imageProps|透传给图片的属性|Partial\<ImageProps\>|-|
|renderError|自定义上传失败展示|(index?: number) =\> ReactNode|-|
|renderLoading|自定义上传中展示|(index?: number) =\> ReactNode|-|
|upload|上传方法|(file: ImagePickItem) =\> Promise\<ImagePickItem\>|-|
|onChange|已选图片列表发生变化|(fileList: ImagePickItem\[\]) =\> void|-|
|onMaxSizeExceed|图片超过限制大小|(file: File) =\> void|-|
|onLimitExceed|选择张数超过限制|(files: File\[\]) =\> void|-|
|onClick|图片点击|(e: MouseEvent\<HTMLElement, MouseEvent\>, image: ImagePickItem, index: number) =\> void|-|
|onLongPress|图片长按事件|(e: TouchEvent\<HTMLElement\>, image: ImagePickItem, index: number) =\> void|-|
|selectAdapter|图片选择适配器|() =\> Promise\<SelectCallback\>|-|
|onSelectClick|选图点击事件|() =\> void|-|
|onDeleteClick|删除点击事件|(index: number) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|

> ImagePickItem

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|url|图片地址|string|必填|
|file|图片文件|File|-|
|status|图片状态|"loaded" \| "loading" \| "error"|以图片自身加载状态而定|

> ImageProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|status|指定图片状态，staticLabel=false时有效|"loaded" \| "loading" \| "error" \| "init"|-|
|src|图片链接|string|必填|
|width|容器宽度，传数值，默认单位为px，传字符串则接受传入的单位|ReactText|-|
|height|容器高度，传数值，默认单位为px，传字符串则接受传入的单位|ReactText|-|
|alt|替代文本|string|""|
|fit|图片填充模式(object\-fit)，传preview\-\*为预览模式，预览模式仅staticLabel=false时有效|"\-moz\-initial" \| "inherit" \| "initial" \| "revert" \| "revert\-layer" \| "unset" \| "contain" \| "cover" \| "fill" \| "none" \| "scale\-down" \| "preview\-y" \| "preview\-x"|"fill"|
|position|图片填充位置(object\-position)|ObjectPosition\<ReactText\>|"center"|
|radius|图片圆角|ReactText|-|
|bordered|是否加边框|boolean|-|
|loadingArea|自定义展示加载中内容，staticLabel=false时有效|ReactNode|-|
|errorArea|自定义展示加载失败内容，staticLabel=false时有效|ReactNode|-|
|showLoading|是否展示图片加载中提示，staticLabel=false时有效|boolean|-|
|showError|是否展示图片加载失败提示，staticLabel=false时有效|boolean|-|
|animateDuration|加载完时展现动画时长，staticLabel=false时有效|number|200|
|retryTime|失败时自动重试次数|number|0|
|forceHttps|是否强制使用https|boolean|-|
|boxWidth|预览模式下，父容器宽度|number|-|
|boxHeight|预览模式下，父容器高度|number|-|
|topOverlap|图片顶层内容|ReactNode|-|
|bottomOverlap|图片底层内容（placeholder），默认是灰色兜底，传null可移除|ReactNode|-|
|showImage|手动控制是否加载图片|boolean|-|
|staticLabel|是否直接渲染\<img\>标签，不走加载图片流程|boolean|-|
|nativeProps|img标签原生属性，优先级低于单独设置|DetailedHTMLProps\<ImgHTMLAttributes\<HTMLImageElement\>, HTMLImageElement\>|-|
|onChange|切换status时触发的回调|(status: string) =\> void|-|
|onClick|点击图片时触发的回调|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|onLoad|图片加载完毕时触发的回调|(e: Event, image: HTMLImageElement) =\> void|-|
|onError|图片加载失败时触发的回调，如果有自动重试则在重试最终失败后触发|(e: string \| Event) =\> void|-|
|onAutoRetry|图片加载失败时自动重试触发的回调|(e: string \| Event) =\> void|-|

> ImageStatus

```
"loaded" | "loading" | "error" | "init"
```

> ObjectPosition

```
string | number | string & {}
```

> SelectCallback

|参数|描述|类型|
|----------|-------------|------|
|files|-|AdapterFile\[\]|

> AdapterFile

|参数|描述|类型|
|----------|-------------|------|
|url|-|string|
|size|-|number|
|name|-|string|
