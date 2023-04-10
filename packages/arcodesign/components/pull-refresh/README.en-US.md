### Others

# PullRefresh 

PullRefresh component that pulls down to refresh data.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|type|Different implementation methods of PullRefresh, android \- conventional outer container transform, ios \- use ios scrollTop negative value to achieve pull\-down and rebound (performance is better than transform), only available for ios\. After specifying value, the priority is higher than useIosOptimize|"ios" \| "android"|Follow the system|
|useIosOptimize|Whether to use the negative value of scrollTop on ios to achieve pull\-down and rebound instead of transform\. After closing, all models use transform|boolean|false|
|children|Children element|ReactNode|required|
|className|Custom classname|string|-|
|style|Custom style|CSSProperties|-|
|disabled|Whether to be disabled|boolean|false|
|finishDelay|After the loading is completed, the time to display the loading completion (ms)|number|300|
|loosingText|Displayed element when pulled down to releasable (Invalid in type iOS)|ReactNode|-|
|loadingText|Loading displayed element|ReactNode|-|
|pullingText|Displayed element when pulling down|ReactNode|-|
|finishText|Loaded displayed element|ReactNode|-|
|initialText|The display element in the initial state when  has not been pulled down|ReactNode|pullingText属性值|
|dampRate|Damping coefficient (Invalid in type iOS)|number|4|
|onRefresh|Callback when refreshing|() =\> Promise\<void\>|-|
|useHideAsNestedScroll|Whether to hide the display element during inertial sliding|boolean|true|
|loosingMinHeight|Minimum distance to release brushable lines (px)|number|loosingText Height|
|allowPullWhenNotTop|Swiping down when not scrolling to the top also allows a pull\-down refresh to be triggered, which may affect the ios bounce animation effect|boolean|false|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|refresh|Actively trigger the refresh, and return asynchronously after the animation is completed|() =\> Promise\<void\>|
|updateIOSHeight|Manually update IOS container height|() =\> void|
