### Data Display

# Tag 

Tag component, supports tags and tag groups.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|type|Style type\. primary represents the basic type, hollow represents the hollow type, and solid represents the solid type|"primary" \| "hollow" \| "solid"|"primary"|
|icon|Icon|ReactNode|-|
|children|Children element of tag|ReactNode|-|
|size|Tag size|"medium" \| "large" \| "small"|"medium"|
|color|Text color|string|-|
|bgColor|Background color|string|-|
|borderColor|Border color|string|-|
|borderStyle|Border style|"solid" \| "none" \| "dotted" \| "dashed"|"solid"|
|halfBorder|Whether it is a 0\.5px border|boolean|true|
|closeable|whether there is a close button|boolean|-|
|closeIcon|Close button content|ReactNode|-|
|closeColor|Close button color|string|-|
|filleted|Whether it has rounded corners|boolean|-|
|onClose|Callback when clicking the close button|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClick|Callback when clicking the tag|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Tag.List

Tag list, support dynamic editing of tags

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|list|Tag List|(TagProps & RefAttributes\<TagRef\>)\[\]|required|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|type|Style type, primary represents the basic type, hollow represents the hollow type, and solid represents the solid type|"primary" \| "hollow" \| "solid"|-|
|showAddButton|Whether to display the add tag button|boolean|true|
|addArea|Customize the add tag button|ReactNode|-|
|horizontalPadding|Horizontal spacing of tags|ReactText|-|
|verticalPadding|Vertical spacing of tags|ReactText|-|
|onAdd|Callback when clicking the add tag button|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClose|Callback when clicking the close tag button|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> TagProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|type|Style type\. primary represents the basic type, hollow represents the hollow type, and solid represents the solid type|"primary" \| "hollow" \| "solid"|"primary"|
|icon|Icon|ReactNode|-|
|children|Children element of tag|ReactNode|-|
|size|Tag size|"medium" \| "large" \| "small"|"medium"|
|color|Text color|string|-|
|bgColor|Background color|string|-|
|borderColor|Border color|string|-|
|borderStyle|Border style|"solid" \| "none" \| "dotted" \| "dashed"|"solid"|
|halfBorder|Whether it is a 0\.5px border|boolean|true|
|closeable|whether there is a close button|boolean|-|
|closeIcon|Close button content|ReactNode|-|
|closeColor|Close button color|string|-|
|filleted|Whether it has rounded corners|boolean|-|
|onClose|Callback when clicking the close button|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onClick|Callback when clicking the tag|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> TagListRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
