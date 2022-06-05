### 其他

# 动画过渡 Transition

react-transition-group/CSSTransition 的简单封装。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|children|待执行动画内容|ReactNode|-|
|type|待执行动画css类名|string|必填|
|in|内容是否可见|boolean|必填|
|timeout|执行动画时间|number \| \{ appear?: number; enter?: number; exit?: number; \}|必填|
|mountOnEnter|是否在打开时再加载内容|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
