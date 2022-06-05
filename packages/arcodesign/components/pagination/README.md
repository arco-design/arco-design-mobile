### 导航

# 分页器 Pagination

用于数据分页，为完全受控组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|type|分页器翻页区域样式类型，button表示按钮式分页器，text表示文本式分页器，none表示仅保留页码不含翻页区域|"button" \| "text" \| "none"|"button"|
|icon|是否需要展示图标|ReactNode \| \[\.\.\.\]|false|
|justify|翻页按钮水平位置，side表示两端对齐，center表示居中对齐|"center" \| "side"|"side"|
|current|当前页码|number|1|
|pageSize|每页条数|number|10|
|total|数据总条数|number|0|
|hideOnOnePage|只有一页时是否隐藏分页器|boolean|false|
|nextFieldType|下一页样式，primary表示高亮|"default" \| "primary"|"default"|
|prevFieldText|上一页文本|string|"上一页"|
|nextFieldText|下一页文本|string|"下一页"|
|renderPrevField|渲染前翻页按钮|(data: IPaginationDataParams) =\> ReactNode|-|
|renderNextField|渲染后翻页按钮|(data: IPaginationDataParams) =\> ReactNode|-|
|onChange|点击前/后翻页按钮时调用|(data: IPaginationDataParams) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> IPaginationDataParams

|参数|描述|类型|
|----------|-------------|------|
|current|当前页|number|
|pageSize|每页条数|number|
|pageNum|总页数|number|
