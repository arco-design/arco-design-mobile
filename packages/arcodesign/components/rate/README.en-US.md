### Data Entry

# Rate 

Rate component, supports controlled mode

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|defaultValue|Default value|number|0|
|value|Current value (Controlled)|number|-|
|count|Number of icons|number|5|
|step|Points for each icon|number|1|
|color|Color when selected|string|-|
|normalColor|Color when unselected|string|-|
|disabledColor|Color when disabled|string|-|
|allowHalf|Whether to allow semi\-selection|boolean|false|
|disabled|Whether to be disable|boolean|false|
|size|Custom icon size|ReactText|-|
|offset|Custom icon spacing (click hotspot includes spacing)|ReactText|-|
|icons|Custom icons|\{ normal: RateIconType; active: RateIconType; halfActive?: RateIconType; \}|-|
|onChange|Callback when the current value changes|(value: number) =\> void|(value) => void|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
