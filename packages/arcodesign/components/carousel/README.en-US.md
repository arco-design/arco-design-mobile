### Data Display

# Carousel 

Carousel component, supports custom carousel index style and slider width. **Note that if you are using `fastclick`, you need to add a `needsclick` class to the touchstart target ** (<a href="https://github.com/ftlabs/fastclick#ignore-certain-elements- with-needsclick" target="_blank">click here for details</a>) to avoid `fastclick` logic conflicts with gestures inside the component. (no need to add if `list` is set)

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|wrapStyle|Outermost container custom stylesheet|CSSProperties|-|
|style|Inner carousel container custom stylesheet|CSSProperties|-|
|children|Carousel internal content|ReactNode|-|
|list|Carousel image list, omit the shorthand of children elements, input the image url array, or specify the content of the masked text at the bottom of the image through \`text\`|CarouselListItem\[\]|-|
|animateDuration|Animation duration(ms) when the carousel slider is automatically toggled,|number|500|
|animateDurationSlide|Animation duration(ms) after the finger is released When manually switching the carousel slider|number|300|
|loop|Whether to enable circular rotation, it does not take effect when the slider width is specified|boolean|true|
|autoPlay|Whether to enable autoplay|boolean|true|
|autoPlayDirection|Direction when playing auto|"normal" \| "reverse"|"normal"|
|swipeable|Whether to respond to gesture swipe|boolean|true|
|stayDuration|The stay duration of each slider when autoplay is turned on|number|4000|
|boxWidth|Width of the box, the default value is 100% based on the parent container|ReactText|-|
|boxHeight|Height of the box\. The property is required when vertical is true|ReactText|-|
|baseBoxWidth|Initial box width, commonly used for ssr first screen initialization, available when horizontal rotation|number|-|
|baseBoxHeight|Initial box height, commonly used for ssr first screen initialization, available when vertical rotation|number|-|
|width|Width of the carousel slider, the default value is parent container width if it is 0 or not input|number|0|
|height|Height of the carousel slider, it will be adaptive if not input|number|-|
|initialIndex|Default selected slider index|number|0|
|renderIndicator|Custom indicator|(currentIndex: number, total: number, lastIndex: number) =\> ReactNode|-|
|indicatorPos|Position of the indicator|"start" \| "center" \| "end"|"center"|
|indicatorVerticalPos|Horizontal position of the vertical indicator|"left" \| "right"|"left"|
|indicatorOutside|Whether the indicator is placed outside the carousel|boolean|-|
|showIndicator|Whether to show the indicator|boolean|true|
|hideSingleIndicator|Whether to hide the indicator if just one child|boolean|true|
|indicatorType|the style type of the indicator|"square" \| "circle"|"square"|
|indicatorClass|Indicator classname|string|-|
|indicatorInverse|Whether the carousel indicator is inverse color, the default is determined according to whether the indicator is placed outside|boolean|-|
|spaceBetween|Children elements spacing|number|0|
|offsetBetween|The exposed distance of the front and rear\. When the value is set, the carousel cannot be rotated\.|number \| \{ left?: number; right?: number; \}|0|
|currentIndex|Manually control the current display element|number|-|
|autoHeight|Whether the container height is adaptive|boolean|false|
|percentToChange|Sliding switching distance threshold (width ratio), the range is \[0, 1\]\. If the property and the \`distanceToChange\` property are both set, the actual calculation result will take effect with a larger value\.|number|0.3|
|distanceToChange|Sliding switching distance threshold (fixed px width), if both this property and the \`percentToChange\` property are set, the actual calculation result will take effect with a larger one|number|10|
|speedToChange|The sliding switching speed threshold (the sliding speed of the finger from pressing to lifting, in px/s), when it is set at the same time as the sliding switching distance threshold, it will take effect if one of them is satisfied\.|number|200|
|vertical|Whether to rotate vertically, the \`boxHeight\` property is required after setting|boolean|-|
|lazyloadCount|Only load the n sliders adjacent to the current slider\. If it is 0, all adjacent content will be destroyed\. If not input, all sliders will be loaded\.|number|-|
|stopTouchThreshold|Minimum threshold to trigger onTouchStopped|number|0|
|bounceWhenNoLoop|When it is not loopable, whether to enable the rebound effect when sliding to the front or the end|boolean|false|
|bounceDampRate|The damping coefficient when the front or rear rebound effect is turned on|number|3|
|inactiveScale|The size ratio of the inactive slider, the value range is \[0, 1\]\. After setting, it will have a magnification effect when switching\.|number|-|
|stopPropagation|Whether the touch event requires stopPropagation|boolean|true|
|fakeItem|Whether to fake the first and last items, which is used for the connection of the circular rotation when the offsetBetween is not equal to 0|boolean|false|
|allowEndBlank|Whether to allow white space when sliding to the end, only valid when loop=false and width is set|boolean|false|
|iOSVisibleOptimize|Whether to do DOM forced refresh optimization when the screen is off under iOS, to fix the rendering problem of automatic playback when the iOS screen is off|boolean|true|
|distanceProcessor|Customize the calculation method of the finger swipe distance\. posDis \- touchmove distance, wrapSize \- container size in the sliding direction, childSize \- slider size in the sliding direction|(posDis: number, wrapSize: number, childSize: number) =\> number|(posDis, wrapSize, childSize) => childSize * (posDis / wrapSize)|
|getInnerScrollContainer|The scroll container inside the component, used to exempt the sliding event response|() =\> HTMLElement \| HTMLElement\[\]|-|
|onTouchStopped|Triggered when the carousel does not support looping and slides to the front or back, but want to slide again|(direction: 1 \| \-1) =\> void|-|
|onChange|Triggered when the carousel slider is toggled|(index: number) =\> void|-|
|onAfterChange|Triggered after the carousel slider toggle animation is complete|(index: number, oldIndex: number) =\> void|-|
|onTouchStart|Carousel content touchstart event|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTouchMove|Carousel content touchmove event|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTouchEnd|Carousel content touchend / touchcancel event|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTransitionStart|Callback when the carousel transition animation starts|() =\> void|-|
|onTransitionEnd|Callback when the carousel transition animation ends|() =\> void|-|
|onDistanceChange|Callback when the carousel slides left and right, used to monitor the sliding distance for sliding synchronization interaction|(distance: number, wrapSize: number, activeIndex: number) =\> void|-|
|onPageVisibleChange|Custom page visibility listener\. By default, the visibilitychange event is monitored in the document\. The return function is used to remove the listener when the component is unloaded\.|(updateWhenVisible: () =\> void, updateWhenInvisible: () =\> void) =\> () =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|wrap|Wrapper DOM of carousel slider items, carry touch related events|HTMLDivElement|
|items|Carousel slider DOM|HTMLDivElement\[\]|
|noLoop|The loop rotation is disabled internally under certain conditions, here indicates whether the loop is disabled|boolean|
|updateData|Recalculate the layout manually|() =\> void|
|changeIndex|Manually update the currently selected index, rightNow indicates whether to jump to the target index immediately, otherwise perform a transition animation to the target index|(newIndex: number, rightNow?: boolean, direction?: "left" \| "right") =\> void|

> CarouselListItem

|Property|Description|Type|
|----------|-------------|------|
|src|image resource|string|
|text|Fixed text at the bottom of the image|ReactNode|
|onClick|Callback function for clicking the image|(e: MouseEvent\<HTMLImageElement, MouseEvent\>) =\> void|
