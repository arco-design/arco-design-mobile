### 信息展示

# 图片预览 ImagePreview

图片预览组件，支持循环轮播、双指/双击缩放、缩略图放大效果。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|images|图片信息数组|PreviewImageProps\[\]|必填|
|openIndex|打开时展示的index，在images范围内会展示弹窗，否则隐藏弹窗|number|必填|
|loop|是否可循环滑动|boolean|false|
|fit|图片布局方式，preview\-y为宽度撑满高度溢出滚动，preview\-x为高度撑满宽度溢出滚动|"preview\-y" \| "preview\-x"|"preview-y"|
|displayDuration|打开和关闭时的过渡动画|number|300|
|replaceFallbackWhenLoaded|是否在原图加载完成后将过渡图动画替换为原图动画|boolean|-|
|noselect|图片不可选中，屏蔽系统默认事件|boolean|true|
|spaceBetween|图片横向间距|number|-|
|loadingArea|自定义展示加载中内容|ReactNode|-|
|errorArea|自定义展示加载失败内容|ReactNode|-|
|showLoading|是否展示图片加载中提示|boolean|true|
|showError|是否展示图片加载失败提示|boolean|true|
|retryTime|失败时自动重试次数|number|-|
|staticLabel|是否直接渲染\<img\>标签，不走加载图片流程|boolean|-|
|scrollBezier|长图滚动变化曲线|\[number, number, number, number\]|-|
|lazyloadCount|只加载当前页相邻的n个内容，为0时会销毁所有相邻内容|number|1|
|swipeToClose|当图片滚动到边缘时，继续滑动是否关闭预览|boolean|true|
|indicatorPos|轮播索引位置|"start" \| "center" \| "end"|"start"|
|getMinScale|图片捏合时最小缩放倍数，松手后仍会恢复到1的状态，默认为0\.7|(image: HTMLImageElement, imageIndex: number) =\> number|-|
|getMaxScale|图片最大缩放倍数，默认根据图片尺寸调节|(image: HTMLImageElement, imageIndex: number) =\> number|-|
|getDoubleClickScale|当双击图片时，图片应缩放的倍数|(currentScale: number, maxScale: number, image: HTMLImageElement, imageIndex: number) =\> number|-|
|getContainer|获取挂载容器|() =\> HTMLElement|-|
|renderIndicator|自定义索引内容|(currentIndex: number, total: number, lastIndex: number) =\> ReactNode|-|
|getThumbBounds|获取缩略图定位|(index: number) =\> ClientRect|-|
|onChange|索引发生改变时回调|(index: number) =\> void|-|
|onAfterChange|索引切换，动画完成后触发|(index: number) =\> void|-|
|close|关闭弹窗|(e: MouseEvent\<HTMLDivElement, MouseEvent\> \| TouchEvent) =\> void|必填|
|onClose|关闭弹窗回调（动画执行完成后）|() =\> void|-|
|onImageClick|点击图片回调，如果返回true则阻止关闭弹窗|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> boolean \| void|-|
|onImageDoubleClick|双击图片回调|(index: number, e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onImageLongTap|长按图片回调|(index: number, image: HTMLImageElement, e: TouchEvent) =\> void|-|
|onTouchStart|弹窗内容touchstart事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchMove|弹窗内容touchmove事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|onTouchEnd|弹窗内容touchend / touchcancel事件|(e: TouchEvent, index: number) =\> boolean \| void|-|
|animateDurationSlide|手动切换轮播滑块时，当手指释放后，动画的执行时间(ms)|number|300|
|showIndicator|是否展示轮播索引|boolean|true|
|hideSingleIndicator|children 只有一个时隐藏轮播索引|boolean|true|
|percentToChange|滑动切换距离阈值(宽度比例)，范围为\[0, 1\]，如果该属性和\`distanceToChange\`属性均设置，则实际计算结果更大的生效|number|0.3|
|distanceToChange|滑动切换距离阈值(固定px宽度)，如果该属性和\`percentToChange\`属性均设置，则实际计算结果更大的生效|number|10|
|speedToChange|滑动切换速度阈值(手指从按下到抬起之间的滑动速度，单位为px/s)，与滑动切换距离阈值同时设置时，满足其中一个即生效|number|200|
|swipeable|是否响应手势滑动|boolean|true|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|imageDoms|原生图片 DOM 列表|HTMLImageElement\[\]|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|open|打开图片预览|(config: ImagePreviewProps) =\> \{ close: () =\> void; update: (newConfig: ImagePreviewProps) =\> void; \}|

> PreviewImageProps

|参数|描述|类型|
|----------|-------------|------|
|src|图片地址|string|
|fit|图片布局方式，preview\-y为宽度撑满高度溢出滚动，preview\-x为高度撑满宽度溢出滚动|"preview\-y" \| "preview\-x"|
|fallbackSrc|过渡图url|string|
|thumbPosition|缩略图填充方式（backgroundPosition），默认top center|string|
|extraNode|自定义DOM|ReactNode|

> GlobalContextParams

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|是否使用暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|

> ILocale

|参数|描述|类型|
|----------|-------------|------|
|locale|语言类型|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; prepareText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
|Picker|-|\{ okText: string; cancelText: string; \}|
|Tag|-|\{ addTag: string; \}|
|Dialog|-|\{ okText: string; cancelText: string; \}|
|SwipeLoad|-|\{ normalText: string; activeText: string; \}|
|PullRefresh|-|\{ loadingText: string; pullingText: string; finishText: string; loosingText: string; \}|
|DropdownMenu|-|\{ select: string; \}|
|Pagination|-|\{ previousPage: string; nextPage: string; \}|
|Image|-|\{ loadError: string; \}|
|ImagePicker|-|\{ loadError: string; \}|
|SearchBar|-|\{ placeholder: string; cancelBtn: string; \}|
|Stepper|-|\{ minusButtonName: string; addButtonName: string; \}|
|Keyboard|-|\{ confirm: string; \}|
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; string: \{ \.\.\.; \}; array: \{ \.\.\.; \}; object: \{ \.\.\.; \}; boolean: \{ \.\.\.; \}; \}|
