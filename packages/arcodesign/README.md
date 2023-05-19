# 快速上手

跟随以下的步骤，快速上手组件库的使用。

========
## 安装方式

```
npm install @arco-design/mobile-react -S
```

## 项目依赖

```js
"peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0",
    "react-transition-group": ">=4.3.0"
}
```

## 自适应适配

样式采用 rem 进行自适应适配（@base-font-size: 50px），请确保项目已引入 flexible.js 等可根据屏幕大小为 html 设置基础字号的工具函数，也可以引入本 sdk 中提供的 flexible.js：

```js
import setRootPixel from '@arco-design/mobile-react/tools/flexible';

setRootPixel();
```

如果baseFontSize不一样，可更改传入参数，并更改@base-font-size变量：

```js
// js
/**
 * @param baseFontSize 1rem基准fontSize，默认 50
 * @param sketchWidth UI稿宽度，默认 375
 * @param maxFontSize 最大fontSize限制， 默认 64
 * @return {Function} removeRootPixel 取消baseFontSize设置并移除resize监听，类型为 () => void
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

## CDN 引入

可通过 `<script>` 标签引入 CDN 形式资源，注意需先引入 peerDependencies 的 CDN 资源。

React & ReactDOM： **<a href="https://reactjs.org/docs/cdn-links.html" target="_blank">戳这里获取</a>**

React Transition Group： **<a href="https://reactcommunity.org/react-transition-group/" target="_blank">戳这里获取</a>**

```
<link ref="stylesheet" href="https://unpkg.com/@arco-design/mobile-react@2.27.4/dist/style.min.css">
<script src="https://unpkg.com/@arco-design/mobile-react@2.27.4/dist/index.min.js"></script>
```

## 引入全部

注意样式文件需自行引入。

```js
import Arco from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/style';

```

## 部分引入（推荐）

推荐使用 `babel-plugin-import` 引入（该插件更多灵活配置 **<a href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">戳这里</a>** ）：

```
npm install babel-plugin-import -D
```

### 组件按需引入

**.babelrc.js** 中配置：

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react",
        "libraryDirectory": "esm", // 注意如果是 SSR 环境，这里需使用 `cjs`
        "style": (path) => `${path}/style`,
    }]
]
```

### Icon 按需引入

**.babelrc.js** 中配置：

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react/esm/icon", // 注意如果是 SSR 环境，这里需将 `esm` 替换为 `cjs`
        "libraryDirectory": "",
        "camel2DashComponentName": false,
    }]
]
```

如果同时存在 **组件** 和 **Icon** 的按需引入方式，需要在第三个参数加上不同 name 值

```js
plugins: [
    ["import", {
        "libraryName": "@arco-design/mobile-react",
        "libraryDirectory": "esm", // 注意如果是 SSR 环境，这里需使用 `cjs`
        "style": (path) => `${path}/style`
    }, "@arco-design/mobile-react"],
    ["import", {
        "libraryName": "@arco-design/mobile-react/esm/icon", // 注意如果是 SSR 环境，这里需将 `esm` 替换为 `cjs`
        "libraryDirectory": "",
        "camel2DashComponentName": false
    }, "@arco-design/mobile-react/esm/icon"]
]
```

则引入时只需写入一行即可，babel-plugin-import在打包时会按需加载而不是整体引入：

```js
import { Button as ArcoButton } from '@arco-design/mobile-react';

import { IconAsk, IconBack } from '@arco-design/mobile-react/esm/icon';
```

## 部分引入（手动）

如果不使用babel-plugin-import，则需要手动引入js和css文件。下方例子效果等同于上方引入语句：

```js
import ArcoButton from '@arco-design/mobile-react/esm/button';
import '@arco-design/mobile-react/esm/button/style';

import IconAsk from '@arco-design/mobile-react/esm/icon/IconAsk';
```

## 主题变量定制 & 动态切换

本组件库使用了less和css变量实现主题定制。其中css变量主要作用于运行时的动态主题切换，默认关闭，如有动态切换主题需求，可配置less options开启css变量：

```js
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-css-vars': 1, // 开启css变量
    }
},
```

注意在配置开启css变量后，如有变量替换需同时替换css变量：

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
    --primary-color: red;
}
```

## 在 PC 端使用组件

组件中仅监听及处理 touch 相关事件，如需在 PC 端使用组件，可引入本组件库提供的 touch2mouse.js 以兼容 mouse 事件处理：

```js
import '@arco-design/mobile-react/tools/touch2mouse';
```
