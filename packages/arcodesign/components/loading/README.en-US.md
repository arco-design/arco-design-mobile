### Feedback

# Loading 

Loading component, divided into four types, `circle` is a ring, `arc` is an arc `spin` is a rotation, and `dot` is a dot. All types can be customized in color, ring and arc types can be customized with coil radius and thickness, and rotation and dot types can be customized with internal element transparency.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|color|The main color, if you want to use css to control the main color, you can use the public mixin \`\.set\-loading\-color(@color)\`|string|-|
|type|Loading type|"spin" \| "circle" \| "arc" \| "dot"|"dot"|
|list|Valid when the type is \`dot\` or \`spin\`, defines the transparency of each element inside|number\[\]|-|
|duration|A loading cycle in millisecond|number|1000|
|svgKey|Distinguish the \`\<def\>\` content of different svg|string|-|
|radius|Circle radius, available when type is \`circle\` or \`arc\`|number|9|
|stroke|Circle stroke width, available when type is \`circle\` or \`arc\` or \`spin\`|number|2|
|filleted|Whether the edges are rounded|boolean|true|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> LoadingType

```
"spin" | "circle" | "arc" | "dot"
```
