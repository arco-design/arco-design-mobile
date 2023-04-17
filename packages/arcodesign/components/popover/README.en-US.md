### Data Display

# Popover 

Bubble card, supports six directions, small arrows are centered in each direction based on the mounted sub-elements, and supports controlled and uncontrolled modes.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|children|Bubble carrier, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo|ReactNode|-|
|innerPopoverClassName|Custom popover classname|string|''|
|visible|Whether to show bubbles, controlled mode|boolean|-|
|content|Popover content, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo|ReactNode|null|
|direction|Where the popover is displayed|"topLeft" \| "topCenter" \| "topRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"|'topRight'|
|duration|The length of stay in the auto\-off scenario, in milliseconds, 0 means no auto\-off|number|0|
|transitionTimeout|Animation duration, in milliseconds|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|minWidth|Minimum bubble width|string|'10px'|
|maxWidth|The maximum width of the popover|string|'90vw'|
|transitionName|Popover transition animation classname, modify the class name to realize the animation by yourself|string|'fade'|
|verticalOffset|The vertical offset of the popover relative to the child element, in px|number|10|
|horizontalOffset|The offset of the popover in the horizontal direction relative to the child element, in px|number|8|
|useAutoDirection|The bubble boundary is self\-adaptive\. When turned on, it will leave a safe distance between the left and right boundaries of the bubble\. When the upper and lower boundaries of the bubble and the window are smaller than the safe distance, the vertical direction of the bubble will be changed to make it leak out of the window\.|boolean \| \{ horizontal: boolean; vertical: boolean; \}|true|
|edgeOffset|The safe distance of the bubble from the border, in px|number \| EdgeOffset|14|
|verticalScrollThrottle|The scroll event throttle granularity of the scroll container, in ms|number|100|
|arrowWidth|The size of the popover tip, in px|number|9|
|preventBodyClick|After the popover appears, whether to block the click event of the non\-internal element, and only do the hidden popover operation after clicking the non\-internal element|boolean|false|
|clickOtherToClose|Whether to close the popover on click of non\-child elements and popover elements|boolean|true|
|clickSelfToClose|Whether to close the popover on click on the popover and child elements|boolean|true|
|touchOtherToClose|Whether to close the popover by touching non\-child elements and popover elements|boolean|false|
|touchSelfToClose|Whether to close the popover by touching non\-child elements and popover elements|boolean|false|
|touchToClose|Whether to close the bubble by touching the page, it is the default value of touchOtherToClose and touchSelfToClose|boolean|false|
|theme|Popover theme, black theme is white text on black background, white theme is black text on white background|"black" \| "white"|'black'|
|needShadow|Whether the popover content need a shadow|boolean|false|
|bordered|Whether the bubble has a border|boolean|White theme have borders by default, the black theme do not|
|defaultVisible|The default value of whether the popover is visible, uncontrolled mode|boolean|false|
|showCloseIcon|Whether to show the close button|boolean|false|
|textSuffix|Post elements of text bubbles, such as action buttons, etc\.|ReactNode|null|
|mode|Popover mount location, follow mode is mounted under the current child element, global mode is mounted on the body|"follow" \| "global"|'follow'|
|showMask|Whether to show the mask|boolean|false|
|maskTransitionTimeout|Mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|renderArrow|Customize arrow rendering|(options: \{ arrowWidth?: number; arrowLeft: number; direction: Direction; \}) =\> ReactNode|-|
|onChange|Callback event for state change|(visible: boolean) =\> void|() => void|
|onClickCloseIcon|Callback when clicking to close the icon|() =\> void|() => void|
|onClickTextSuffix|Callback after clicking the suffix element of text popover|() =\> void|() => void|
|onClickMask|Callback when clicking the mask|() =\> void|() => void|
|getVerticalScrollContainer|Get the scroll container in the vertical direction of the page|() =\> HTMLElement|() => document|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|child|Popover child element DOM|HTMLDivElement|
|innerPopover|Ref of Popover|PopoverInnerRef|
|innerPopoverDom|Popover element DOM|HTMLDivElement|
|updatePosition|Manually update the position of the bubble|() =\> void|
|dom|The outer DOM element of the component|HTMLDivElement|

> Popover.Menu

