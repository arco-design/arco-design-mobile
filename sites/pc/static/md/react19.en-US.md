# React 19 Adaptation

React 19 has changed the import path of createRoot, making it impossible to directly import within components (lower React versions won't find the module). This will cause error when calling overlay components like `Toast`, `Masking`, `Dialog`, `Popup`, and `ActionSheet` through methods.

=====================

## Solution

When calling overlay components through methods, manually pass the createRoot method to the global context, for example:

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