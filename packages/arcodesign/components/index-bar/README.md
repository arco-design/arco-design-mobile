### 导航

# 索引栏 IndexBar

索引栏组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|defaultIndex|默认要激活的索引|ReactText|-|
|disableSidebar|是否开启侧边栏功能|boolean|false|
|sticky|是否开启索引的自动吸顶效果|boolean|true|
|groups|索引栏内容|IndexBarGroupItem\<IndexBarBaseData\>\[\]|-|
|children|自定义内容的渲染，内容必须是IndexBar\.Group组件|ReactNode|-|
|tipType|侧边栏索引提示的样式类型 \- sweat 水滴形 \- toast 轻提示 \- none 关闭提示|"none" \| "sweat" \| "toast"|"toast"|
|scrollDuration|手动调用scrollToIndex时，滚动动画的执行时间|number|0|
|scrollBezier|手动调用scrollToIndex时，滚动的动画曲线|\[number, number, number, number\]|-|
|onChange|激活的索引改变时的回调，第一个参数是新的索引，第二个参数是改变方式：\- swipe 手动滑动页面触发变化 \- sidebar 侧边栏点击触发变化 \- manual 手动调用scrollToIndex触发|(index: ReactText, trigger: IndexBarChangeTrigger) =\> void|-|
|onGroupItemClick|IndexBar\.Group中某个子项被点击时的回调，使用JSX的写法时该回调不会生效，请在IndexBar\.Group上绑定对应属性|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> void|-|
|renderSideBarItem|自定义侧边栏每个子项的内容渲染|(index: ReactText) =\> ReactNode|-|
|renderSideBar|自定义侧边栏渲染|(Content: ReactNode) =\> ReactElement\<any, string \| ((props: any) =\> ReactElement\<any, any\>) \| (new (props: any) =\> Component\<any, any, any\>)\>|-|
|renderTip|自定义使用侧边栏改变索引时，渲染提示的内容|(index: ReactText) =\> ReactNode|-|
|renderStickyItem|自定义IndexBar\.Group的索引标题内容渲染，使用JSX的写法时该回调不会生效，请在IndexBar\.Group上绑定对应属性|(index: ReactText) =\> ReactNode|-|
|renderGroupItem|自定义IndexBar\.Group的子项内容渲染，使用JSX的写法时该回调不会生效，请在IndexBar\.Group上绑定对应属性|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> ReactNode|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|
|scrollToIndex|手动滚动到指定的索引位置|(index?: ReactText, rightNow?: boolean) =\> void|
|recalculatePosition|局部滚动模式下，如果容器外部还有嵌套滚动，可主动调用此方法，让 sticky 的元素主动更新 fixed 位置|(index?: ReactText) =\> void|

> IndexBar.Group

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|children|自定义内容的渲染，有自定义内容优先渲染自定义内容，否则渲染list传递的数据|ReactNode|-|
|listKey|自定义提取List的key作为列表渲染的key，默认选取listItem的所在数组位置|(data: IndexBarBaseData, listItemIndex: number) =\> ReactText|-|
|onGroupItemClick|IndexBar\.Group中某个子项被点击时的回调|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> void|-|
|renderStickyItem|自定义IndexBar\.Group的索引标题内容渲染|(index: ReactText) =\> ReactNode|-|
|renderGroupItem|自定义IndexBar\.Group的子项内容渲染|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> ReactNode|-|
|index|IndexBarGroup对应的索引|ReactText|必填|
|list|IndexBarGroup中要渲染的列表数据，如果已经传递了children这个属性，则list这个属性不会生效|IndexBarBaseData\[\]|-|

> IndexBarGroupItem

|参数|描述|类型|
|----------|-------------|------|
|Data|-|any|
|index|IndexBarGroup对应的索引|ReactText|
|list|IndexBarGroup中要渲染的列表数据，如果已经传递了children这个属性，则list这个属性不会生效|IndexBarBaseData\[\]|

> IndexBarBaseData

|参数|描述|类型|
|----------|-------------|------|
|content|内容|ReactNode|

> IndexBarTipType

```
"none" | "sweat" | "toast"
```

> IndexBarChangeTrigger

```
"swipe" | "manual" | "sidebar"
```

> IndexBarGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|
