### Navigation

# SearchBar 

IndexBar component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|defaultIndex|-|ReactText|-|
|sticky|-|boolean|-|
|groups|-|IndexBarGroupItem\<IndexBarBaseData\>\[\]|-|
|tipType|-|"none" \| "sweat" \| "toast"|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> IndexBarGroupItem

|Property|Description|Type|
|----------|-------------|------|
|Data|-|any|
|index|-|ReactText|
|list|-|IndexBarBaseData\[\]|

> IndexBarBaseData

|Property|Description|Type|
|----------|-------------|------|
|content|-|ReactNode|

> IndexBarTipType

```
"none"|"sweat"|"toast"
```
