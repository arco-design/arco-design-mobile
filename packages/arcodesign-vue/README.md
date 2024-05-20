# 快速上手

跟随以下的步骤，快速上手组件库的使用。

========
## 安装方式

```
npm install @arco-design/mobile-vue -S
```

## 项目依赖

```js
"peerDependencies": {
    "vue": "^3.4.0"
}
```

## 自适应适配

样式采用 rem 进行自适应适配（@base-font-size: 50px），请确保项目已引入 flexible.js 等可根据屏幕大小为 html 设置基础字号的工具函数，也可以引入本 sdk 中提供的 flexible.js：

```js
import setRootPixel from '@arco-design/mobile-vue/tools/flexible';

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

## 在 PC 端使用组件

组件中仅监听及处理 touch 相关事件，如需在 PC 端使用组件，可引入本组件库提供的 touch2mouse.js 以兼容 mouse 事件处理：

```js
import '@arco-design/mobile-vue/tools/touch2mouse';
```
