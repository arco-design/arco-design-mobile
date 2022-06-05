### Data Display

# NoticeBar 

Line wrapping or scrolling effects can be customized, and circular scrolling is supported.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet, background color and text color can be directly specified here \`background\` and \`color\`|CSSProperties|-|
|children|Notification content text, if need vertical scrolling effect, you can input a Carousel|ReactNode|-|
|leftContent|Content on the left|ReactNode|-|
|rightContent|Content on the right|ReactNode|-|
|marquee|The text processing method of the notification\. When it is \`overflow\`, the text will only scroll when the length of the container exceeds the length of the container\. If it is \`none\`, the text will never scroll, and if it is \`always\`, the text will always scroll\.|"overflow" \| "none" \| "always"|"overflow"|
|closeable|Closeable|boolean|true|
|closeIcon|Custom close icon|ReactNode|\<IconClose /\>|
|wrapable|Whether line wrapping is required, when marquee=none and wrapable=false, there will be overflow ellipsis effect when the text exceeds|boolean|true|
|speed|Text scrolling speed in px/s|number|50|
|delay|Delay before text starts scrolling (ms)|number|1000|
|autoSetGradientStyle|Whether to automatically set the gradient background color based on the custom background color in the \`style\` attribute|boolean|true|
|onClick|Click on notification bar event|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClose|Callback when clicking close button|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|close|Manually close the notification bar, that is, remove the current component|() =\> void|
|updateData|Manually update the component layout|() =\> void|
