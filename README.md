<div align="center">
  <a href="https://arco.design/mobile/react" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>
<div align="center">
  <h1>Arco Design Mobile</h1>
</div>

<div align="center">

A comprehensive React UI components library based on the [Arco Design](https://arco.design/mobile/react) system.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design-mobile/blob/main/LICENSE)

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

# Features

- Provides 50+ easy-to-use components based on TypeScript
- Simple and restrained UI design & pixel-accurate restoration
- Pursue the ultimate finger interaction effect
- Online high-traffic verification of important components
- Fine-grained and flexible property configuration
- Support server-side rendering
- Support internationalization
- Support on-demand introduction
- Support theme configuration


# Installation

Available as an [npm package](https://www.npmjs.com/package/@arco-design/mobile-react)

```bash
// with npm
npm install @arco-design/mobile-react

// with yarn
yarn add @arco-design/mobile-react
```

# Examples

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@arco-design/mobile-react/esm/button';
import '@arco-design/mobile-react/esm/button/style';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
```

# Useful Links

* [Documentation website](https://arco.design/mobile/react)
* [Components documentation](https://arco.design/mobile/react/arco-design/pc/)
* [Figma component library](https://www.figma.com/file/hXylPuOK09Lm2GpS8IsTrh/Arco-Design-Mobile)
* [Awesome Arco](https://github.com/arco-design/awesome-arco)

# Browser Support

| <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/browser-ios.png" alt="Safari" width="24px" height="24px" /><br/>Safari on iOS | <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/browser-android.png" alt="Opera" width="20px" height="24px" /><br/>Android Webview |
| --------- | --------- |
| 9 | 4.4 |

# Contributing

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md) and the [Contributing Guide](./CONTRIBUTING.md).

Thank you to all the people who already contributed to Arco Design Mobile!

# License

This project is [MIT licensed](./LICENSE).
