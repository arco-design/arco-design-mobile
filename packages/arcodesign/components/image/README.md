### 信息展示

# 图片 Image

增强版的 img 标签，提供多种图片填充模式，支持图片加载中提示、加载失败提示。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|status|指定图片状态，staticLabel=false时有效|"loading" \| "loaded" \| "init" \| "error"|-|
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

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|image|原生图片元素 DOM|HTMLImageElement|
|retry|手动重试图片加载|() =\> void|

> ImageStatus

```
"loading" | "loaded" | "init" | "error"
```

> ObjectPosition

```
string | number | string & {}
```
