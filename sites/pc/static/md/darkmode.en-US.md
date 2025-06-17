# Dark mode

The component library has a built-in dark theme. You can customize the style class name of the package in dark mode. You can also customize the style of each component in dark mode by modifying tokens. Manual switching is also supported.

=====================

## Enable/disable dark mode

Dark mode is enabled by default, that is, when it is determined that it is in dark mode, the styles defined in dark mode will be applied. Whether to enable dark mode is controlled by the `@use-dark-mode` variable built into the component library. If the user's business is not adapted to dark mode, it can be disabled uniformly through modifyVars:

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-dark-mode': 0, // Disable dark mode style
    }
}
```

## Customize dark mode conditions

The default condition for the component library to determine that it is in dark mode is that the specified dark mode selector is set on the element above the component's parent. This selector is controlled by the `@arco-dark-mode-selector` variable built into the component library. The default value is `.arco-theme-dark`. Users can modify the value through modifyVars to customize dark mode conditions according to business conditions:

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@arco-dark-mode-selector': '.tt-darkmode-general',
        // It can also be defined as a condition other than the class name, as long as it meets the css selector rules.
        // '@arco-dark-mode-selector': ':root[data-theme="dark"]',
    }
}
```

## Customize component styles in dark mode

The component library has a built-in set of color values of components in dark mode (details [click here](https://github.com/arco-design/arco-design-mobile/blob/main/packages/arcodesign/tokens/app /arcodesign/default/index.less)), where the variables starting with `dark-` represent the value of the variable name in dark mode after removing the prefix, such as `@dialog-content-background` means that the content of the dialog panel is in normal The background color in dark mode, and `@dark-dialog-content-background` indicates the background color of the dialog panel content in dark mode. If the user needs to overwrite the value in dark mode, just modify the variable value starting with `@dark-` through modifyVars or less style override.

Users can also directly specify the style rules in dark mode by calling `.use-dark-mode-query()`:

```less
.@{prefix}-carousel-indicator .indicator {
    .use-dark-mode-query({
        color: black;
        &.active {
            color: white;
        }
    });
}
```

## Manually switch to dark mode

The dark mode on the mobile terminal is usually controlled by a unified switch outside of the component. Generally, you only need to define the style of the component under the corresponding class name of the dark mode, but the component library also supports manual switching to dark mode, that is, giving the root-level element `body` sets the dark mode class name. It should be noted that this only supports setting the class name for `body`, other attributes are not supported.

Pass in the `isDarkMode` attribute. When this attribute is `true`, the class name specified by the `darkModeSelector` attribute will be mounted on the `body` element. The value of the `darkModeSelector` attribute should be consistent with the value of the `@arco-dark-mode-selector` style variable.

```js
import React from 'react';
import { ContextProvider } from '@arco-design/mobile-react';

// For React 18+
const root = ReactDOM.createRoot(CONTAINER);
root.render(
    <ContextProvider isDarkMode={true} darkModeSelector="tt-darkmode-general">
        <YourApp />
    </ContextProvider>,
);

// For React 16/17
// ReactDOM.render(
//   <ContextProvider isDarkMode={true} darkModeSelector="tt-darkmode-general">
//     <YourApp />
//   </ContextProvider>,
//   CONTAINER
// );
```
