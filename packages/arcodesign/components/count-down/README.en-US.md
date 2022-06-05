### Data Display

# CountDown 

Countdown Component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|time|Countdown time in milliseconds|number \| TimeDataType|0|
|format|Custom format D: Days DD: Days (1 digit with 0) H: Hours HH: Hours (1 digit with 0) m: Minutes mm: Minutes (1 digit with 0) s: Seconds ss: Seconds (1 digit with 0) S: Milliseconds (1 digit) SS: Milliseconds (2 digits) SSS: Milliseconds (3 digits)|string|HH:mm:ss|
|autoStart|Whether to automatically start the countdown|boolean|true|
|millisecond|Whether to enable millisecond rendering|boolean|false|
|onFinish|Callback when the countdown ends|() =\> void|-|
|onChange|Callback when the countdown changes|(val: TimeDataType, ts: number) =\> void|-|
|renderChild|Custom content|(val: TimeDataType) =\> ReactNode|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|start|Start|() =\> void|
|pause|Pause|() =\> void|
|reset|Reset|() =\> void|

> TimeDataType

|Property|Description|Type|
|----------|-------------|------|
|days|Days|number|
|hours|Hour|number|
|minutes|minute|number|
|seconds|second|number|
|milliseconds|millisecond|number|
