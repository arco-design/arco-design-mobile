# FAQ

## Elements disappear in Sticky state when getContainer/getScrollContainer is not set?

First check if the body element has `height: 100%` style applied. If so, remove this style or manually specify the scroll container. The Sticky component relies on the scroll container's scrollHeight and rect values. The scroll container should satisfy overflow=auto/scroll and scrollHeight >= clientHeight, otherwise positioning issues may occur.
