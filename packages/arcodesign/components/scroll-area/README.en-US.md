### Layout

# ScrollArea 

A scrollable container that replaces the native scrollbar with a customizable one

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|direction|Scroll direction|"vertical" \| "horizontal" \| "both"|"vertical"|
|scrollbarVisibility|How the scrollbar is displayed: \`auto\` shows it while scrolling and hides it after scrolling stops for a while; \`always\` always shows it when the content overflows; \`hidden\` never shows it|"auto" \| "always" \| "hidden"|"auto"|
|hideDelay|The delay in ms before the scrollbar is hidden after scrolling stops, takes effect when \`scrollbarVisibility\` is \`auto\`|number|1000|
|viewportClassName|Custom classname of the scrollable viewport|string|""|
|viewportStyle|Custom stylesheet of the scrollable viewport|CSSProperties|-|
|onScroll|Callback when the viewport is scrolled|(e: UIEvent<HTMLDivElement, UIEvent>) =\> void|-|
|children|Custom component content|ReactNode|null|
|className|Custom classname|string|""|
|style|Custom stylesheet|CSSProperties|{}|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
|viewport|The scrollable viewport DOM element|HTMLDivElement|
|scrollTo|Scroll the viewport to the given position|(options: ScrollToOptions) =\> void|
|update|Recalculate the size and position of the scrollbar, usually there is no need to call it manually|() =\> void|
