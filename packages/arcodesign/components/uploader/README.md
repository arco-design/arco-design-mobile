### 数据录入

# 文件上传 Uploader

文件上传组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|accept|可以选择的文件类型|string|undefined|
|multiple|是否支持多选|boolean|-|
|capture|文件选取模式 File selection mode \[capture MDN\](https://developer\.mozilla\.org/en\-US/docs/Web/HTML/Attributes/capture)|string \| boolean|-|
|hideStatus|是否隐藏文件上传状态|boolean|false|
|alwaysShowSelect|是否总是展示选择Icon，默认情况下当文件数量超出limit值时会自动隐藏选择Icon|boolean|false|
|disabled|禁用选择和删除图片|boolean|-|
|renderDeleteArea|自定义删除区域|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderLoadedArea|自定义上传成功区域|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderLoadingArea|自定义上传中区域|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderErrorArea|自定义上传失败区域|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderFileIndexArea|自定义文件索引区域|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderUploadArea|自定义上传按钮区域|() =\> ReactNode|-|
|renderFileList|自定义上传文件列表展示|(methods: FileListMethods) =\> ReactNode|-|
|upload|上传方法|(file: CommonFileItem) =\> Promise\<CommonFileItem\>|-|
|onChange|已选文件列表发生变化|(fileList: CommonFileItem\[\]) =\> void|-|
|maxSize|文件大小限制，单位为K|number|-|
|onMaxSizeExceed|文件超过限制大小|(file: File) =\> void|-|
|limit|最多选择文件数，超出数量自动隐藏上传按钮，0表示不做限制|number|0|
|onLimitExceed|选择文件数超过限制|(files: File\[\]) =\> void|-|
|files|已选择文件列表|CommonFileItem\[\]|必填|
|onDeleteClick|删除点击事件|(index: number) =\> void|-|
|onUploadClick|上传文件点击事件|() =\> void|-|
|selectAdapter|文件选择适配器|() =\> Promise\<SelectCallback\>|-|
|onClick|文件点击|(e: MouseEvent\<HTMLElement, MouseEvent\>, file: CommonFileItem, index: number) =\> void|-|
|onLongPress|文件长按事件|(e: TouchEvent\<HTMLElement\>, file: CommonFileItem, index: number) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|

> FileItem

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|file|文件|File|必填|
|url|文件地址|string|-|
|status|文件状态|"loaded" \| "loading" \| "error"|以文件自身加载状态而定|

> FileListMethods

|参数|描述|类型|
|----------|-------------|------|
|retryUpload|重新上传|(index: number) =\> void|
|deleteFile|删除文件|(index: number) =\> void|

> CommonFileItem

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|url|文件地址|string|-|
|file|文件|File|-|
|status|文件状态|"loaded" \| "loading" \| "error"|以文件自身加载状态而定|

> SelectCallback

|参数|描述|类型|
|----------|-------------|------|
|files|文件列表|AdapterFile\[\]|

> AdapterFile

|参数|描述|类型|
|----------|-------------|------|
|url|文件 url|string|
|size|文件大小|number|
|name|文件名|string|
