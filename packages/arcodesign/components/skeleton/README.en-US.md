### Data Display

# Skeleton 

Display a set of placeholder graphics during content loading

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|title|Show title placeholder|boolean \| SkeletonTitleProps|true|
|paragraph|Show paragraph placeholder|boolean \| SkeletonParagraphProps|true|
|avatar|Show Avatar placeholder|boolean \| SkeletonAvatarProps|false|
|grid|Show Grid placeholder\. When it's value is present, the paragraph, avatar or title placeholder will not be displayed, and four columns will be displayed by default|boolean \| SkeletonGridProps|false|
|showAnimation|Show loading effect|boolean|true|
|animation|Animation of loading effect, 'gradient' and 'breath' effects are optional|"gradient" \| "breath"|"gradient"|
|animationGradientColor|Highlight color of gradient animation|string|"rgba(0, 0, 0, 0.04)"|
|backgroundColor|Background color of skeleton item|string|"#F7F8FA"|
|children|Children element|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> Skeleton.Node

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Skeleton.Title

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|width|The width of title|ReactText|"40%"|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Skeleton.Paragraph

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|rows|Number of lines for paragraph|number|3|
|width|The width of paragraph\. If width is an Array, it corresponds to the width of each line, otherwise it indicates the width of the last line|string \| number \| ReactText\[\]|"60%"|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Skeleton.Avatar

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Skeleton.Grid

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|columns|columns of grid|number|4|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonTitleProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|width|The width of title|ReactText|"40%"|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonParagraphProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|rows|Number of lines for paragraph|number|3|
|width|The width of paragraph\. If width is an Array, it corresponds to the width of each line, otherwise it indicates the width of the last line|string \| number \| ReactText\[\]|"60%"|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonAvatarProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> SkeletonGridProps

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|columns|columns of grid|number|4|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|
