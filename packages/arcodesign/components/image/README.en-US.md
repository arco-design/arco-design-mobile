### Data Display

# Image 

Enhanced img tag, provides a variety of image filling modes, and supports image loading prompts and loading failure prompts.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|status|The specified image state, valid when staticLabel=false|"loading" \| "loaded" \| "init" \| "error"|-|
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

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|image|Native image element DOM|HTMLImageElement|
|retry|Manually retry image loading|() =\> void|

> ImageStatus

```
"loading" | "loaded" | "init" | "error"
```

> ObjectPosition

```
string | number | string & {}
```
