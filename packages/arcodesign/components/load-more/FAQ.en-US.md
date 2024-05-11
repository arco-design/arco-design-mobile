# FAQ

## The scrolling container monitoring does not take effect. Why the component always triggers "getData" or does not trigger "getData"?

Please check whether `getScrollContainer` (specifies the scroll listening container) is used correctly. When this attribute value is not passed in, the scroll listening container is Window. If getData is always triggered at this time, please check whether the height: 100% style is set for the body. If so, remove it. When specifying a scroll listening container by yourself, the container should meet two conditions: the total height of the internal sub-elements > its own height, and the container itself is set to the "overflow: auto/scroll" style.
