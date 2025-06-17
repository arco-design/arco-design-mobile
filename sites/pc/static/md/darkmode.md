# 暗黑模式

组件库内置暗色的主题，你可以自定义暗黑模式下包裹的样式类名，也可通过修改 tokens 自定义各组件在暗黑模式下的样式，同时也支持了手动切换。

=====================

## 启用/禁用暗黑模式

暗黑模式默认启用，即在判断处于暗黑模式时会应用暗黑模式下定义的样式。是否启用暗黑模式由组件库内置的`@use-dark-mode`变量控制，如果用户所在业务并未适配暗黑模式，可通过 modifyVars 统一禁用：

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-dark-mode': 0, // 禁用暗黑模式样式
    }
}
```

## 自定义暗黑模式条件

组件库默认判断处于暗黑模式的条件是，组件父级以上元素设置了指定的暗黑模式选择器。该选择器由组件库内置的`@arco-dark-mode-selector`变量控制，默认值是`.arco-theme-dark`，用户可根据业务情况，通过 modifyVars 修改该值以自定义暗黑模式条件：

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@arco-dark-mode-selector': '.tt-darkmode-general',
        // 也可定义为类名外的条件，符合css选择器规则即可
        // '@arco-dark-mode-selector': ':root[data-theme="dark"]',
    }
}
```

## 自定义暗黑模式下的组件样式

组件库内置了一套组件在暗黑模式下的色值（详情[戳这里](https://github.com/arco-design/arco-design-mobile/blob/main/packages/arcodesign/tokens/app/arcodesign/default/index.less)），其中以`dark-`开头的变量表示去掉该前缀后的变量名在暗黑模式下的值，如`@dialog-content-background`表示 dialog 面板内容在常规模式下的背景色，而`@dark-dialog-content-background`则表示 dialog 面板内容在暗黑模式下的背景色。如果用户需要覆盖暗黑模式下的值，通过 modifyVars 或 less 样式覆盖的方式，修改`@dark-`开头的变量值即可。

用户也可通过调用`.use-dark-mode-query()`直接指定暗黑模式下的样式规则：

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

## 手动切换到暗黑模式

移动端的暗黑模式通常由一个组件之外的统一开关控制，一般情况下只需定义组件在暗黑模式对应类名下的样式，但组件库也支持了手动切换为暗黑模式，即给根级元素`body`设置暗黑模式类名。需要注意的是，这里仅支持给`body`设置类名(class)，其他 attributes 不支持。

传入`isDarkMode`属性，当该属性为`true`时，将在`body`元素上挂载`darkModeSelector`属性指定的类名。`darkModeSelector`属性的值应与`@arco-dark-mode-selector`样式变量的值保持一致。

```js
import React from 'react';
import { ContextProvider } from '@arco-design/mobile-react';

// 适用于 React 18+
const root = ReactDOM.createRoot(CONTAINER);
root.render(
    <ContextProvider isDarkMode={true} darkModeSelector="tt-darkmode-general">
        <YourApp />
    </ContextProvider>,
);

// 适用于 React 16/17
// ReactDOM.render(
//   <ContextProvider isDarkMode={true} darkModeSelector="tt-darkmode-general">
//     <YourApp />
//   </ContextProvider>,
//   CONTAINER
// );
```
