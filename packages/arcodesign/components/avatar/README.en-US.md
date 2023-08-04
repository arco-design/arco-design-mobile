### Data Display

# Avatar 

Avatar component supports two shapes of circle and square, supports pictures or text avatars, with five sizes.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|shape|Shapre|"circle" \| "square"|"circle"|
|size|Size|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|"small"|
|src|resource of avatar picture|string|-|
|imageProps|Image avatar component props, transparently passed to the Image component|Partial\<ImageProps & RefAttributes\<ImageRef\>\>|-|
|decoration|the decoration for image avatar|ReactNode|null|
|textAvatar|Text Avatar, two characters in Chinese, and three characters or less in English are recommended\.|string|""|
|avatarStyle|Custom style for avatar element|CSSProperties|{}|
|autoFixFontSize|Whether to automatically adjust the font size according to the avatar size|boolean|true|
|autoFixFontOffset|When automatically adjusting the size of the text head image, the safe distance between the text and the left and right of the avatar container|number|2|
|avatarName|Username information next to the avatar|string|""|
|avatarDesc|Auxiliary information next to the avatar, which needs to appear together with the username|string|""|
|renderInfo|Custom avatar description information|ReactNode|null|
|defaultOverLap|The default state when the avatar component is empty|ReactNode|User Icon|
|onClick|callback event when clicking the avatar|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|() => {}|
|onClickDecoration|callback when clicking on the decoration on the avatar|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|() => {}|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|

> Avatar.Group

Avatar group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|isGroup|Whether it is an avatar group|boolean|required|
|shape|Shape, which has lower priority than the avatar component|"circle" \| "square"|"circle"|
|size|Size,  which has lower priority than the avatar component|"medium" \| "large" \| "small" \| "smaller" \| "ultra\-small"|"medium"|
|zIndexOrder|Avatar group stacking level order, that is, z\-index value, desc \- descending order, asc \- ascending order|"desc" \| "asc"|"desc"|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> AvatarGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
