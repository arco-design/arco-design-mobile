### Layout

# Sticky 

Sticky layout component, The sticky-to-top effect of the element relative to the window or specified container

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|position|Adsorption position, top means fixed top, bottom means fixed bottom, both means both top and bottom|"top" \| "bottom" \| "both"|"top"|
|topOffset|Fixed top when the distance from the top of the container is this value|number|0|
|bottomOffset|Fixed bottom when the distance from the bottom of the container is this value|number|0|
|followOffset|The distance from the edge of the attached container when the sticky element needs to follow the attached container to leave the viewport|number|0|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|children|Children elements of the component|ReactNode|-|
|zIndex|z\-index|number|100|
|portalWhenSticky|Whether it is portal in sticky state|boolean|false|
|stickyStyle|When in the sticky state, the fixed style of the element\. Fixed is recommended\. If absolute, need to set position: relative for the parent container of the scrolling container\.|"fixed" \| "absolute"|"fixed"|
|stickyCssStyle|Custom style when in sticky state|CSSProperties|-|
|getPortalContainer|Container mounted when being portaled|() =\> HTMLElement|() => document.body|
|onStickyStateChange|Triggered when the sticky state is switched isSticky: Whether it is currently in the top/bottom state Whether the previous state is the top/bottom state|(payload: StickyEventPayload) =\> void|-|
|onTopChange|The top change callback when scrolling, the parameter is the distance of the element from the top of the container minus topOffset|(top: number) =\> void|-|
|getContainer|Specifies the attachment container of the sticky element\. The sticky element will not exceed the container and will follow when the container leaves the viewport If a string is returned, use querySelector to select the container|() =\> string \| HTMLElement|-|
|getScrollContainer|Specifies the scrolling container\. If this value is specified, the relative property is always regarded as false; if a string is input, use querySelector to select the container|() =\> string \| HTMLElement \| Window|() => window|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|recalculatePosition|In the local scrolling mode, if there is nested scrolling outside the container, this method can be actively called to make the sticky element actively update the fixed position|() =\> void|
|updatePlaceholderLayout|Manually update the height of the placeholder|() =\> void|

> StickyEventPayload

|Property|Description|Type|
|----------|-------------|------|
|isSticky|Whether it is currently in the top/bottom suction state|boolean|
|wasSticky|Whether the previous state is ceiling / bottom suction state|boolean|
|isTopSticky|当前是否为吸顶状态|boolean|
|isBottomSticky|当前是否为吸底状态|boolean|
