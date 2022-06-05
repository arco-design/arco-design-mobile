## 不同状态 @en{Different Status}

#### 2

```js
import { Toast, Cell } from '@arco-design/mobile-react';

export default function ToastDemo() {

    function toast(func, options) {
        if (!!window.toastInstance) {
            window.toastInstance.close();
        }
        window.toastInstance = Toast[func](options);
    }

    return (
        <Cell.Group bordered={false}>
            <Cell label="Success tips" showArrow onClick={() => toast('success', 'Success tips')} />
            <Cell label="Error tips" showArrow onClick={() => toast('error', 'Error tips')} />
            <Cell label="Warning tips" showArrow onClick={() => toast('warn', 'Warning tips')} />
        </Cell.Group>
    );
}
```
