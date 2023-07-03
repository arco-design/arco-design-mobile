### Feedback

# LoadMore 

Pull-up loading component, supports `scroll` and `click` two trigger loading methods, supports scroll monitoring. Both controlled and uncontrolled forms are supported. <br>If only the initial `getData` is triggered after the component is introduced, please make sure that the `callback` is not called in the `getData` method to remove the loading state, and the `blockWhenLoading` property is not set to false.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|style|Custom stylesheet|CSSProperties|-|
|className|Custom classname|string|-|
|beforeReadyArea|Content when the component is loaded but not yet enabled|ReactNode|null|
|loadingArea|Content in loading state|ReactNode|"Trying to load..."|
|noMoreArea|Content with no more data|ReactNode|"No more data"|
|prepareArea|Content in ready\-to\-load state|ReactNode|"Pull up to load more" or "Click to load more"|
|retryArea|Load content in retry state|ReactNode|"failed to load, click to retry"|
|defaultStatus|The component is loaded in the initial state\. Inputing in "before\-ready" will load the component first without requesting data|"before\-ready" \| "prepare"|"prepare"|
|status|Current state, the component is controlledc  when it is input|"before\-ready" \| "prepare" \| "loading" \| "nomore" \| "retry"|-|
|getScrollContainer|Scrolling container to be calculated|() =\> HTMLElement \| Window|() => window|
|getOffsetNode|When multiple loadmores are on the same page, pass in the offsetHeight \+ offsetTop of the node instead of scrollHeight|() =\> HTMLElement \| Window|-|
|trigger|The timing of triggering loading, when it is click, getData will be triggered after clicking|"scroll" \| "click"|"scroll"|
|threshold|Scroll to how far from the bottom of the list to trigger getData, valid when the trigger state timing is 'scroll'|number|200|
|getData|The request data method, after the asynchronous task ends, the callback can be called according to the task result to modify the internal state of loadmore|(callback: (status: LoadMoreStatus) =\> void) =\> void|-|
|throttle|Throttle granularity|number|0|
|blockWhenLoading|Whether to not trigger getData in the loading state|boolean|true|
|getDataAtFirst|Whether to automatically request once when the component is just loaded, valid when trigger=scroll|boolean|true|
|onStatusChange|Callback when state changes|(status: LoadMoreStatus, scene?: string) =\> void|-|
|onClick|Callback when the component is clicked|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onEndReached|Callback when scrolling to (bottom \- threshold) distance|() =\> void|-|

> Refs

|Property|Description|Type|
|----------|-------------|------|
|dom|The outermost element DOM|HTMLDivElement|
|changeStatus|Change component state manually|(status: LoadMoreStatus, scene?: string) =\> void|

> LoadMoreStatus

```
"before-ready" | "prepare" | "loading" | "nomore" | "retry"
```
