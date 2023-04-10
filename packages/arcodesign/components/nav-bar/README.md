### 导航

# 导航栏 NavBar

导航栏组件，支持吸顶和沉浸式，支持在指定滚动位置展示，支持根据滚动位置实时更新style。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|导航栏中间文字，带居中和溢出省略效果|ReactNode|-|
|children|自定义导航栏主内容，当导航栏内容为Tabs等非居中文字样式时可用|ReactNode|-|
|leftContent|导航栏左侧内容|ReactNode|返回按钮|
|rightContent|导航栏右侧内容|ReactNode|-|
|style|自定义样式，背景和文字颜色可在此定义|CSSProperties|-|
|className|自定义类名|string|-|
|wrapClass|最外层元素自定义类名|string|-|
|fixed|是否吸顶|boolean|-|
|statusBarHeight|沉浸式状态栏高度|number|0|
|hasBottomLine|是否有底边框|boolean|true|
|onClickLeft|点击左侧内容回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|onClickRight|点击右侧内容回调|(e: MouseEvent\<Element, MouseEvent\>) =\> void|-|
|showOffset|展示nav\-bar的offset值，当scrollTop值小于该值时，将隐藏主内容和右侧内容，左侧内容保留|number|0|
|onShowChange|设置showOffset后，当内容显示状态发生变化后触发|(show: boolean) =\> void|-|
|placeholder|设置fixed=true时，导航栏原本的位置是否要占住|boolean|true|
|extra|额外渲染元素，与inner平级|ReactNode|-|
|getScrollContainer|自定义滚动元素，不传默认是window|() =\> HTMLElement \| Window|-|
|getComputedStyleByScroll|根据滚动offset值设置自定义style，设置该属性后将监听滚动容器的滚动事件|(offset: number) =\> CSSProperties|-|
|onScrollChange|滚动时回调，设置该属性后将监听滚动容器的滚动事件|(offset: number) =\> void|-|
|ariaLabel|无障碍aria\-label属性|string|""|
|ariaRole|无障碍role属性|string|"banner"|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|navBar|@deprecated|HTMLDivElement|
|dom|最外层元素DOM|HTMLDivElement|
