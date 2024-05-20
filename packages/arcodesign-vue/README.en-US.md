# Quick Start

Follow the steps below to quickly get started using the component library.

========
## Installation

```
npm install @arco-design/mobile-vue -S
```

## Project Dependencies

```js
"peerDependencies": {
    "vue": "^3.4.0"
}
```

## Self-adaptation

The style uses `rem` for self-adaptation (@base-font-size: 50px). Please make sure that the project has introduced `flexible.js` or other tool functions that can set the basic font size for html according to the screen size. You can also import flexible.js provided in this component library:

```js
import setRootPixel from '@arco-design/mobile-vue/tools/flexible';

setRootPixel();
```

If the `baseFontSize` is different, you can change the incoming parameters and change the `@base-font-size` variable:

```js
// js
/**
 * @param baseFontSize Baseline fontSize of 1rem, default 50
 * @param sketchWidth Width of UI draft, default 375
 * @param maxFontSize Maximum fontSize limit, default 64
 * @return {() => void} removeRootPixel Cancel the baseFontSize setting and remove the resize listener
 */
setRootPixel(37.5);

// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@base-font-size': 37.5,
    }
}
```

## Using components on PC

Only touch-related events are monitored and processed in the component. If you need to use the component on the PC side, you can import `touch2mouse.js` provided by this component library to be compatible with mouse event processing:

```js
import '@arco-design/mobile-vue/tools/touch2mouse';
```
