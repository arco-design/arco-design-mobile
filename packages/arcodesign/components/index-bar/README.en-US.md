### Navigation

# SearchBar 

IndexBar component

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|defaultIndex|Index to activate by default|ReactText|-|
|disableSidebar|Whether to enable the sidebar function|boolean|false|
|sticky|Whether to enable the automatic ceiling effect of the index|boolean|true|
|groups|IndexBar contents|IndexBarGroupItem\<IndexBarBaseData\>\[\]|-|
|children|Rendering of custom content, the content must be an IndexBar\.Group component|ReactNode|-|
|tipType|Style type of sidebar index hint \- sweat: teardrop \- toast: light hint \- none: turn off hint|"none" \| "sweat" \| "toast"|"toast"|
|scrollDuration|Execution time of scrolling animation when scrollToIndex is called manually|number|0|
|scrollBezier|When scrollToIndex is called manually, the scrolling animation curve|\[number, number, number, number\]|-|
|onChange|Callback when the active index changes, the first parameter is the new index, and the second parameter is the change method: \- swipe: triggers the change by manually sliding the page \- sidebar: triggers the change by clicking on the sidebar \- manual: triggers by manually calling scrollToIndex|(index: ReactText, trigger: IndexBarChangeTrigger) =\> void|-|
|onGroupItemClick|The callback when a sub\-item in IndexBar\.Group is clicked, the callback will not take effect when using JSX writing, please bind the corresponding property on IndexBar\.Group|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> void|-|
|renderSideBarItem|Customize the content rendering of each sub\-item in the sidebar|(index: ReactText) =\> ReactNode|-|
|renderSideBar|Custom sidebar rendering|(Content: ReactNode) =\> ReactElement\<any, string \| ((props: any) =\> ReactElement\<any, any\>) \| (new (props: any) =\> Component\<any, any, any\>)\>|-|
|renderTip|Customize the content of the rendering prompt when changing the index using the sidebar|(index: ReactText) =\> ReactNode|-|
|renderStickyItem|Customize the rendering of the index title content of IndexBar\.Group\. When using JSX writing, the callback will not take effect\. Please bind the corresponding property on IndexBar\.Group|(index: ReactText) =\> ReactNode|-|
|renderGroupItem|Customize the rendering of sub\-items of IndexBar\.Group\. This callback will not take effect when using JSX\. Please bind the corresponding properties on IndexBar\.Group|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> ReactNode|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
|scrollToIndex|Manually scroll to the specified index position|(index?: ReactText, rightNow?: boolean) =\> void|
|recalculatePosition|In the local scrolling mode, if there is nested scrolling outside the container, this method can be actively called to make the sticky element actively update the fixed position|(index?: ReactText) =\> void|

> IndexBar.Group

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|className|Custom classname|string|-|
|style|Custom stylesheet|CSSProperties|-|
|children|Rendering of custom content, if there is custom content, the custom content is rendered first, otherwise the data passed by the list is rendered|ReactNode|-|
|listKey|Customize the extracted key of the List as the key for list rendering, and select the array position where the listItem is located by default|(data: IndexBarBaseData, listItemIndex: number) =\> ReactText|-|
|onGroupItemClick|Callback when a child item in IndexBar\.Group is clicked|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> void|-|
|renderStickyItem|Customize IndexBar\.Group's index title content rendering|(index: ReactText) =\> ReactNode|-|
|renderGroupItem|Customize the rendering of sub\-items of IndexBar\.Group|(index: ReactText, itemData: IndexBarBaseData, itemIndex: number) =\> ReactNode|-|
|index|Index corresponding to IndexBarGroup|ReactText|required|
|list|The list data to be rendered in IndexBarGroup, if the children attribute has been passed, the list attribute will not take effect|IndexBarBaseData\[\]|-|

> IndexBarGroupItem

|Property|Description|Type|
|----------|-------------|------|
|Data|-|any|
|index|Index corresponding to IndexBarGroup|ReactText|
|list|The list data to be rendered in IndexBarGroup, if the children attribute has been passed, the list attribute will not take effect|IndexBarBaseData\[\]|

> IndexBarBaseData

|Property|Description|Type|
|----------|-------------|------|
|content|content|ReactNode|

> IndexBarTipType

```
"none" | "sweat" | "toast"
```

> IndexBarChangeTrigger

```
"swipe" | "manual" | "sidebar"
```

> IndexBarGroupRef

|Property|Description|Type|
|----------|-------------|------|
|dom|The outer DOM element of the component|HTMLDivElement|
