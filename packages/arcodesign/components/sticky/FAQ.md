# FAQ

## 没有设置 getContainer / getScrollContainer，在 Sticky 状态下，内部元素消失？

请先排查是否给 body 属性加上了`height: 100%`样式，如有应去掉该样式，或手动指定滚动容器。Sticky 组件依赖滚动容器的 scrollHeight 和 rect 值，滚动容器应满足 overflow=auto/scroll 且 scrollHeight >= clientHeight，否则定位可能出现问题。
