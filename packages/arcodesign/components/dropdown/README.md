### 导航

# 下拉面板 Dropdown

下拉面板，展示供选择的选择项

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|showDropdown|是否展开下拉框|boolean|必填|
|options|展示的选项,优先级低于dropdownNode|OptionsItem\[\]|[]|
|children|自定义下拉框元素|ReactNode|-|
|onCancel|取消选择|() =\> void|必填|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|extraNode|下拉框底部元素|ReactNode|-|
|top|定位下拉框出现的位置|number|-|
|bottom|向上展开时下拉框出现的位置|number|-|
|direction|展开方向|"up" \| "down"|"down"|
|height|受控模式，下拉框高度|number|-|
|maxHeight|下拉框最大的高度|number|500|
|clickOtherToClose|点击其他区域是否取消选择|boolean|true|
|touchToClose|是否在触发touchstart时就取消选择，否则在click之后再取消选择|boolean|true|
|dropdownAnimationTimeout|展开收起动画的时间|number|300|
|dropdownAnimationFunction|展开收起动画曲线函数|string|"cubic-bezier(0.32, 0.96, 0.6, 1)"|
|showMask|是否展示遮罩层|boolean|true|
|maskAnimationTimeout|蒙层动画时长|number|500|
|maskAnimationFunction|蒙层动画函数|string|"cubic-bezier(0.32, 0.96, 0.6, 1)"|
|useColumn|使用多列标签样式，传 true 为 4 列，传数字为指定 n 列|number \| boolean|false|
|optionIcon|选项附带图标|ReactNode|-|
|mountOnEnter|是否在打开下拉框时再加载内容|boolean|true|
|unmountOnExit|是否在退出时卸载内容|boolean|true|
|preventBodyScroll|弹窗打开时是否禁止body的滚动|boolean|true|
|initialBodyOverflow|页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态|string|第一个全屏组件（弹窗、toast等）打开时页面overflow值|
|getAnchorElement|用于定位的元素，优先级低于top/bottom|() =\> HTMLElement|当前DOM所在位置的父元素|
|isStopTouchEl|点击某元素时是否阻止关闭面板, 优先级高于\`getStopTouchElement\`，当 clickOtherToClose=true 时有效|(el: HTMLElement) =\> boolean|-|
|getStopTouchElements|可阻止关闭面板的元素，当 clickOtherToClose=true 时有效|() =\> HTMLElement\[\]|当前组件的父元素|
|getScrollContainer|内容内部滚动区域容器，在该容器中未滚动到顶部或底部时会释放滚动|() =\> HTMLElement \| HTMLElement\[\]|-|
|getPortalContainer|获取挂载容器|() =\> HTMLElement|-|
|multiple|是否支持多选|boolean|false|
|defaultSelectedValue|默认选中值|string \| number \| ReactText\[\]|-|
|selectedValue|当前选择的选项标识|string \| number \| ReactText\[\]|-|
|onOptionClick|点击选项时触发的回调函数|((val: ReactText, op: OptionsItem) =\> void) \| ((selected: boolean, val: ReactText, op: OptionsItem) =\> void)|-|
|onOptionChange|当选项改变时触发的回调函数|((val: ReactText, op: OptionsItem) =\> void) \| ((vals: ReactText\[\], op: OptionsItem) =\> void)|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|

> Dropdown.Options

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|options|展示的选项列表|OptionsItem\[\]|必填|
|useColumn|使用多列标签样式，传 true 为 4 列，传数字为指定 n 列|number \| boolean|false|
|icon|选项列表右侧图标|ReactNode|-|
|multiple|是否支持多选|boolean|false|
|defaultSelectedValue|默认选中值|string \| number \| ReactText\[\]|-|
|selectedValue|当前选择的选项标识|string \| number \| ReactText\[\]|-|
|onOptionClick|点击选项时触发的回调函数|((val: ReactText, op: OptionsItem) =\> void) \| ((selected: boolean, val: ReactText, op: OptionsItem) =\> void)|-|
|onOptionChange|当选项改变时触发的回调函数|((val: ReactText, op: OptionsItem) =\> void) \| ((vals: ReactText\[\], op: OptionsItem) =\> void)|-|

> OptionsItem

|参数|描述|类型|
|----------|-------------|------|
|label|选项名称|ReactNode|
|value|选项标识|ReactText|
|disabled|选项是否可用，默认false表示可用|boolean|

> DropdownOptionsRef

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