Bubble menu

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|menu|List of menu items|(string \| PopoverMenuItem)\[\]|required|
|menuLayout|Menu arrangement order, the default is vertical menu, supports horizontal menu and vertical menu, horizontal menu can put up to 4 menus in a row|"vertical" \| "horizontal"|'vertical'|
|useClickStatus|Whether the menu item is clickable|boolean|false|
|clickStatusDuration|The duration of the menu item click state, in milliseconds|number|300|
|onSelect|Callback for selecting available menu items|(value: string, item: string \| PopoverMenuItem) =\> void|() => {}|
|onClickMenuItem|Callback when clicking all menu items|(value: string, item: string \| PopoverMenuItem) =\> void|required|
|children|Bubble carrier, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo|ReactNode|-|
|innerPopoverClassName|Custom popover classname|string|''|
|visible|Whether to show bubbles, controlled mode|boolean|-|
|content|Popover content, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo|ReactNode|null|
|direction|Where the popover is displayed|"topLeft" \| "topCenter" \| "topRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"|'topRight'|
|duration|The length of stay in the auto\-off scenario, in milliseconds, 0 means no auto\-off|number|0|
|transitionTimeout|Animation duration, in milliseconds|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|minWidth|Minimum bubble width|string|'10px'|
|maxWidth|The maximum width of the popover|string|'90vw'|
|transitionName|Popover transition animation classname, modify the class name to realize the animation by yourself|string|'fade'|
|verticalOffset|The vertical offset of the popover relative to the child element, in px|number|10|
|horizontalOffset|The offset of the popover in the horizontal direction relative to the child element, in px|number|8|
|useAutoDirection|The bubble boundary is self\-adaptive\. When turned on, it will leave a safe distance between the left and right boundaries of the bubble\. When the upper and lower boundaries of the bubble and the window are smaller than the safe distance, the vertical direction of the bubble will be changed to make it leak out of the window\.|boolean \| \{ horizontal: boolean; vertical: boolean; \}|true|
|edgeOffset|The safe distance of the bubble from the border, in px|number \| EdgeOffset|14|
|verticalScrollThrottle|The scroll event throttle granularity of the scroll container, in ms|number|100|
|arrowWidth|The size of the popover tip, in px|number|9|
|preventBodyClick|After the popover appears, whether to block the click event of the non\-internal element, and only do the hidden popover operation after clicking the non\-internal element|boolean|false|
|clickOtherToClose|Whether to close the popover on click of non\-child elements and popover elements|boolean|true|
|clickSelfToClose|Whether to close the popover on click on the popover and child elements|boolean|true|
|touchOtherToClose|Whether to close the popover by touching non\-child elements and popover elements|boolean|false|
|touchSelfToClose|Whether to close the popover by touching non\-child elements and popover elements|boolean|false|
|touchToClose|Whether to close the bubble by touching the page, it is the default value of touchOtherToClose and touchSelfToClose|boolean|false|
|theme|Popover theme, black theme is white text on black background, white theme is black text on white background|"black" \| "white"|'black'|
|needShadow|Whether the popover content need a shadow|boolean|false|
|bordered|Whether the bubble has a border|boolean|White theme have borders by default, the black theme do not|
|defaultVisible|The default value of whether the popover is visible, uncontrolled mode|boolean|false|
|showCloseIcon|Whether to show the close button|boolean|false|
|textSuffix|Post elements of text bubbles, such as action buttons, etc\.|ReactNode|null|
|mode|Popover mount location, follow mode is mounted under the current child element, global mode is mounted on the body|"follow" \| "global"|'follow'|
|showMask|Whether to show the mask|boolean|false|
|maskTransitionTimeout|Mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|renderArrow|Customize arrow rendering|(options: \{ arrowWidth?: number; arrowLeft: number; direction: Direction; \}) =\> ReactNode|-|
|onChange|Callback event for state change|(visible: boolean) =\> void|() => void|
|onClickCloseIcon|Callback when clicking to close the icon|() =\> void|() => void|
|onClickTextSuffix|Callback after clicking the suffix element of text popover|() =\> void|() => void|
|onClickMask|Callback when clicking the mask|() =\> void|() => void|
|getVerticalScrollContainer|Get the scroll container in the vertical direction of the page|() =\> HTMLElement|() => document|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Direction

```
"topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight"
```

> EdgeOffset

|Property|Description|Type|
|----------|-------------|------|
|top|Top|number|
|right|Right|number|
|bottom|Bottom|number|
|left|Left|number|

> PopoverInnerRef

|Property|Description|Type|
|----------|-------------|------|
|dom|Component container dom|HTMLDivElement|
|content|-|HTMLDivElement|

> PopoverMenuItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|text|Menu item text|ReactNode|required|
|value|Menu item value|string|text|
|icon|The icon component of the menu item|ReactNode|null|
|disabled|Whether to disable the menu item|boolean|false|
