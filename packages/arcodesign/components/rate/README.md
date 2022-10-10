### 数据录入

# 评分 Rate

评分组件，支持受控模式

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|defaultValue|默认评分|number|0|
|value|当前评分(受控)|number|-|
|count|图标数量|number|5|
|step|每个图标的分值|number|1|
|color|选中时颜色|string|-|
|normalColor|未选中时颜色|string|-|
|disabledColor|禁用时颜色|string|-|
|allowHalf|是否允许半选|boolean|false|
|disabled|是否为禁用状态|boolean|false|
|size|自定义图标大小|ReactText|-|
|offset|自定义图标间距(点击热区包含间距)|ReactText|-|
|icons|自定义图标|\{ normal: RateIconType; active: RateIconType; halfActive?: RateIconType; \}|-|
|onChange|当前分值变化触发的事件|(value: number) =\> void|(value) => void|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
