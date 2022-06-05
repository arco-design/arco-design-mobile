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
