### Layout

# Grid 

The grid can divide the page into equal-width blocks in the horizontal direction for displaying content or for page navigation.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|data|grid data|GridData\[\]|required|
|columns|number of columns|number|3|
|border|Whether there is a border|boolean|false|
|gutter|spacing between grids|number \| \{ x: number; y: number; \}|0|
|shape|The shape of the grid, the optional value are circle and square|string|"square"|
|isSliding|Whether to support swipe when overflowing|boolean|false|
|direction|The direction in which the grid content is arranged, the optional value are horizontal and vertical|string|"vertical"|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> GridData

|Property|Description|Type|
|----------|-------------|------|
|img|The resource address of the input icon|ReactNode|
|title|Title text content|ReactNode|
|content|Description text|ReactNode|
|className|Custom classname|string|
|onClick|Callback when clicking|(item: GridData) =\> void|
|itemStyle|Custom style for each grid|CSSProperties|
|renderGrid|Customize the creation function of a single grid|(item: GridData, colIndex: number, rowIndex: number) =\> ReactNode|
