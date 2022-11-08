### Data Display

# Steps 

Display the progress of a task, or guide users to complete a complex task.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet\. If want to use CSS to control icon color, use public mixin ' set\-steps\-color(|CSSProperties|-|
|direction|Step bar direction|"vertical" \| "horizontal"|horizontal|
|align|Step alignment|"center" \| "start"|"center" when direction="horizontal" and "start" when direction="vertical"|
|current|Specify the current step, counting from 0\. In the step children elements, the status can be overwritten through the status, and it is controlled if it is input|number|-|
|iconType|Steps icon type\. In the children step elements , the icons can be overridden by the property icon|"number" \| "dot"|number|
|status|Status of the current step|"finish" \| "error" \| "wait" \| "process"|process|
|defaultIndex|Default step index|number|0|
|items|Custom data of step bar, which takes precedence over children elements of steps component|StepProps\[\]|-|
|onClick|Callback when clicking the step|(current: number) =\> void|-|
|onChange|Callback when step changes|(index: number) =\> void|-|
|children|Child element, with priority lower than items|ReactNode|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Steps.Step

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Step title|ReactNode|-|
|description|Step description|ReactNode|-|
|icon|Custom step Icon|ReactNode|-|
|status|Specify the step status\. When this item is not input, the status will be automatically specified according to the current property of steps|"finish" \| "error" \| "wait" \| "process"|-|
|align|Specify the step alignment\. When this item is not input, it will be automatically specified according to the align property of steps|"center" \| "start"|-|

> StepProps

|Property|Description|Type|
|----------|-------------|------|
|title|Step title|ReactNode|
|description|Step description|ReactNode|
|icon|Custom step Icon|ReactNode|
|status|Specify the step status\. When this item is not input, the status will be automatically specified according to the current property of steps|"finish" \| "error" \| "wait" \| "process"|
|align|Specify the step alignment\. When this item is not input, it will be automatically specified according to the align property of steps|"center" \| "start"|

> StepRef

|Property|Description|Type|
|----------|-------------|------|
|dom|Outermost element DOM of the Step|HTMLDivElement|
