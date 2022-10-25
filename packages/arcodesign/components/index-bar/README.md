### 导航

# 索引栏 IndexBar

索引栏组件

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|defaultIndex|-|ReactText|-|
|sticky|-|boolean|-|
|groups|-|IndexBarGroupItem\<IndexBarBaseData\>\[\]|-|
|tipType|-|"none" \| "sweat" \| "toast"|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层 DOM 元素|HTMLDivElement|

> IndexBarGroupItem

|参数|描述|类型|
|----------|-------------|------|
|Data|-|any|
|index|-|ReactText|
|list|-|IndexBarBaseData\[\]|

> IndexBarBaseData

|参数|描述|类型|
|----------|-------------|------|
|content|-|ReactNode|

> IndexBarTipType

```
"none"|"sweat"|"toast"
```
