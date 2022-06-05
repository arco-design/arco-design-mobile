### Feedback

# CircleProgress 

Annular progress bar component, representing percentage progress in the form of a circle

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|percentPosition|Text display position|"center" \| "bottom"|"center"|
|showPercent|Whether to display the text inside the ring|boolean|true|
|percentage|Progress ring Percentage|number|required|
|renderPercent|The text inside the ring (a function that returns the ReactNode type, and the callback parameter is the current progress percentage)|(percentage: number) =\> ReactNode|-|
|trackColor|Track color|string|-|
|progressColor|progress ring color|string|-|
|disabled|Whether to disable|boolean|false|
|trackStroke|Track width|number|10|
|progressStroke|Progress ring width|number|12|
|progressColorStart|The start gradient color of the progress ring (when one of progressColorStart and progressColorEnd is set, the color will override the color of progressColor)|string|-|
|progressColorEnd|The end gradient color of the progress ring|string|-|
|duration|The number of milliseconds required to increase the step size|number|30|
|step|Step size (increase the step size, grow by step)|number|1|
|clockwise|Whether to increase counterclockwise|boolean|false|
|radius|Ring radius|number|-|
|filleted|Whether the ends of the progress bar are rounded|boolean|true|
|mountedTransition|Whether to animate the transition to the destination value when initializing percentage|boolean|true|
|size|Progress ring size|"mini" \| "default"|"default"|
|mountedBezier|Bezier curve of animation at initialization|\[number, number, number, number\]|[0.34, 0.69, 0.1, 1]|
|svgKey|Distinguish \`\<def\>\` content of different svg|string|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
