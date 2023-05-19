# Quick Start

Follow the steps below to quickly get started using the component library.

========
## Installation

```
npm install @arco-design/mobile-react -S
```

## Project Dependencies

```js
"peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0",
    "react-transition-group": ">=4.3.0"
}
```

## Self-adaptation

The style uses `rem` for self-adaptation (@base-font-size: 50px). Please make sure that the project has introduced `flexible.js` or other tool functions that can set the basic font size for html according to the screen size. You can also import flexible.js provided in this component library:

```js
import setRootPixel from '@arco-design/mobile-react/tools/flexible';

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

## Import with CDN

You can import CDN resources through the `<script>` tag. Note that you need to import the CDN resources of peerDependencies first.

React & ReactDOM: **<a href="https://reactjs.org/docs/cdn-links.html" target="_blank">Click here</a>**

React Transition Group: **<a href="https://reactcommunity.org/react-transition-group/" target="_blank">Click here</a>**

```
<link ref="stylesheet" href="https://unpkg.com/@arco-design/mobile-react@2.27.4/dist/style.min.css">
<script src="https://unpkg.com/@arco-design/mobile-react@2.27.4/dist/index.min.js"></script>
```

## Full import

Note that style files need to be imported manually.

```js
import Arco from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/style';

```

## Partial import (Recommended)

It is recommended to use `babel-plugin-import` to import. (**<a href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">Click here</a>** to get more flexible configuration of this plugin):

```
npm install babel-plugin-import -D
```

### Import components on demand

**.babelrc.js**:

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react",
        "libraryDirectory": "esm", // In SSR environment, you need to use `cjs` here
        "style": (path) => `${path}/style`,
    }]
]
```

### Import icons on demand

**.babelrc.js**:

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react/esm/icon", // In SSR environment, you need to replace `esm` with `cjs`
        "libraryDirectory": "",
        "camel2DashComponentName": false,
    }]
]
```

If both **component** and **Icon** need to be imported on demand, you need to add a different name value to the third parameter.

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react",
        "libraryDirectory": "esm", // In SSR environment, you need to use `cjs` here
        "style": (path) => `${path}/style`
    }, "@arco-design/mobile-react"],
    ["import", {
        "libraryName": "@arco-design/mobile-react/esm/icon", // In SSR environment, you need to replace `esm` with `cjs`
        "libraryDirectory": "",
        "camel2DashComponentName": false
    }, "@arco-design/mobile-react/esm/icon"]
]
```

Then you only need to write one line when importing, and it will be loaded on demand instead of completely imported when packaging:

```js
import { Button as ArcoButton } from '@arco-design/mobile-react';

import { IconAsk, IconBack } from '@arco-design/mobile-react/esm/icon';
```

## Partial import (manual)

If you don't use babel-plugin-import, you need to import js and css files manually. The following example has the same effect as the import statement above:

```js
import ArcoButton from '@arco-design/mobile-react/esm/button';
import '@arco-design/mobile-react/esm/button/style';

import IconAsk from '@arco-design/mobile-react/esm/icon/IconAsk';
```

## Theme variable customization & dynamic switching

This component library uses `less` and `css` variables for theme customization. The css variable is mainly used for dynamic theme switching at runtime, and is disabled by default. If there is a need for dynamic theme switching, you can configure less options to enable the css variable:

```js
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-css-vars': 1, // Enable css variables
    }
},
```

Note that after configuring and enabling css variables, if there is less variable substitution, you need to replace the css variables at the same time:

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@base-font-size': 37.5,
        '@primary-color': 'red',
    }
}

// css
:root {
    --base-font-size: 37.5;
    --primary-color: red;
}
```

## Using components on PC

Only touch-related events are monitored and processed in the component. If you need to use the component on the PC side, you can import `touch2mouse.js` provided by this component library to be compatible with mouse event processing:

```js
import '@arco-design/mobile-react/tools/touch2mouse';
```
