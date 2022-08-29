### 信息展示

# 折叠面板 Collapse

折叠面板组件，支持手风琴模式。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|header|标题|ReactNode|-|
|value|折叠面板的唯一标识|string|必填|
|icon|折叠面板的展开图标|ReactNode|-|
|hideIcon|是否隐藏图标|boolean|false|
|disabled|是否不可展开|boolean|false|
|content|面板内容|ReactNode|必填|
|active|是否展开|boolean|-|
|defaultActive|默认展开情况|boolean|false|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|onCollapse|可选受控，展开折叠面板时触发|(value: string) =\> void|-|
|animationTimeout|动画时间|number|-|
|animationFunction|动画函数|string|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|组件外层dom元素|HTMLDivElement|
|head|折叠面板头部元素|HTMLDivElement|
|updateLayout|手动更新组件布局(高度计算)|() =\> void|

> Collapse.Group

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|onCollapse|可选受控，展开折叠面板时触发|(value: string) =\> void|-|
|animationTimeout|动画时间|number|-|
|animationFunction|动画函数|string|-|
|useAccordion|是否使用手风琴模式|boolean|false|
|activeItems|可选受控，可传展开的item数组，或者每个item对应的状态|string\[\]|-|
|defaultActiveItems|默认状态|string\[\]|-|
|disabled|一键禁用|boolean|false|
|items|折叠面板数组|(CollapseProps & RefAttributes\<CollapseRef\>)\[\]|-|
|children|子元素，优先级高于items|ReactNode|-|
|groupKey|区分不同 group，有group 嵌套时建议传入|string|-|

> CollapseProps

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|header|标题|ReactNode|-|
|value|折叠面板的唯一标识|string|必填|
|icon|折叠面板的展开图标|ReactNode|-|
|hideIcon|是否隐藏图标|boolean|false|
|disabled|是否不可展开|boolean|false|
|content|面板内容|ReactNode|必填|
|active|是否展开|boolean|-|
|defaultActive|默认展开情况|boolean|false|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|onCollapse|可选受控，展开折叠面板时触发|(value: string) =\> void|-|
|animationTimeout|动画时间|number|-|
|animationFunction|动画函数|string|-|

> CollapseGroupRef

|参数|描述|类型|
|----------|-------------|------|
|dom|-|HTMLDivElement|
