### Others

# Transition 

Simple wrapper for react-transition-group/CSSTransition.

======

> Props

|Property|Description|Type|DefaultValue|
|----------|-------------|------|------|
|children|Animation content to be executed|ReactNode|-|
|type|Css classname of the animation to be executed|string|required|
|in|Whether the content is visible|boolean|required|
|timeout|Execute animation time|number \| \{ appear?: number; enter?: number; exit?: number; \}|required|
|mountOnEnter|Whether to reload content when it is opened|boolean|true|
|unmountOnExit|Whether to unmount content on exit|boolean|true|
|transitionVarType|Animation duration variable identifier|string|type 属性值|
