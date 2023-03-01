### Navigation

# NavBar 

Navigation bar, supports ceiling and immersion, supports display at specified scroll position, and supports real-time update of style according to scroll position.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Navigation bar middle text, with centering and overflow omitting effects|ReactNode|-|
|children|Customize the main content of the navigation bar, available when the content of the navigation bar is a non\-centered text style such as Tabs|ReactNode|-|
|leftContent|Navigation bar left content|ReactNode|Back button|
|rightContent|Content on the right side of the navigation bar|ReactNode|-|
|style|Custom stylesheet, background and text colors can be defined here|CSSProperties|-|
|className|Custom classname|string|-|
|wrapClass|Outermost element custom classname|string|-|
|fixed|Whether to fix|boolean|-|
|statusBarHeight|Immersive status bar height|number|0|
|hasBottomLine|Whether there is a bottom border|boolean|true|
|onClickLeft|Callback when clicking the content on the left|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClickRight|Callback when clicking the content on the right|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|showOffset|Display the offset value of nav\-bar\. When the scrollTop value is less than this value, the main content and the right content will be hidden, and the left content will remain|number|0|
|onShowChange|After setting showOffset, triggered when the content display state changes|(show: boolean) =\> void|-|
|placeholder|When fixed=true is set, whether the original position of the navigation bar should be occupied|boolean|true|
|extra|Additional render elements, level with inner|ReactNode|-|
|getScrollContainer|Custom scrolling element, default is window if not input|() =\> HTMLElement \| Window|-|
|getComputedStyleByScroll|Set a custom style according to the scroll offset value\. After setting this property, the scroll event of the scroll container will be monitored\.|(offset: number) =\> CSSProperties|-|
|onScrollChange|Callback when scrolling\. After setting this property, the scroll event of the scroll container will be monitored\.|(offset: number) =\> void|-|
|ariaLabel|Accessibility attribute aria\-label|string|""|
|ariaRole|Accessibility attribute role|string|"banner"|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|navBar|@deprecated|HTMLDivElement|
|dom|The outermost element DOM|HTMLDivElement|
