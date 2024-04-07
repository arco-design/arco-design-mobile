### Data Entry

# Uploader 

Uploader Component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom className|string|-|
|style|Custom stylesheet|CSSProperties|-|
|accept|Available file types|string|undefined|
|multiple|Whether to support multiple selection|boolean|-|
|capture|Whether To Support Multiple Selection \[capture MDN\](https://developer\.mozilla\.org/en\-US/docs/Web/HTML/Attributes/capture)|string \| boolean|-|
|hideStatus|Whether to hide file upload status|boolean|false|
|alwaysShowSelect|Whether to always show Select Icon|boolean|false|
|disabled|Disable select & delete image|boolean|-|
|renderDeleteArea|Defined delete area|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderLoadedArea|Defined loaded area|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderLoadingArea|Defined loading area|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderErrorArea|Defined error area|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderFileIndexArea|Defined file index area|(fileItem: FileItem, index: number) =\> ReactNode|-|
|renderUploadArea|Defined upload button area|() =\> ReactNode|-|
|renderFileList|Defined file list display|(methods: FileListMethods) =\> ReactNode|-|
|upload|Upload function|(file: CommonFileItem) =\> Promise\<CommonFileItem\>|-|
|onChange|The list of selected files changes|(fileList: CommonFileItem\[\]) =\> void|-|
|maxSize|File size limit, in K|number|-|
|onMaxSizeExceed|Image exceeds size limit|(file: File) =\> void|-|
|limit|Max pictures can choose, 0 means no restriction|number|0|
|onLimitExceed|The number of pictures exceeds the limit|(files: File\[\]) =\> void|-|
|files|Selected files list|CommonFileItem\[\]|required|
|onDeleteClick|Delete area click event|(index: number) =\> void|-|
|onUploadClick|Upload area click event|() =\> void|-|
|selectAdapter|Select adaptor|() =\> Promise\<SelectCallback\>|-|
|onClick|click event|(e: MouseEvent\<HTMLElement, MouseEvent\>, file: CommonFileItem, index: number) =\> void|-|
|onLongPress|long press event|(e: TouchEvent\<HTMLElement\>, file: CommonFileItem, index: number) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> FileItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|file|File|File|required|
|url|file Url|string|-|
|status|Image Status|"loaded" \| "loading" \| "error"|According to inner status of the image|

> FileListMethods

|Property|Description|Type|
|----------|-------------|------|
|retryUpload|Retry to upload|(index: number) =\> void|
|deleteFile|Delete file|(index: number) =\> void|

> CommonFileItem

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|url|file Url|string|-|
|file|File|File|-|
|status|Image Status|"loaded" \| "loading" \| "error"|According to inner status of the image|

> SelectCallback

|Property|Description|Type|
|----------|-------------|------|
|files|File list|AdapterFile\[\]|

> AdapterFile

|Property|Description|Type|
|----------|-------------|------|
|url|Url of file|string|
|size|File size|number|
|name|File name|string|
