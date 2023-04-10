### Data Display

# Ellipsis 

Text ellipsis component supports multi-line abbreviations, rich text, custom abbreviations, tail character filtering, etc.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|maxHeight|Maximum display height(unit: px), priority higher than maxLine|number|-|
|endExcludes|Characters to filter out at the end of the text (before the ellipsis)|string\[\]|[]|
|reflowOnResize|Whether to adapt when the container size changes, the default is true when using native ellipsis|boolean|false|
|floatEllipsisNode|Whether the abbreviation node is floating in the lower right corner of the text (with a gradient background by default)|boolean|false|
|onReflow|Callback when text omission processing is complete|(ellipsis: boolean, text: string) =\> void|-|
|text|Text content to be omitted|string|required|
|ellipsis|Whether to enable ellipsis|boolean|true|
|maxLine|Maximum number of displayed lines|number|1|
|dangerouslyUseInnerHTML|Whether to use innerHTML to insert text (warning: make sure the text is safe and reliable, otherwise it will easily lead to XSS vulnerabilities)|boolean|false|
|ellipsisNode|Customize the ellipsis node, insert at the end of the text when the text is omitted|ReactNode|"..."|
|collapseNode|Customize the collapse node, when the value is not empty and the text is expanded, the node is  inserted at the end of the text|ReactNode|-|
|onEllipsisNodeClick|Ellipsis node click event|(e: MouseEvent\<HTMLSpanElement, MouseEvent\>) =\> void|-|
|onCollapseNodeClick|Collapse node click event|(e: MouseEvent\<HTMLSpanElement, MouseEvent\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|reflow|Control container to reflow|() =\> void|
