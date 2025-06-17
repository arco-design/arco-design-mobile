# React 19 适配

React 19 修改了 createRoot 的引入路径，导致组件内部无法直接引入（低react版本会找不到模块）。这会导致`Toast`、`Masking`、`Dialog`、`Popup`、`ActionSheet` 等浮层组件通过方法进行调用时会报错。

=====================

## 解决方案


在对浮层类组件通过方法调用时，向全局 context 手动传入 createRoot 方法，如：

```js
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Toast, Masking } from '@arco-design/mobile-react';

useEffect(() => {
    Toast.toast('Tips', { createRoot });
    Masking.open({
        children: <img src="test.png" />,
    }, { createRoot });
}, []);
```
