### 反馈

# 滑动操作 SwipeAction

滑动操作组件，左右滑动拉出菜单栏

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|children|子元素|ReactNode|必填|
|rightActions|右侧菜单|Action\[\]|-|
|leftActions|左侧菜单|Action\[\]|-|
|closeOnTouchOutside|点击外部是否自动归位|boolean|false|
|threshold|菜单滑出多少距离后自动滑出/关闭的系数 范围 0\-1|number|0.15|
|disabled|是否禁用|boolean|false|
|transitionDuration|动画的执行时间 (单位ms)|number|300|
|dampRate|阻尼系数|number|15|
|openStyleType|菜单滑入时的样式类型，layer \- 分层堆叠进入，push \- 直接依次推入|"layer" \| "push"|"layer"|
|onOpen|滑出动画结束后触发|(direction: "left" \| "right") =\> void|-|
|onClose|滑入动画结束后触发|(direction: "left" \| "right") =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|close|使滑动条归位|() =\> void|
|open|打开滑动条，默认打开右边|(direction: "left" \| "right") =\> void|

> Action

|参数|描述|类型|
|----------|-------------|------|
|text|自定义内容|ReactNode|
|icon|自定义图标|ReactNode|
|style|自定义样式|CSSProperties|
|className|自定义类名|string|
|onClick|点击事件 返回true可以阻止菜单的关闭|() =\> boolean \| void \| Promise\<boolean \| void\>|
|children|子元素没有text或者icon的传递children|ReactNode|
