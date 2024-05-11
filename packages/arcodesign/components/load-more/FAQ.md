# FAQ

## 滚动容器监听不生效，组件一直触发 getData 或不触发 getData？

请检查`getScrollContainer`（指定滚动监听容器）是否正确使用。未传入该属性值时，滚动监听容器为 Window，如果此时出现一直触发 getData 的情况，请检查是否为 body 设置了 height: 100% 的样式，如有应去掉。自行指定滚动监听容器时，容器应满足2个条件：内部子元素总高 > 自身高度，且容器本身设置了 overflow: auto/scroll 的样式。
