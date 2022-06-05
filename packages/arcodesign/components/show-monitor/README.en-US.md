### Others

# ShowMonitor 

Use scroll events to monitor whether children enter or leave the viewport.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|getScrollContainer|Scroll viewport selector|() =\> HTMLElement \| Window|() => window|
|throttle|Throttle granularity(ms)|number|300|
|listenResize|Whether to monitor resize|boolean|true|
|listenScroll|Whether to monitor scroll|boolean|true|
|once|Only listen for changes once, if true, only trigger onVisibleChange once when entering the viewport|boolean|false|
|overflow|Whether it is a local scroll|boolean|false|
|threshold|Threshold of callback triggered when element enters viewport area, \[0\-1\]|number|0|
|offset|Preload advance amount \[offsetTop, offsetRight, offsetBottom, offsetLeft\]\. If the type is number, it is equivalent to \[number, number, number, number\]; If the type is \[number1, number2\], it is equivalent to \[number1, 0, number2, 0\]; Browsers that support Intersection Observer need to use getScrollContainer to set the parent container|number \| \[number, number\] \| \[number, number, number, number\]|0|
|children|Children nodes|ReactNode|required|
|disabled|Whether to disable monitoring|boolean|false|
|onVisibleChange|Callback for entering or leaving the viewport|(visible: boolean, node: HTMLDivElement) =\> void|required|
|onClick|点击组件的回调事件|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|checkVisible|Ignore the state of the element before and after, manually check whether the element is in the viewport, trigger the onVisibleChange callback function|() =\> boolean|
