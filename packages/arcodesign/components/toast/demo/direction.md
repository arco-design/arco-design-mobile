## 从其他方向展示 @en{Other Directions}

#### 6

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
            <Cell label="Show from the top" showArrow onClick={() => toast('success', {
                content: 'Success tips',
                layout: 'horizontal',
                direction: 'top',
            })} />
            <Cell label="Show from the bottom" showArrow onClick={() => toast('success', {
                content: 'Success tips',
                layout: 'horizontal',
                direction: 'bottom',
            })} />
        </Cell.Group>
    );
}
```
