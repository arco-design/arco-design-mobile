### Data Display

# Badge 

Display the badge number or small red dot in the upper right corner

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|visible|Whether to display the badge, there is an animation transition when the visible status switch|boolean|true|
|text|badge text|ReactText|-|
|dot|show as a red dot|boolean|false|
|maxCount|Maximum full impression number, it will be displayed "\+" beyond the number|number|99|
|children|Badge content|ReactNode|-|
|absolute|Whether the badge is placed in the upper right corner|boolean|false|
|bordered|Whether the badge has a white border|boolean|false|
|timeout|Animation duration(ms)|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
