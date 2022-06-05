### Data Entry

# Switch 

A switch component that supports click and slide trigger switch actions.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|platform|The platform\-specific style of the component, the optional values are android, ios|string|Follow the current system|
|checked|Whether it is set to open, defaultChecked will not be used when there is checked|boolean|-|
|defaultChecked|Default initial state|boolean|false|
|text|Switch text|SwitchText|-|
|shape|Rounded style, fully \- full rounded, semi \- right angle|"fully" \| "semi"|"fully"|
|innerArea|Inner area element|ReactNode|-|
|disabled|Whether it is set to disabled state|boolean|false|
|onChange|Callback when the status changes|(checked: boolean) =\> void|-|
|onTouchStart|TouchStart event|(e: TouchEvent\<HTMLDivElement\>) =\> void|-|
|onTouchEnd|TouchEnd event|(e: TouchEvent\<HTMLDivElement\>) =\> void|-|
|onClick|Click event|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|

> SwitchText

|Property|Description|Type|
|----------|-------------|------|
|on|Text when opened|string|
|off|Text when closed|string|
