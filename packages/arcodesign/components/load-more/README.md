### 反馈

# 加载更多 LoadMore

上拉加载组件，支持`scroll`和`click`两种触发加载方式，支持滚动监听。支持受控与不受控两种形式。<br>如果引入组件后发现仅触发了初始的`getData`，请确认是否在`getData`方法内没有调用`callback`移除 loading 状态，且未设置`blockWhenLoading`属性为 false。

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|style|自定义样式|CSSProperties|-|
|className|自定义类名|string|-|
|beforeReadyArea|组件加载但尚未启用状态下的内容|ReactNode|null|
|loadingArea|加载中状态下的内容|ReactNode|"正在努力加载中..."|
|noMoreArea|无更多数据状态下的内容|ReactNode|"没有更多数据了"|
|prepareArea|准备加载状态下的内容|ReactNode|"上拉/点击加载更多"|
|retryArea|加载重试状态下的内容|ReactNode|"加载失败，点击重试"|
|defaultStatus|组件加载初始状态，传入 "before\-ready" 则先加载组件但不请求数据|"before\-ready" \| "prepare"|"prepare"|
|status|当前状态，传入则受控|"before\-ready" \| "prepare" \| "loading" \| "nomore" \| "retry"|-|
|getScrollContainer|待计算滚动容器|() =\> HTMLElement \| Window|() => window|
|getOffsetNode|当多个 loadmore 在同一页面时，通过传入节点的 offsetHeight \+ offsetTop 代替 scrollHeight|() =\> HTMLElement \| Window|-|
|trigger|触发loading的时机，当为click时，点击后将触发getData|"scroll" \| "click"|"scroll"|
|threshold|滚动到离列表底部多远的位置触发getData，触发状态时机为'scroll'时有效|number|200|
|getData|请求数据方法，可在异步任务结束后根据任务结果调用callback修改loadmore内部状态|(callback: (status: LoadMoreStatus) =\> void) =\> void|-|
|throttle|节流粒度|number|0|
|blockWhenLoading|是否在loading状态下不触发getData|boolean|true|
|getDataAtFirst|刚加载好组件时是否自动先请求一次，trigger=scroll时有效|boolean|true|
|onStatusChange|状态改变时回调|(status: LoadMoreStatus, scene?: string) =\> void|-|
|onClick|组件被点击时回调|(e: MouseEvent\<HTMLDivElement, MouseEvent\>) =\> void|-|
|onEndReached|滚动到(底部 \- threshold)距离时触发|() =\> void|-|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层元素 DOM|HTMLDivElement|
|changeStatus|手动更改组件状态|(status: LoadMoreStatus, scene?: string) =\> void|

> LoadMoreStatus

```
"before-ready" | "prepare" | "loading" | "nomore" | "retry"
```
