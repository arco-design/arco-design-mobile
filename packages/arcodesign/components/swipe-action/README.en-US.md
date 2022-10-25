### FeedBack

# SwipeAction 

SwipeAction component, slide left and right to pull out the menu bar

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom style|CSSProperties|-|
|children|Inner Content|ReactNode|required|
|rightActions|right Menu|Action\[\]|-|
|leftActions|left Menu|Action\[\]|-|
|closeOnTouchOutside|Click outside for auto return|boolean|false|
|threshold|How far the menu slides off/off automatically ranges from 0 to 1|number|0.15|
|disabled|Whether to disable|boolean|false|
|transitionDuration|Animation execution time in ms|number|300|
|dampRate|Damping coefficient|number|15|
|openStyleType|The style type when the menu slides in\. layer \- the menu is stacked in layers; push \- the menu is pushed directly in sequence|"layer" \| "push"|"layer"|
|onOpen|Triggered when the slide out animation ends|(direction: "left" \| "right") =\> void|-|
|onClose|Triggered when the slide in animation ends|(direction: "left" \| "right") =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|close|Bring the slider back into position|() =\> void|
|open|Open the slider, the right by default|(direction: "left" \| "right") =\> void|

> Action

|Property|Description|Type|
|----------|-------------|------|
|text|Custom Content|ReactNode|
|icon|Custom Icon|ReactNode|
|style|Custom Style|CSSProperties|
|className|Custom Style|string|
|onClick|Clicking the event to return true prevents the menu from closing|() =\> boolean \| void \| Promise\<boolean \| void\>|
|children|Child elements do not pass children with text or icon|ReactNode|
