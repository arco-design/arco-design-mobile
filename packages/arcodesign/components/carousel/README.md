### 信息展示

# 轮播图 Carousel

轮播组件，支持自定义轮播索引样式及滑块宽度。**需要注意的是，如果正使用`fastclick`，需要为 touchstart 的 target 添加`needsclick`类**（<a href="https://github.com/ftlabs/fastclick#ignore-certain-elements-with-needsclick" target="_blank">详情戳这里</a>），以规避`fastclick`逻辑与组件内部的手势冲突。（如果使用了`list`属性则无需额外添加）

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|样式类名|string|-|
|wrapStyle|最外层容器自定义样式|CSSProperties|-|
|style|内层轮播容器自定义样式|CSSProperties|-|
|children|轮播内部内容|ReactNode|-|
|list|轮播图片列表，省略子元素的简写，传入图片url数组，也可通过\`text\`指定图片底部的蒙层文字内容|CarouselListItem\[\]|-|
|animateDuration|自动切换轮播滑块时，动画的执行时间(ms)|number|500|
|animateDurationSlide|手动切换轮播滑块时，当手指释放后，动画的执行时间(ms)|number|300|
|loop|是否开启循环轮播，当指定轮播滑块宽度时该属性不生效|boolean|true|
|autoPlay|是否开启自动播放|boolean|true|
|autoPlayDirection|自动播放方向|"normal" \| "reverse"|"normal"|
|swipeable|是否响应手势滑动|boolean|true|
|stayDuration|开启自动播放时，每一个滑块的停留时间(ms)|number|4000|
|boxWidth|指定容器宽度，默认为基于父容器100%|ReactText|-|
|boxHeight|指定容器高度，默认为自适应高度；当设置\`vertical=true\`时，该属性为必填|ReactText|-|
|baseBoxWidth|指定初始容器宽度，常用于ssr首屏初始化，水平轮播时可用|number|-|
|baseBoxHeight|指定初始容器宽度，常用于ssr首屏初始化，垂直轮播时可用|number|-|
|width|指定轮播滑块宽度，为0或不传时为默认的父容器宽度|number|0|
|height|指定轮播滑块高度，如不指定则为自适应高度|number|-|
|initialIndex|默认选中的滑块索引|number|0|
|renderIndicator|自定义轮播索引|(currentIndex: number, total: number, lastIndex: number) =\> ReactNode|-|
|indicatorPos|轮播索引位置|"start" \| "center" \| "end"|"center"|
|indicatorVerticalPos|垂直轮播索引横向位置|"left" \| "right"|"left"|
|indicatorOutside|轮播索引是否放轮播图外面|boolean|-|
|showIndicator|是否展示轮播索引|boolean|true|
|hideSingleIndicator|children 只有一个时隐藏轮播索引|boolean|true|
|indicatorType|轮播索引样式类型|"square" \| "circle"|"square"|
|indicatorClass|轮播索引类名|string|-|
|indicatorInverse|轮播索引是否反色，默认根据索引是否放在外面决定|boolean|-|
|spaceBetween|子元素间距|number|0|
|offsetBetween|前后两端露出距离，设置值时不能循环轮播|number \| \{ left?: number; right?: number; \}|0|
|currentIndex|手动控制当前展示元素|number|-|
|autoHeight|容器高度自适应|boolean|false|
|percentToChange|滑动切换距离阈值(宽度比例)，范围为\[0, 1\]，如果该属性和\`distanceToChange\`属性均设置，则实际计算结果更大的生效|number|0.3|
|distanceToChange|滑动切换距离阈值(固定px宽度)，如果该属性和\`percentToChange\`属性均设置，则实际计算结果更大的生效|number|10|
|speedToChange|滑动切换速度阈值(手指从按下到抬起之间的滑动速度，单位为px/s)，与滑动切换距离阈值同时设置时，满足其中一个即生效|number|200|
|vertical|是否垂直轮播，设置后\`boxHeight\`属性必填|boolean|-|
|lazyloadCount|只加载当前页相邻的n个内容，为0时会销毁所有相邻内容，不传则加载所有内容|number|-|
|stopTouchThreshold|触发onTouchStopped的最小阈值|number|0|
|bounceWhenNoLoop|当不可循环时，是否开启滑动到最前或最后时的回弹效果|boolean|false|
|bounceDampRate|当开启最前或最后时的回弹效果时的阻尼系数|number|3|
|inactiveScale|非active的滑块的大小比例，\[0, 1\]的小数，设置后切换时将有放大效果|number|-|
|stopPropagation|触摸事件是否需要 stopPropagation|boolean|true|
|fakeItem|是否需要fake首尾item，用于offsetBetween不等于0时循环轮播的衔接|boolean|false|
|allowEndBlank|滑动到最后时是否允许留白，仅在loop=false且设置了width时有效|boolean|false|
|iOSVisibleOptimize|在iOS下是否需要在切屏时做DOM强刷优化，用于修复iOS息屏时自动播放的蜜汁渲染问题|boolean|true|
|distanceProcessor|自定义手指滑动跟手的距离计算方式，posDis表示touchmove的距离，wrapSize表示容器在滑动方向的尺寸，childSize表示滑块在滑动方向的尺寸|(posDis: number, wrapSize: number, childSize: number) =\> number|(posDis, wrapSize, childSize) => childSize * (posDis / wrapSize)|
|getInnerScrollContainer|组件内部的滚动容器，用于豁免滑动事件响应|() =\> HTMLElement \| HTMLElement\[\]|-|
|onTouchStopped|当轮播不支持循环且滑到最前面或最后面，还想再滑动时触发|(direction: 1 \| \-1) =\> void|-|
|onChange|轮播滑块切换时触发|(index: number) =\> void|-|
|onAfterChange|轮播滑块切换，动画完成后触发|(index: number, oldIndex: number) =\> void|-|
|onTouchStart|轮播内容touchstart事件|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTouchMove|轮播内容touchmove事件|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTouchEnd|轮播内容touchend / touchcancel事件|(e: TouchEvent, total: number, index: number) =\> boolean \| void|-|
|onTransitionStart|轮播切换动画开始时回调|() =\> void|-|
|onTransitionEnd|轮播切换动画结束时回调|() =\> void|-|
|onDistanceChange|轮播左右滑动时回调，用于监听滑动距离以做滑动同步交互|(distance: number, wrapSize: number, activeIndex: number) =\> void|-|
|onPageVisibleChange|自定义页面展示隐藏监听，默认在document监听visibilitychange事件，返回function用于在组件卸载时移除监听|(updateWhenVisible: () =\> void, updateWhenInvisible: () =\> void) =\> () =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|wrap|轮播图子项包裹容器 DOM，承载了 touch 相关事件|HTMLDivElement|
|items|轮播图每个子项的 DOM|HTMLDivElement\[\]|
|noLoop|在某些条件下内部会禁用循环轮播，这里表示循环是否被禁用|boolean|
|updateData|手动重新计算布局|() =\> void|
|changeIndex|手动更新当前选中索引，rightNow 表示是否立刻跳转到目标索引，否则执行过渡动画到目标索引|(newIndex: number, rightNow?: boolean, direction?: "left" \| "right") =\> void|

> CarouselListItem

|参数|描述|类型|
|----------|-------------|------|
|src|图片链接|string|
|text|图片底部固定的文字|ReactNode|
|onClick|点击图片回调|(e: MouseEvent\<HTMLImageElement, MouseEvent\>) =\> void|
