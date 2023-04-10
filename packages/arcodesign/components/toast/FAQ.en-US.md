# FAQ

## When using methods such as Toast.toast to call components, the configuration passed to ContextProvider cannot be received?

The component called by the method is not a subcomponent under the root node of the page, so the configuration of ContextProvider needs to be passed to the method, such as: `Toast.toast({ content: 'Tips' }, { prefixCls: 'aa' })`.
