# FAQ

## When the content exceeds one screen, the pull-down refresh cannot be triggered when pulling down?

When the content wrapped by `PullRefresh` is scrolled up and then pulled down, it should be a scroll down operation and should not trigger a pull-down refresh, so the component judges whether the outermost container is scrolled to the top to determine whether to allow the pull-down refresh operation. If you have scrolled to the top but cannot pull down to refresh, you can check the current component layout to determine whether the outermost container `.@{prefix}-pull-refresh` is the actual scrolling container. The usual solution is to give the outermost container a height styling.
