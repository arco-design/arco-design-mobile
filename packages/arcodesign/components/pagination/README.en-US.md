### Navigation

# Pagination 

The pagination component is used for data paging and is a fully controlled component.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom style|CSSProperties|-|
|type|The style type of the page turning area of the pagination, and none means that only the page number is kept without the page turning area|"button" \| "text" \| "none"|"button"|
|icon|Whether to show the icon|ReactNode \| \[\.\.\.\]|false|
|justify|The horizontal position of the page turning button, side means both ends are aligned, center means center alignment|"center" \| "side"|"side"|
|current|Current page|number|1|
|pageSize|Number of items per page|number|10|
|total|Total number of data source|number|0|
|hideOnOnePage|Whether to hide the pager when there is only one page|boolean|false|
|nextFieldType|Style of next page button, primary means highlight|"default" \| "primary"|"default"|
|prevFieldText|Previous page text|string|"上一页"|
|nextFieldText|Next page text|string|"下一页"|
|renderPrevField|Custom render previous page button|(data: IPaginationDataParams) =\> ReactNode|-|
|renderNextField|Custom render next page button|(data: IPaginationDataParams) =\> ReactNode|-|
|onChange|Callback called when the previous/next page button is clicked|(data: IPaginationDataParams) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> IPaginationDataParams

|Property|Description|Type|
|----------|-------------|------|
|current|Current page|number|
|pageSize|Number of items per page|number|
|pageNum|Total number of pages|number|
