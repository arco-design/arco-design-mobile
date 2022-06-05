## 加载状态 @en{Loading Status}

#### 3

```js
import { Toast, Cell } from '@arco-design/mobile-react';

export default function ToastDemo() {

    function toast(options, type = 'toast') {
        if (!!window.toastInstance) {
            window.toastInstance.close();
        }
        window.toastInstance = Toast[type](options);
    }

    return (
        <Cell.Group bordered={false}>
            <Cell label="Loading icon" showArrow onClick={() => toast({
                loading: true,
            })} />
            <Cell label="Loading icon + Text" showArrow onClick={() => toast({
                content: 'Loading, no interaction',
                disableBodyTouch: true,
            }, 'loading')} />
            <Cell label="Loading progress" showArrow onClick={() => {
                toast({
                    content: 'Loading...',
                    loading: true,
                    loadingInner: "50%",
                    disableBodyTouch: true,
                });
                setTimeout(() => {
                    window.toastInstance.update({
                        loadingInner: "100%",
                    });
                }, 2000);
            }} />
        </Cell.Group>
    );
}
```
