# FAQ

## 内容超出一屏时，下拉时无法触发下拉刷新？

当`PullRefresh`包裹的内容在向上滚动后再向下拉，应是向下滚动操作而不应触发下拉刷新，因此组件内判断了最外层容器是否滚动到顶部以决定是否允许执行下拉刷新操作。如果遇到已滚动到顶部但无法下拉刷新的情况，可检查当前组件布局，确定`.@{prefix}-pull-refresh`这个最外层容器是否为实际滚动容器，通常解决手段是为最外层容器添加高度样式。
