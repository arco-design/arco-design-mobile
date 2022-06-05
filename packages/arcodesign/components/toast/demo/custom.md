## 自定义 @en{Custom}

#### 5

```js
import { Toast, Cell } from '@arco-design/mobile-react';
import IconStar from '@arco-design/mobile-react/esm/icon/IconStar';

export default function ToastDemo() {

    function toast(options) {
        if (!!window.toastInstance) {
            window.toastInstance.close();
        }
        window.toastInstance = Toast.toast(options);
    }

    return (
        <Cell.Group bordered={false}>
            <Cell label="Custom icon" showArrow onClick={() => toast({
                icon: <IconStar />,
                content: 'Custom icon',
            })} />
        </Cell.Group>
    );
}
```
