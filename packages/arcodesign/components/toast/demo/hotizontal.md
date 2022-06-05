## 横向排布 @en{Horizontal Direction}

#### 4

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
            <Cell label="Success tips" showArrow onClick={() => toast('success', {
                content: 'Success tips',
                layout: 'horizontal',
            })} />
            <Cell label="Error tips" showArrow onClick={() => toast('error', {
                content: 'Error tips',
                layout: 'horizontal',
            })} />
            <Cell label="Warning tips" showArrow onClick={() => toast('warn', {
                content: 'Warning tips',
                layout: 'horizontal',
            })} />
        </Cell.Group>
    );
}
```
