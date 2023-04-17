### Data Display

# ImagePreview 

The image preview, supports circular rotation, two-finger/double-tap zoom, and thumbnail zoom effects.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|images|Image List|PreviewImageProps\[\]|required|
|openIndex|The index displayed when it is opened, the popup will be displayed within the scope of images, otherwise the popup will be hidden|number|required|
|loop|Whether it can be swiped circularly|boolean|false|
|fit|Image layout, preview\-y is overflow scrolling with full width and height, preview\-x is overflow scrolling with full width and height|"preview\-y" \| "preview\-x"|"preview-y"|
|displayDuration|Transition animation on opening and closing|number|300|
|replaceFallbackWhenLoaded|Whether to replace the transition image animation with the original image animation after the original image is loaded|boolean|-|
|noselect|The image cannot be selected, and the system default event is blocked|boolean|true|
|spaceBetween|Horizontal spacing of images|number|-|
|loadingArea|Custom display loading content|ReactNode|-|
|errorArea|Custom display loading failure content|ReactNode|-|
|showLoading|Whether to display the image loading prompt|boolean|true|
|showError|Whether to display the image loading failure prompt|boolean|true|
|retryTime|Number of automatic retries on failure|number|-|
|staticLabel|Whether to render the \<img\> tag directly without going through the image loading process|boolean|-|
|scrollBezier|Scrolling change curve of long image|\[number, number, number, number\]|-|
|lazyloadCount|Only load n content adjacent to the current page, when it is 0, all adjacent content will be destroyed|number|1|
|swipeToClose|When the image is scrolled to the edge, whether to close the preview when continuing to swipe|boolean|true|
|indicatorPos|Carousel indicator position|"start" \| "center" \| "end"|"start"|
|getMinScale|The minimum zoom factor when the image is pinched, it will still return to the state of 1 after letting go, the default is 0\.7|(image: HTMLImageElement, imageIndex: number) =\> number|-|
|getMaxScale|The maximum zoom factor of the image, the default is adjusted according to the picture size|(image: HTMLImageElement, imageIndex: number) =\> number|-|
|getDoubleClickScale|The zoom factor of the image when double\-clicking the image|(currentScale: number, maxScale: number, image: HTMLImageElement, imageIndex: number) =\> number|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|renderIndicator|Custom indicator content|(currentIndex: number, total: number, lastIndex: number) =\> ReactNode|-|
|getThumbBounds|Get the thumbnail image Positioning|(index: number) =\> ClientRect|-|
|onChange|Callback when index changes|(index: number) =\> void|-|
|onAfterChange|Callback after animation is completed when the index toggles|(index: number) =\> void|-|
|close|close popup|(e: MouseEvent\<HTMLDivElement, MouseEvent\> \| TouchEvent) =\> void|required|
|onClose|Callback when closing the popup (after the animation is completed)|() =\> void|-|
|onImageClick|Callback when clicking the image, if it returns true, it will prevent the popup from closing|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> boolean \| void|-|
|onImageDoubleClick|Callback when double clicking the image|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onImageLongTap|Callback when long pressing image|(index: number, image: HTMLImageElement, e: TouchEvent) =\> void|-|
|onTouchStart|Popup content touchstart event|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchMove|Popup content touchmove event|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchEnd|Popup content touchend / touchcancel events|(e: TouchEvent, index: number) =\> boolean \| void|-|
|animateDurationSlide|Animation duration(ms) after the finger is released When manually switching the carousel slider|number|300|
|showIndicator|Whether to show the indicator|boolean|true|
|hideSingleIndicator|Whether to hide the indicator if just one child|boolean|true|
|percentToChange|Sliding switching distance threshold (width ratio), the range is \[0, 1\]\. If the property and the \`distanceToChange\` property are both set, the actual calculation result will take effect with a larger value\.|number|0.3|
|distanceToChange|Sliding switching distance threshold (fixed px width), if both this property and the \`percentToChange\` property are set, the actual calculation result will take effect with a larger one|number|10|
|speedToChange|The sliding switching speed threshold (the sliding speed of the finger from pressing to lifting, in px/s), when it is set at the same time as the sliding switching distance threshold, it will take effect if one of them is satisfied\.|number|200|
|swipeable|Whether to respond to gesture swipe|boolean|true|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|imageDoms|Native image DOM array|HTMLImageElement\[\]|

> Methods

|method|Description|Type|
|----------|-------------|------|
|open|Open image preview|(config: ImagePreviewProps) =\> \{ close: () =\> void; update: (newConfig: ImagePreviewProps) =\> void; \}|

> PreviewImageProps

|Property|Description|Type|
|----------|-------------|------|
|src|Image resource|string|
|fit|Image layout, preview\-y is overflow scrolling with full width and height, preview\-x is overflow scrolling with full width and height|"preview\-y" \| "preview\-x"|
|fallbackSrc|Transition image url|string|
|thumbPosition|Thumbnail fill mode (backgroundPosition), default value is top center|string|
|extraNode|Custom dom|ReactNode|

> GlobalContextParams

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|Component classname prefix|string|"arco"|
|system|Manually control the current system, and the incoming value will be used directly after being passed in\. It is applicable when the initial value of the system needs to be specified in the ssr scenario\.|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|Whether to use dark mode|boolean|false|
|isDarkMode|Whether it is in dark mode|boolean|false|
|theme|Theme variable\. The css variable will be replaced online after input\. The less variable needs to be set|Record\<string, string\>|-|
|locale|Internationalized language configuration|ILocale|-|
|useRtl|Whether to use rtl|boolean|false|

> ILocale

|Property|Description|Type|
|----------|-------------|------|
|locale|Language Type|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; prepareText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
|Picker|-|\{ okText: string; cancelText: string; \}|
|Tag|-|\{ addTag: string; \}|
|Dialog|-|\{ okText: string; cancelText: string; \}|
|SwipeLoad|-|\{ normalText: string; activeText: string; \}|
|PullRefresh|-|\{ loadingText: string; pullingText: string; finishText: string; loosingText: string; \}|
|DropdownMenu|-|\{ select: string; \}|
|Pagination|-|\{ previousPage: string; nextPage: string; \}|
|Image|-|\{ loadError: string; \}|
|ImagePicker|-|\{ loadError: string; \}|
|SearchBar|-|\{ placeholder: string; cancelBtn: string; \}|
|Stepper|-|\{ minusButtonName: string; addButtonName: string; \}|
|Keyboard|-|\{ confirm: string; \}|
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.; \}; \}|
