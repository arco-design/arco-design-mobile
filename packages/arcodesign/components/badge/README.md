### 信息展示

# 徽标 Badge

在右上角展示徽标数字或小红点

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|visible|是否展示徽标，visible切换时有动画过渡|boolean|true|
|text|徽标文案|ReactText|-|
|dot|显示为一个小红点|boolean|false|
|maxCount|最大完整展示数字，超出后将展示 \+|number|99|
|children|内容|ReactNode|-|
|absolute|是否置于右上角|boolean|false|
|bordered|是否有白色边框|boolean|false|
|timeout|动画持续时间(ms)|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
