### 信息展示

# 倒计时 CountDown

倒计时组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|time|倒计时时长，单位毫秒|number \| TimeDataType|0|
|format|自定义格式 D:天数 DD:天数（个位数补0） H:小时 HH:小时（个位数补0） m:分钟 mm:分钟（个位数补0） s:秒数 ss:秒数（个位数补0） S:毫秒（1 位）SS:毫秒（2 位）SSS:毫秒（3 位）|string|HH:mm:ss|
|autoStart|是否自动开始倒计时|boolean|true|
|millisecond|是否开启毫秒级渲染|boolean|false|
|onFinish|倒计时结束时触发|() =\> void|-|
|onChange|倒计时变化时触发|(val: TimeDataType, ts: number) =\> void|-|
|renderChild|自定义内容|(val: TimeDataType) =\> ReactNode|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|start|开始|() =\> void|
|pause|暂停|() =\> void|
|reset|重置|() =\> void|

> TimeDataType

|参数|描述|类型|
|----------|-------------|------|
|days|天数|number|
|hours|小时|number|
|minutes|分钟|number|
|seconds|秒数|number|
|milliseconds|毫秒|number|
