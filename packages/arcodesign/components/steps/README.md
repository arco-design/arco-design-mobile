### 信息展示

# 步骤条 Steps

显示一个任务的进度; 或者引导用户完成某个复杂任务。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式，如果想用 css 控制 icon 颜色，可使用公共 mixin '\.set\-steps\-color(@color)'|CSSProperties|-|
|direction|步骤条方向|"vertical" \| "horizontal"|horizontal|
|align|步骤条对齐方式|"center" \| "start"|direction="horizontal" 时默认为 "center"，direction="vertical" 时默认为 "start"|
|current|指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态，传入则受控|number|-|
|iconType|步骤图标类型。在子 Step 元素中，可以通过 icon 属性覆盖图标|"number" \| "dot"|number|
|status|当前步骤的节点状态|"finish" \| "error" \| "wait" \| "process"|process|
|defaultIndex|初始 step index|number|0|
|items|步骤条自定义数据，优先级高于 Children Step 子元素|StepProps\[\]|-|
|onClick|点击步骤触事件|(current: number) =\> void|-|
|onChange|step 变化回调|(index: number) =\> void|-|
|children|子元素，优先级低于 items|ReactNode|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> Steps.Step

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|title|步骤标题|ReactNode|-|
|description|步骤说明文字|ReactNode|-|
|icon|自定义步骤图标|ReactNode|-|
|status|指定步骤状态，不配置该项时，会根据 Steps 的 current 属性自动指定状态|"finish" \| "error" \| "wait" \| "process"|-|
|align|指定对齐方式，不配置该项时，会跟随 Steps 的 align 属性值|"center" \| "start"|-|

> StepProps

|参数|描述|类型|
|----------|-------------|------|
|title|步骤标题|ReactNode|
|description|步骤说明文字|ReactNode|
|icon|自定义步骤图标|ReactNode|
|status|指定步骤状态，不配置该项时，会根据 Steps 的 current 属性自动指定状态|"finish" \| "error" \| "wait" \| "process"|
|align|指定对齐方式，不配置该项时，会跟随 Steps 的 align 属性值|"center" \| "start"|

> StepRef

|参数|描述|类型|
|----------|-------------|------|
|dom|Step 最外层元素 DOM|HTMLDivElement|
