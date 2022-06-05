## 不再提示 @en{Do not remind again}

#### 8

```js
import { NoticeBar, Toast } from '@arco-design/mobile-react';

export default function NoticeBarDemo() {
    return (
        <NoticeBar
            closeIcon="Do not remind again"
            onClose={() => {
                if (!!window.toastInstance) {
                    window.toastInstance.close();
                }
                window.toastInstance = Toast.toast(`Don't remind next time`);
            }}
        >
            This is a reminder message.
        </NoticeBar>
    );
}
```
