### Data Display

# Skeleton 

Display a set of placeholder graphics during content loading

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|animation|Animation of loading effect, 'gradient' and 'breath' effects are optional, default is no animation effect if not passed|"gradient" \| "breath"|-|
|title|Show title placeholder|boolean \| SkeletonTitleProps|true|
|paragraph|Show paragraph placeholder|boolean \| SkeletonParagraphProps|true|
|avatar|Show Avatar placeholder|boolean \| SkeletonAvatarProps|false|
|grid|Show Grid placeholder\. When it's value is present, the paragraph, avatar or title placeholder will not be displayed|boolean \| SkeletonGridProps|false|
|children|Children element|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> SkeletonTitleProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|width|The width of title|ReactText|'38%'|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonParagraphProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|rows|Number of lines for paragraph|number|3|
|width|The width of paragraph\. If width is an Array, it corresponds to the width of each line, otherwise it indicates the width of the last line|string \| number \| ReactText\[\]|'58%'|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonAvatarProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|shape|Shape of avatar|"circle" \| "square"|'circle'|
|size|Size of avatar|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|'smaller'|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonGridProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|columns|columns of grid|number|4|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|
