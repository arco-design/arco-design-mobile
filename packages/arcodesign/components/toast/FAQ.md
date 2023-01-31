# FAQ

## 用 Toast.toast 等方法调用组件时，接不到传给 ContextProvider 的配置？

使用方法调用的组件不是页面根节点下的子组件，因此需将 ContextProvider 的配置传给方法，如：`Toast.toast({ content: 'Tips' }, { prefixCls: 'aa' })`。（`2.24.0`之后支持）
