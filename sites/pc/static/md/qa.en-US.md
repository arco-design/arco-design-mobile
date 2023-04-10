# FAQ

Here is a summary of some common problems when using the component library.

=====================

## Q: The component library package is imported, but the styles are not imported or the styles are abnormal?
A: The main output form of the style of this component library in the npm package is the `less` file. Please check whether the less environment in the project is normal (for example, when using webpack, less-loader needs to be configured) and whether the `lessOptions` is configured correctly. For details, please refer to the "Self-adaptation" section in Quick Start.

## Q: The component library package is introduced, but the style display is abnormal?
A: This component library uses `rem` for mobile adaptation. It needs to cooperate with `flexible.js` to dynamically set the font-size of the root element according to the device environment. For details, see "Self-adaptation" in Quick Start.

## Q: Are components supported in an SSR environment?

A: The components in this component library are all supported in the SSR environment. Note that you need to use the components in the`/cjs/`directory instead of the /esm/ directory.

## Q: The component uses the rem unit for self-adaptation. I want to use pxtovw or other plug-ins to unify the unit. Can I disable rem?
A: Yes, change the value of the `@use-rem` variable to `0` in lessOptions.

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-rem': 0,
    }
}
```

## Q: Popup, Masking, Dialog and other pop-up window components cannot scroll the inner elements, even if the overflow is scroll?

A: When the pop-up window is activated on the mobile side, there will be a problem of scroll penetration, so by default, the preventDefault operation will be performed for the touchmove event of the pop-up window to avoid this problem. This operation will also prevent the scrolling of the content of the pop-up window, so you need to manually specify the scroll container through the `getScrollContainer` attribute for exemption, that is, to determine whether the element passed in from this attribute scrolls to the boundary position, if so, execute the preventDefault operation, otherwise default events are no longer blocked.

## Q: "Warning: Prop \`className\` did not match" when some components are used in SSR environment?

A: Some components will behave differently in different system environments, so the class name may contain values such as `android / ios` that represent the system environment. This value is obtained through userAgent. UserAgent cannot be obtained when the first screen of SSR is rendered, so the value is an empty string at this time, which is inconsistent with the value in the CSR stage. The current system environment value can be obtained in other ways in the SSR phase, and passed in through the `system` property of `ContextProvider`, so as to ensure that the SSR and CSR phase values are consistent.

```tsx
import { ContextProvider } from '@arco-design/mobile-react';

return ( <ContextProvider system="android">
    <Tabs ... />
</ContextProvider>)"
```