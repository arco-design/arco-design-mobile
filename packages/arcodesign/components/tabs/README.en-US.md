### Navigation

# Tabs 

Used to let the user switch between different views. In order to optimize the rendering performance of the mobile terminal, if you need to replace the DOM, send a request to update data, etc., please do it in the `onAfterChange` instead of the `onChange` callback.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|tabs|Array of TabBar content, additional data can be appended in addition to the required fields|TabData\[\]|required|
|children|TabPane content|ReactNode|-|
|activeTab|Currently active tab index, controlled if inputting value|number|-|
|defaultActiveTab|initial tab index value|number|0|
|disabled|Whether to disable switching, including clicking TabBar switching and sliding switching|boolean|-|
|tabBarPosition|Tabbar position|"top" \| "bottom" \| "left" \| "right"|"top"|
|tabBarArrange|Tabbar arrangement, tabBar is valid when it is in the top or bottom position, start is left, center is centered, and end is right|"start" \| "center" \| "end"|"center"|
|tabBarScroll|Whether to scroll to the left when the TabBar exceeds the screen|boolean|true|
|tabBarFixed|Whether the TabBar is fixed on the top|boolean|-|
|tabBarExtra|TabBar extra render content|ReactNode|-|
|tabBarScrollBezier|The bezier curve value that changes when the tabBar is scrolled|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|tabBarScrollDuration|TabBar scrolling transition duration, in ms|number|300|
|tabBarScrollChance|TabBar scrolling timing, \`jump\` means when the tab is jumped, \`after\-jump\` means after the jump animation is executed, \`none\` means do not scroll automatically after switching tabs|"jump" \| "after\-jump" \| "none"|"jump"|
|tabBarHasDivider|Whether the tabBar has a dividing line|boolean|-|
|tabBarResetWhenScroll|When scrolling the tabPane vertically, the timing of automatically resetting the scroll position of the tabBar|"none" \| "touchmove" \| "touchend"|"touchmove"|
|type|The style of the tabs, line is arranged in sequence, line\-divide is arranged at equal intervals, and card is arranged by segmenter|"line" \| "line\-divide" \| "card" \| "tag" \| "tag\-divide"|line|
|swipeable|Whether to allow sliding|boolean|true|
|duration|The time of the TabBar underline sliding animation switching, in ms|number|240|
|fullScreen|Whether the layout is full screen (100%)|boolean|false|
|autoHeight|Whether the container height is adaptive, it only takes effect when mode=swipe and vertical layout|boolean|false|
|transitionDuration|In swipe mode, it means the time from when the finger is lifted to the end of the animation\. In scroll mode, it means the scroll transition time after clicking the tab, in ms|number|300|
|useCaterpillar|Whether to use the caterpillar effect|boolean|false|
|caterpillarProperty|When using the caterpillar effect, the properties that perform animation changes, \`scale\` means changing the transform: scale value, \`size\` means changing the width and height values\. Generally, \`size\` is used to avoid border\-radius being stretched by scale, but it should be noted that its performance is not as good as \`scale\`|"scale" \| "size"|"scale"|
|caterpillarMaxScale|When the caterpillar effect is enabled, the longest extension multiple of the TabBar underline (relative to its own length)|number|2|
|percentToChangeTab|Sliding switching distance threshold (width ratio), the range is \[0, 1\]\. If this property and the \`distanceToChangeTab\` property are both set, the larger actual calculation result will take effect|number|0.3|
|distanceToChangeTab|The sliding switching distance threshold (fixed px width), if both this property and the \`percentToChangeTab\` property are set, the actual calculation result will take effect with a larger one|number|10|
|speedToChangeTab|The sliding switching speed threshold (the sliding speed of the finger from pressing to lifting, in px/s), when it is set at the same time as the sliding switching distance threshold, it will take effect if one of them is satisfied\.|number|200|
|disableClickTransition|Disable animation when tab switch is clicked|boolean|true|
|lazyloadCount|Only load the n content adjacent to the current page\. When it is 0, all adjacent content will be hidden/destroyed\. If not input, all content will be loaded\. It will take effect when mode=swipe|number|-|
|hideContentStyle|When lazy loading is enabled, set the style for the content that is not within the scope of lazy loading, and pass in null to destroy the content|CSSProperties|null|
|renderHideContent|Render the pane that is not within the scope of lazy loading by itself, where the parameter pane represents the content to be rendered by the index\-th tab|(index: number, pane: ReactNode) =\> ReactNode|-|
|hideTabBarBeforeMounted|Whether to hide the TabBar before the component is loaded to prevent redundant scrolling effects when overflowing|boolean|-|
|overflowThreshold|When the number of TabBars is greater than or equal to the number of TabBars, it is considered to overflow, which is used for ssr first screen rendering optimization before dom loading is completed|number|5|
|showUnderline|Whether to display underline|boolean|true|
|underlineAdaptive|Whether the underline is adaptive according to the length of the tab cell|boolean|false|
|stopTouchThreshold|Minimum threshold to trigger onTouchStopped|number|0|
|touchSideDisableThreshold|The distance from the edge of the screen to disable the tabs swipe event when you start swiping right|number|0|
|stopPropagation|In swipe mode, whether the touch event need stopPropagation|boolean|true|
|getInnerScrollContainer|In swipe mode, the scroll container inside the component is used to exempt the swipe event response|() =\> HTMLElement \| HTMLElement\[\]|-|
|mode|Tabs switching mode, swipe is sliding mode, scroll is scroll listening mode|"swipe" \| "scroll"|"swipe"|
|getScrollContainer|The scroll container in scroll mode, used to listen to scroll events, valid when mode=scroll|() =\> HTMLElement \| Window|-|
|scrollThrottle|Throttling granularity in scroll mode, valid when mode=scroll|number|300|
|scrollOffset|Determine the offset of tab switching in scroll mode, a positive number is a downward offset, a negative number is an upward offset, valid when mode=scroll|number|0|
|scrollWhenMounted|In scroll mode, whether to automatically scroll to the currently selected position when the component is initially loaded, valid when mode=scroll|boolean|When the initial index is not 0, it will scroll automatically, when it is 0, it will not scroll automatically|
|goLastWhenScrollBottom|When scrolling to the bottom, if the last pane has not reached the bottom, whether to force the selection, valid when mode=scroll|boolean|true|
|scrollVertical|Whether to monitor vertical scrolling, otherwise monitor horizontal scrolling|boolean|true|
|tabBarClass|Custom classname of TabBar outer container|string|-|
|tabPaneClass|Custom classname of TabPane outer container|string|-|
|tabBarStyle|Custom style of TabBar outer container|CSSProperties|-|
|tabPaneStyle|Custom style of TabPane outer container|CSSProperties|-|
|tabPaneExtra|Extra rendering elements of TabPane, which shoule be absolute positioning|ReactNode|-|
|translateZ|Whether TabPane and TabBar open translateZ|boolean|true|
|swipeEnergySaving|Whether to enable the energy\-saving sliding mode\. After opening, the outer container of the TabPane will not expand with the number of panes and be promoted to a composite layer\. Only the currently selected pane will be slid, and other panes will be hidden before being selected\.|boolean|false|
|onTouchStopped|Triggered when swiping to the first or last page and want to swipe again|(direction: 1 \| \-1) =\> void|-|
|onChange|Callback when tab changes|(tab: TabData, index: number, from?: string) =\> void|-|
|onAfterChange|Callback when the tab changes and the animation is completed|(tab: TabData, index: number, from?: string) =\> void|-|
|onTabClick|Callback when TabBar is clicked|(tab: TabData, index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onTabBarOverflowChange|Calllback when TabBar is out of screen|(overflow: boolean) =\> void|-|
|onTouchStart|Touchstart event of TabPane|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchMove|Touchmove event of TabPane|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchEnd|Touchend / touchcancel event of TabPane|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTabBarScroll|Callback when TabBar is on overflow scrolling|(e: UIEvent\<HTMLDivElement, UIEvent\>) =\> void|-|
|onDistanceChange|Callback when tabs slides left and right, used to monitor the sliding distance for sliding synchronization interaction|(distance: number, wrapWidth: number, activeIndex: number) =\> void|-|
|onScroll|When mode=scroll, trigger the scroll container scroll callback|() =\> void|-|
|renderUnderline|Render the underline of the TabBar|(underlineStyle: UnderlineStyle, showLine: boolean, lineRef: MutableRefObject\<HTMLElement\>) =\> ReactNode|-|
|renderTabBar|Render the TabBar custom, often used in conjunction with Sticky|(TabBar: ReactNode, TabBarProps: TabCellProps) =\> ReactNode|-|
|renderTabBarItem|Render each item of the TabBar custom|(tab: TabData, index: number, extra: \{ active: boolean; \}) =\> ReactNode|-|
|renderTabBarInner|Render the inner content of the TabBar custom, used when need to nest another layer of DOM outside the \.|(Inner: ReactNode) =\> ReactNode|-|
|tabBarGutter|TabBar gutter, valid when type=line|ReactText|-|
|tabBarPadding|The width of the blank space on both sides of the TabBar, valid when type=line|string \| number \| \{ left?: ReactText; right?: ReactText; \}|-|
|underlineSize|TabBar underline length|ReactText|-|
|underlineThick|TabBar underline thickness|ReactText|-|
|underlineInnerStyle|Tabbar underline inner style, applied to tab\-cell\-underline\-inner|CSSProperties|-|
|tabBarStopPropagation|Does the touch event of the current TabBar require stopPropagation|boolean|true|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|bar|Ref of TabBar inner component|TabCellRef|
|pane|Ref of TabPane inner component|TabPaneRef|
|barOverflow|Whether the current TabBar width has overflowed|boolean|
|updateLayout|Manually update the Tabs layout|() =\> void|
|changeIndex|Manually switch tabs in uncontrolled mode|(index: number, rightNow?: boolean) =\> void|
|scrollToIndex|Scroll to the specified Tab, only available in scroll monitor mode|(index: number, rightNow?: boolean) =\> void|

> TabData

```
string | { [x: string]: any; title: ReactNode; }
```

> UnderlineStyle

|Property|Description|Type|
|----------|-------------|------|
|outer|Underline outer style, controls the relative position of the line|CSSProperties|
|inner|Underline inner layer style, control the width and height of the line itself and the zoom effect|CSSProperties|

> TabCellProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|prefixCls|prefix classname|string|-|
|activeIndex|Currently selected Tab|number|required|
|activeIndexRef|Currently selected Tab ref|MutableRefObject\<number\>|required|
|tabDirection|Tab layout direction, horizontal or vertical|"horizontal" \| "vertical"|required|
|changeIndex|Modify selected Tab|(newIndex: number, from?: string) =\> void|required|
|wrapWidth|Wrapper container width|number|required|
|wrapHeight|Wrapper container height|number|required|
|cellTrans|Whether the TabBar enables transition effects|boolean|required|
|distance|Finger sliding distance|number|required|
|jumpingDis|The distance the underline has been swiped|number|required|
|tabBarStopPropagation|Does the touch event of the current TabBar require stopPropagation|boolean|required|
|tabs|Array of TabBar content, additional data can be appended in addition to the required fields|TabData\[\]|required|
|disabled|Whether to disable switching, including clicking TabBar switching and sliding switching|boolean|-|
|tabBarPosition|Tabbar position|"top" \| "bottom" \| "left" \| "right"|"top"|
|tabBarArrange|Tabbar arrangement, tabBar is valid when it is in the top or bottom position, start is left, center is centered, and end is right|"start" \| "center" \| "end"|"center"|
|tabBarScroll|Whether to scroll to the left when the TabBar exceeds the screen|boolean|true|
|tabBarFixed|Whether the TabBar is fixed on the top|boolean|-|
|tabBarExtra|TabBar extra render content|ReactNode|-|
|tabBarScrollBezier|The bezier curve value that changes when the tabBar is scrolled|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|tabBarScrollDuration|TabBar scrolling transition duration, in ms|number|300|
|tabBarScrollChance|TabBar scrolling timing, \`jump\` means when the tab is jumped, \`after\-jump\` means after the jump animation is executed, \`none\` means do not scroll automatically after switching tabs|"jump" \| "after\-jump" \| "none"|"jump"|
|tabBarHasDivider|Whether the tabBar has a dividing line|boolean|-|
|type|The style of the tabs, line is arranged in sequence, line\-divide is arranged at equal intervals, and card is arranged by segmenter|"line" \| "line\-divide" \| "card" \| "tag" \| "tag\-divide"|line|
|duration|The time of the TabBar underline sliding animation switching, in ms|number|240|
|transitionDuration|In swipe mode, it means the time from when the finger is lifted to the end of the animation\. In scroll mode, it means the scroll transition time after clicking the tab, in ms|number|300|
|useCaterpillar|Whether to use the caterpillar effect|boolean|false|
|caterpillarProperty|When using the caterpillar effect, the properties that perform animation changes, \`scale\` means changing the transform: scale value, \`size\` means changing the width and height values\. Generally, \`size\` is used to avoid border\-radius being stretched by scale, but it should be noted that its performance is not as good as \`scale\`|"scale" \| "size"|"scale"|
|caterpillarMaxScale|When the caterpillar effect is enabled, the longest extension multiple of the TabBar underline (relative to its own length)|number|2|
|hideTabBarBeforeMounted|Whether to hide the TabBar before the component is loaded to prevent redundant scrolling effects when overflowing|boolean|-|
|overflowThreshold|When the number of TabBars is greater than or equal to the number of TabBars, it is considered to overflow, which is used for ssr first screen rendering optimization before dom loading is completed|number|5|
|showUnderline|Whether to display underline|boolean|true|
|underlineAdaptive|Whether the underline is adaptive according to the length of the tab cell|boolean|false|
|mode|Tabs switching mode, swipe is sliding mode, scroll is scroll listening mode|"swipe" \| "scroll"|"swipe"|
|tabBarClass|Custom classname of TabBar outer container|string|-|
|tabBarStyle|Custom style of TabBar outer container|CSSProperties|-|
|translateZ|Whether TabPane and TabBar open translateZ|boolean|true|
|onTabClick|Callback when TabBar is clicked|(tab: TabData, index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onTabBarOverflowChange|Calllback when TabBar is out of screen|(overflow: boolean) =\> void|-|
|onTabBarScroll|Callback when TabBar is on overflow scrolling|(e: UIEvent\<HTMLDivElement, UIEvent\>) =\> void|-|
|renderUnderline|Render the underline of the TabBar|(underlineStyle: UnderlineStyle, showLine: boolean, lineRef: MutableRefObject\<HTMLElement\>) =\> ReactNode|-|
|renderTabBarItem|Render each item of the TabBar custom|(tab: TabData, index: number, extra: \{ active: boolean; \}) =\> ReactNode|-|
|renderTabBarInner|Render the inner content of the TabBar custom, used when need to nest another layer of DOM outside the \.|(Inner: ReactNode) =\> ReactNode|-|
|tabBarGutter|TabBar gutter, valid when type=line|ReactText|-|
|tabBarPadding|The width of the blank space on both sides of the TabBar, valid when type=line|string \| number \| \{ left?: ReactText; right?: ReactText; \}|-|
|underlineSize|TabBar underline length|ReactText|-|
|underlineThick|TabBar underline thickness|ReactText|-|
|underlineInnerStyle|Tabbar underline inner style, applied to tab\-cell\-underline\-inner|CSSProperties|-|

> TabCellRef

|Property|Description|Type|
|----------|-------------|------|
|dom|Outer element DOM|HTMLDivElement|
|hasOverflow|Whether the current TabBar width has overflowed|boolean|
|scrollTo|Scroll the bar to the specified position, the tabs are scrolled on the x\-axis when the tabs are laid out up and down, and the y\-axis is scrolled when the tabs are laid out left and right|(position: number, rightNow?: boolean) =\> void|
|scrollToCenter|Scroll the bar to bring the currently selected item to the middle of the screen|(rightNow?: boolean) =\> void|
|setCaterpillarAnimate|Trigger caterpillar animation|(ratio?: number) =\> void|
|resetUnderlineStyle|Recalculate underline style|() =\> void|

> TabPaneRef

|Property|Description|Type|
|----------|-------------|------|
|dom|Outer element DOM|HTMLDivElement|
|getTransition|Get the current transitionDuration|() =\> number|
|scrollToIndex|Scroll to the specified Tab, only available in scroll monitor mode|(index: number, rightNow?: boolean) =\> void|
|setCurrentHeight|Update the current tabpane height, which takes effect when autoHeight=true|() =\> void|
