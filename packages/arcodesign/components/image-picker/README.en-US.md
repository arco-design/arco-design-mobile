### Data Entry

# ImagePicker 

ImagePicker Component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom className|string|-|
|style|Custom stylesheet|CSSProperties|-|
|images|selected images list|ImagePickItem\[\]|required|
|accept|Available File Types|string|'image/*'|
|multiple|Whether To Support Multiple Selection|boolean|-|
|capture|Whether To Support Multiple Selection \[capture MDN\](https://developer\.mozilla\.org/en\-US/docs/Web/HTML/Attributes/capture)|string \| boolean|-|
|columns|The Number Of Pictures Displayed In A Row|number|3|
|gutter|spacing between grids|number|8|
|limit|max Pictures Can Choose|number|-|
|maxSize|File size limit, in K|number|-|
|hideDelete|Whether to hide delete Icon|boolean|false|
|hideSelect|Whether to hide Select Icon|boolean|false|
|alwaysShowSelect|Whether to always show Select Icon|boolean|false|
|disabled|Disable Select & Delete Image|boolean|-|
|deleteIcon|Defined Delete Icon|ReactNode|-|
|selectIcon|Defined Select Icon|ReactNode|-|
|imageProps|Attributes passed through to the image|Partial\<ImageProps\>|-|
|renderError|Defined upload failed display|(index?: number) =\> ReactNode|-|
|renderLoading|Defined uploading display|(index?: number) =\> ReactNode|-|
|upload|upload function|(file: ImagePickItem) =\> Promise\<ImagePickItem\>|-|
|onChange|The list of selected images changes|(fileList: ImagePickItem\[\]) =\> void|-|
|onMaxSizeExceed|Image exceeds size limit|(file: File) =\> void|-|
|onLimitExceed|The number of pictures exceeds the limit|(files: File\[\]) =\> void|-|
|onClick|click event|(e: MouseEvent\<HTMLElement, MouseEvent\>, image: ImagePickItem, index: number) =\> void|-|
|onLongPress|long press event|(e: TouchEvent\<HTMLElement\>, image: ImagePickItem, index: number) =\> void|-|
|selectAdapter|Select Adaptor|() =\> Promise\<SelectCallback\>|-|
|onSelectClick|Select Icon Click Event|() =\> void|-|
|onDeleteClick|Delete Icon Click Event|(index: number) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> ImagePickItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|url|Image Url|string|required|
|file|Image File|File|-|
|status|Image Status|"loaded" \| "loading" \| "error"|According to inner status of the image|

> ImageProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|status|The specified image state, valid when staticLabel=false|"loaded" \| "loading" \| "error" \| "init"|-|
|src|Image resource|string|required|
|width|Container width, when number is input, the default unit is px, if a string is input, the unit is accepted|ReactText|-|
|height|Container height, when number is input, the default unit is px, if a string is input, the unit is accepted|ReactText|-|
|alt|Alternative text|string|""|
|fit|Image fill mode (object\-fit), preview\-\* is preview mode, preview mode is only valid when staticLabel=false|"\-moz\-initial" \| "inherit" \| "initial" \| "revert" \| "revert\-layer" \| "unset" \| "contain" \| "cover" \| "fill" \| "none" \| "scale\-down" \| "preview\-y" \| "preview\-x"|"fill"|
|position|Image fill position(object\-position)|ObjectPosition\<ReactText\>|"center"|
|radius|Image border radius|ReactText|-|
|bordered|Whether to add a border|boolean|-|
|loadingArea|Custom display loading content, valid when staticLabel=false|ReactNode|-|
|errorArea|Custom display failed to load content, valid when staticLabel=false|ReactNode|-|
|showLoading|Whether to display the image loading prompt, valid when staticLabel=false|boolean|-|
|showError|Whether to display the image loading failure prompt, valid when staticLabel=false|boolean|-|
|animateDuration|Display animation duration when loading is complete, valid when staticLabel=false|number|200|
|retryTime|Number of automatic retries on failure|number|0|
|forceHttps|Whether to force the use of https|boolean|-|
|boxWidth|In preview mode, the width of the parent container|number|-|
|boxHeight|In preview mode, the height of the parent container|number|-|
|topOverlap|Top\-level content of the image|ReactNode|-|
|bottomOverlap|The bottom content of the image (placeholder), the default is gray bottom, input null to remove|ReactNode|-|
|showImage|Manually control whether to load images|boolean|-|
|staticLabel|Whether to render the \<img\> tag directly without going through the image loading process|boolean|-|
|nativeProps|Img tag native attributes, the priority is lower than the separate setting|DetailedHTMLProps\<ImgHTMLAttributes\<HTMLImageElement\>, HTMLImageElement\>|-|
|onChange|Callback triggered when switching status|(status: string) =\> void|-|
|onClick|Callback when clicking image|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|-|
|onLoad|Callback when the image is loaded|(e: Event, image: HTMLImageElement) =\> void|-|
|onError|Callback when the image fails to load, triggered after the retry finally fails if there is an automatic retry|(e: string \| Event) =\> void|-|
|onAutoRetry|Callback triggered by automatic retry when image loading fails|(e: string \| Event) =\> void|-|

> ImageStatus

```
"loaded" | "loading" | "error" | "init"
```

> ObjectPosition

```
string | number | string & {}
```

> SelectCallback

|Property|Description|Type|
|----------|-------------|------|
|files|-|AdapterFile\[\]|

> AdapterFile

|Property|Description|Type|
|----------|-------------|------|
|url|-|string|
|size|-|number|
|name|-|string|
