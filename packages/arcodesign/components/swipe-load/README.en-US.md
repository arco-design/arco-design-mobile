### FeedBack

# SwipeLoad 

After swiping to the left to reach the edge of the screen, the loading is triggered when the distance exceeds a certain distance. It is often used to display a small number of elements horizontally, and then jump to another interface after swiping to the end.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|disabled|whether to be disabled|boolean|false|
|maxElementOffset|The maximum distance the page element is allowed to swipe|number|56|
|maxLabelOffset|The maximum distance the label moves|number|40|
|minConfirmOffset|The threshold value at which the page is allowed to trigger (usually less than maxLabelOffset)|number|30|
|onConfirm|Callback when releasing(jump, load, etc\.)|() =\> void|required|
|circleSize|Diameter of circle|number|80|
|labelAnimationDuration|Resume animation duration (ms)|number|250|
|labelAnimationFunction|Resume animation function (ms)|string|"cubic-bezier(0.14, 1, 0.34, 1)"|
|damping|Damping animation parameter, use the function x = X/(aX\+b), where X represents the current sliding distance, and the incoming value represents \[a, b\]|\[number, number\]|[0.013312, 1.636345]|
|getScrollContainer|Scroll container|() =\> HTMLElement|-|
|normalText|Label initial text|string|"More"|
|activeText|Text when triggering jump|string|"Release to view"|
|bounceWhenBumpBoundary|Whether a bounce effect is required when touching the left boundary|boolean|false|
|bounceDampRate|Damping coefficient when the rebound effect is turned on|number|3|
|bounceAnimateDuration|Animation in milliseconds when the bounce effect is turned on|number|300|
|getBounceContainer|The container that needs to be rebounded when the rebound effect is enabled, the default is the container returned by getScrollContainer or a child element of the container|() =\> HTMLElement|-|
|bounceDistanceProcessor|When the rebound effect is turned on, customize the calculation method of the distance between the finger sliding and the hand, and dis indicates the distance of touchmove|(dis: number) =\> number|(dis) => Math.min(dis, bounceScrollContainer.offsetWidth) / bounceDampRate|
|onTouchStart|Throw the outer touchstart event, which is easy to customize\. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc\.|(e?: TouchEvent) =\> void|-|
|onTouchMove|Throws the outer touchmove event, which is easy to customize\. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc\.|(e?: TouchEvent) =\> void|-|
|onTouchEnd|Throws the outer touchend event, which is easy to customize\. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc\.|(e?: TouchEvent) =\> void|-|
|onTouchCancel|Throws the outer touchcancel event, which is easy to customize\. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc\.|(e?: TouchEvent) =\> void|-|
|renderLabel|User\-defined label style|(offset?: number) =\> ReactNode|-|
|initPos|The initial position of the label, required when customized|number|0|
|children|Children elements|ReactNode|required|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
