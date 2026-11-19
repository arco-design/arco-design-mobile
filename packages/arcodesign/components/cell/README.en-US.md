### Data Display

# Cell 

Cell, including cells and cell group, are often used to set items, forms, etc.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|icon|Cell left icon|ReactNode|-|
|label|Label name|ReactNode|-|
|desc|Description|ReactNode|-|
|text|The primary text, if there is a label name, it is to the right, otherwise it is to the left|string|-|
|children|The primary content, if there is a label name, it is to the right, otherwise it is to the left|ReactNode|-|
|showArrow|Whether to show the right arrow|boolean|-|
|arrow|Right arrow content|ReactNode|-|
|prepend|Cell prefix content, above the cell|ReactNode|-|
|append|Cell suffix content, below the cell|ReactNode|-|
|bordered|Whether there is a border|boolean|true|
|clickable|Whether to enable click effect|boolean|false|
|onClick|Callback for cell click event|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> Cell.Group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|header|custom header content|ReactNode|-|
|footer|custom footer content|ReactNode|-|
|bordered|Whether there is a border|boolean|true|
|options|Cell setting|(CellProps & RefAttributes\<CellRef\>)\[\]|-|
|children|inner cell|ReactNode|-|
|onClick|Callback of clicking the cell group|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> CellProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|icon|Cell left icon|ReactNode|-|
|label|Label name|ReactNode|-|
|desc|Description|ReactNode|-|
|text|The primary text, if there is a label name, it is to the right, otherwise it is to the left|string|-|
|children|The primary content, if there is a label name, it is to the right, otherwise it is to the left|ReactNode|-|
|showArrow|Whether to show the right arrow|boolean|-|
|arrow|Right arrow content|ReactNode|-|
|prepend|Cell prefix content, above the cell|ReactNode|-|
|append|Cell suffix content, below the cell|ReactNode|-|
|bordered|Whether there is a border|boolean|true|
|clickable|Whether to enable click effect|boolean|false|
|onClick|Callback for cell click event|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
> CellGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
