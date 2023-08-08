# FAQ

## The style passed in through className cannot override the default style (such as color) in arco button

The style (such as color) in arco button is implemented by the two class selectors .arco-button.arco-button-type-primary. The priority will be higher than the priority of the className passed in. You can increase the className passed in Priority resolution. arco implements this because when there is only one level of priority, it may be overwritten by reset.less on the business side or the default button style in the browser.
