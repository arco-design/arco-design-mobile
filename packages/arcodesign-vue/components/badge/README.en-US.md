### Data Display

# Badge

Display the badge number or small red dot in the upper right corner

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|visible|Whether to display the badge, there is an animation transition when the visible status switch|boolean|true|
|text|badge text|ReactText|-|
|dot|show as a red dot|boolean|false|
|maxCount|Maximum full impression number, it will be displayed "\+" beyond the number|number|99|
|absolute|Whether the badge is placed in the upper right corner|boolean|false|
|bordered|Whether the badge has a white border|boolean|false|
|transitionName|Transition name. If you change the name, you need to customize the transition css rules|string|"badge-scale"|
