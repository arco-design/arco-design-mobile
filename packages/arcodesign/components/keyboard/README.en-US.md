### Data Entry

# Keyboard 

Keyboard component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|normalKeyClass|Custom classname for normal keys|string|-|
|normalKeyStyle|Custom style for normal keys|CSSProperties|-|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|type|Keyboard display type, different types have different layouts\. number \- a regular keyboard with pure numbers, confirm \- a keyboard with a confirm button, tool \- a keyboard with operators|"number" \| "confirm" \| "tool"|"number"|
|randomOrder|Whether to scramble number placements in the keyboard|boolean|required|
|title|The title content displayed on the top of the keyboard, the style is purely customized|ReactNode|-|
|rightColumns|Custom rendering of the content to the right of the number (fourth column)|ReactNode|-|
|confirmClosable|Whether to automatically close the keyboard after clicking confirm button|boolean|false|
|confirmButton|Customize the internal content of the confirm button|ReactNode|-|
|deleteButton|Customize the internal content of the delete button|ReactNode|-|
|keyboardButton|Customize the internal content of the keyboard button|ReactNode|-|
|close|Callback for closing the keyboard|(e?: MouseEvent\<HTMLElement, MouseEvent\>) =\> \{\}|required|
|onConfirm|Callback for clicking the confirm button|() =\> \{\}|-|
|onDelete|Callback for clicking the delete button|() =\> \{\}|-|
|onChange|Callback for clicking the normal button|(data: ReactText) =\> \{\}|-|
|direction|The direction the menu slides out|"left" \| "right" \| "top" \| "bottom"|"bottom"|
|needBottomOffset|Whether the content of the menu that slides out from the bottom fits the bottom of ipx|boolean|false|
|translateZ|\[To be deprecated\] Enable translateZ forced promotion|boolean|false|
|maskTransitionTimeout|Menu mask animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionTimeout|Menu content animation duration|number \| \{ appear?: number; enter?: number; exit?: number; \}|{ enter: 450, exit: 240 }|
|contentTransitionType|Content transition animation classname|string|\`slide-from-${props.direction}\`|
|maskClass|Custom mask classname|string|-|
|maskStyle|Custom mask stylesheet|CSSProperties|-|
|contentClass|Custom content classname|string|-|
|contentStyle|Custom content stylesheet|CSSProperties|-|
|visible|Whether to display the menu (controlled)|boolean|required|
|maskTransitionType|Mask transition animation classname|string|"fade"|
|children|Contents of menu|ReactNode|-|
|maskClosable|Whether to click the mask to close the menu|boolean|true|
|animatingClosable|Whether the menu can be closed by clicking on the mask when performing the entry animation|boolean|false|
|mountOnEnter|Whether to reload content when the menu is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|orientationDirection|The transform direction, used to simulate the situation of horizontal screen through transform|"left" \| "right" \| "top" \| "bottom"|"top"|
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
|keyboard|The outer DOM element of the component|HTMLDivElement|
|dom|The outermost element DOM|HTMLDivElement|
|mask|Mask DOM|HTMLDivElement|
|content|Content DOM|HTMLDivElement|
|setCloseScene|Modify the scene of onClose before closing the popup|(scene: string) =\> void|

> DirectionType

```
"left" | "right" | "top" | "bottom"
```
