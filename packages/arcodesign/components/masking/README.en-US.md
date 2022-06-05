### Feedback

# Masking 

Generic modal popup with custom internal content. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the bullet layer, need to pass the scroll container to the `getScrollContainer` to release scrolling when it is not scrolled to the top or bottom.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|contentAtCenter|Whether the content of the popup window is centered|boolean|false|
|className|Custom classname|string|-|
|maskClass|Custom mask classname|string|-|
|maskStyle|Custom mask stylesheet|CSSProperties|-|
|contentClass|Custom content classname|string|-|
|contentStyle|Custom content stylesheet|CSSProperties|-|
|visible|Whether to display the menu (controlled)|boolean|required|
|close|Close menu method|(e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void|required|
|maskTransitionType|Mask transition animation classname|string|"fade"|
|contentTransitionType|Content transition animation classname|string|"fade"|
|children|Contents of menu|ReactNode|-|
|maskTransitionTimeout|Mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|contentTransitionTimeout|Content animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|300|
|maskClosable|Whether to click the mask to close the menu|boolean|true|
|animatingClosable|Whether the menu can be closed by clicking on the mask when performing the entry animation|boolean|false|
|mountOnEnter|Whether to reload content when the menu is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|orientationDirection|The transform direction, used to simulate the situation of horizontal screen through transform|"top" \| "bottom" \| "left" \| "right"|"top"|
|preventBodyScroll|Whether to prohibit the scrolling of the body when the popup is opened|boolean|true|
|initialBodyOverflow|The initial overflow state of the page, that is, the state in which overflow should be restored when the popup is closed|string|The page overflow value when the first fullscreen component (popup, toast, etc.) is opened|
|gestureOutOfControl|Whether to disable the scrolling container gesture judgment, leave it to users to judge|boolean|false|
|onClose|Callback after closing (animation is completed)|(scene?: string) =\> void|-|
|onOpen|Callback after opening (animation is completed)|() =\> void|-|
|onMaskClick|Callback when clicking the mask , also triggered when maskClosable=false|() =\> void|-|
|onTouchMove|Touch event callbacks for masking|(e: TouchEvent, prevented: boolean, direction: "x" \| "y") =\> void|-|
|onPreventTouchMove|Touch event callbacks for non\-scrolling areas or when scrolling to the top and bottom|(e: TouchEvent, direction: "x" \| "y") =\> void|-|
|getContainer|Get mounted container|() =\> HTMLElement|-|
|getScrollContainer|Container of inner scroll area in content, scroll is released when not scrolled to the top or bottom in this container|() =\> HTMLElement \| HTMLElement\[\]|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|mask|Mask DOM|HTMLDivElement|
|content|Content DOM|HTMLDivElement|
|setCloseScene|Modify the scene of onClose before closing the popup|(scene: string) =\> void|

> Methods

|method|Description|Type|
|----------|-------------|------|
|open|Open a Masking|(config: MaskingProps) =\> \{ close: () =\> void; update: (newConfig: MaskingProps) =\> void; \}|
