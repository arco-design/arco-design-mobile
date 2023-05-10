### 反馈

# 左滑加载 SwipeLoad

向左滑动到达屏幕边缘后，超过一定距离时触发加载，常用于横划展示少量的元素，滑动到底后跳转至另外界面的场景

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|disabled|是否禁用组件|boolean|false|
|maxElementOffset|页面元素允许划动的最大距离|number|56|
|maxLabelOffset|label移动的最大距离|number|40|
|minConfirmOffset|页面允许触发的临界值(通常小于maxLabelOffset)|number|30|
|onConfirm|释放触发的函数(跳转，加载等)|() =\> void|必填|
|circleSize|圆形的直径|number|80|
|labelAnimationDuration|恢复动效时长(ms)|number|250|
|labelAnimationFunction|恢复动效函数|string|"cubic-bezier(0.14, 1, 0.34, 1)"|
|damping|阻尼动效参数，使用函数x = X/(aX\+b)，其中X代表当前滑动距离，传入的值代表\[a, b\]|\[number, number\]|[0.013312, 1.636345]|
|getScrollContainer|得到滚动容器|() =\> HTMLElement|-|
|normalText|标签初始文案|string|"更多"|
|activeText|触发跳转文案|string|"释放查看"|
|bounceWhenBumpBoundary|触碰左侧边界时是否需要回弹效果|boolean|false|
|bounceDampRate|当开启回弹效果时的阻尼系数|number|3|
|bounceAnimateDuration|当开启回弹效果时的动画毫秒时间|number|300|
|getBounceContainer|回弹效果开启时需要回弹的容器，默认为 getScrollContainer 返回的容器或容器的一个子元素|() =\> HTMLElement|-|
|bounceDistanceProcessor|当开启回弹效果时自定义手指滑动跟手的距离计算方式，dis表示touchmove的距离|(dis: number) =\> number|(dis) => Math.min(dis, bounceScrollContainer.offsetWidth) / bounceDampRate|
|onTouchStart|抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突|(e?: TouchEvent) =\> void|-|
|onTouchMove|抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突|(e?: TouchEvent) =\> void|-|
|onTouchEnd|抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突|(e?: TouchEvent) =\> void|-|
|onTouchCancel|抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突|(e?: TouchEvent) =\> void|-|
|renderLabel|用户自定义标签样式|(offset?: number) =\> ReactNode|-|
|initPos|标签的初始位置 自定义必传|number|0|
|children|子元素|ReactNode|必填|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
