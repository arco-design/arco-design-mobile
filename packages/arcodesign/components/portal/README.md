### 其他

# 自定义挂载 Portal

React.createPortal的简单封装。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|children|被挂载的内容|ReactNode|-|
|getContainer|容器获取函数|() =\> HTMLElement|() => document.body|
