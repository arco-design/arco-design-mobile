### Feedback

# Progress 

Progress bar, which can display progress according to the percentage passed in from the outside

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|percentPosition|Text display position|"left" \| "innerLeft" \| "right" \| "follow"|"center"|
|showPercent|Whether to display the text inside the progress bar|boolean|true|
|percentage|Progress percentage|number|required|
|renderPercent|The text display inside the progress bar (a function that returns the ReactNode type, and the callback parameter is the current progress percentage)|(percentage: number) =\> ReactNode|-|
|trackColor|Track color|string|-|
|progressColor|Progress bar color|string|-|
|disabled|Whether to be disabled|boolean|false|
|trackStroke|Track thickness|number|Generally the default is 4, when percentPosition=innerLeft is 18, when mode=nav is 2|
|progressStroke|progress bar thickness|number|Inherit trackStroke value|
|duration|The number of milliseconds required to increase the step size|number|300|
|step|Step size (increase the step size, grow by step)|number|1|
|filleted|Whether the progress bar has rounded corners at both ends|boolean|true|
|mountedTransition|Whether to animate the transition to the destination value when initializing percentage|boolean|true|
|mountedBezier|Animated bezier curves at initialization|BezierType|[0.34, 0.69, 0.1, 1]|
|mode|The mode can be selected as nav or base mode|"nav" \| "base"|"base"|
|top|The distance from the top of the screen (only valid when mode is "nav")|number|0|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> PercentPosition

```
"left" | "innerLeft" | "right" | "follow"
```
