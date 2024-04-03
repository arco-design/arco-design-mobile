# FAQ

## onChange/onAfterChange scenes to be used

The call of onAfterChange occurs after the animation is executed, and many state updates may be processed here to cause state changes

## How tabs cooperate with sticky components to realize a complex interactive page

You can refer to [sticky-tabs](/#/components/sticky-tabs) composite component to use

## Q: When the autoHeight property of Tabs is set to true, the height of tabPane will not change with the change of DOM height.

A: To ensure the performance of the component, users need to manually call the setCurrentHeight method exposed in TabPaneRef to update the height manually
