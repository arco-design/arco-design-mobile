### 信息展示

# 文本缩略 Ellipsis

文本缩略组件，支持多行缩略、富文本、自定义缩略符、尾字符过滤等。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|maxHeight|最大显示高度，单位 px，优先级高于 maxLine|number|-|
|endExcludes|文本结尾处（缩略符之前）需要过滤掉的字符|string\[\]|[]|
|reflowOnResize|容器大小变化时是否自适应，使用原生缩略时默认为 true|boolean|false|
|floatEllipsisNode|文本缩略时，缩略符节点是否浮在文本右下角（默认加渐变色背景）|boolean|false|
|onReflow|文本缩略处理的完成回调|(ellipsis: boolean, text: string) =\> void|-|
|text|需要缩略的文本内容|string|必填|
|ellipsis|是否开启缩略|boolean|true|
|maxLine|最大显示行数|number|1|
|dangerouslyUseInnerHTML|是否使用 innerHTML 插入文本（警告：务必确保 text 安全可靠，否则易导致 XSS 漏洞）|boolean|false|
|ellipsisNode|自定义缩略符节点，文本缩略时插入文本尾部|ReactNode|"..."|
|collapseNode|自定义收起符节点，不为空且文本展开时插入文本尾部|ReactNode|-|
|onEllipsisNodeClick|缩略节点点击事件|(e: MouseEvent\<HTMLSpanElement, MouseEvent\>) =\> void|-|
|onCollapseNodeClick|收起节点点击事件|(e: MouseEvent\<HTMLSpanElement, MouseEvent\>) =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|reflow|控制容器重新编排|() =\> void|
