## 点击更多 @en{Click for More}

#### 7

```js
import { NoticeBar, Toast } from '@arco-design/mobile-react';
import IconArrowIn from '@arco-design/mobile-react/esm/icon/IconArrowIn';

export default function NoticeBarDemo() {
    return (
        <NoticeBar
            closeable={false}
            rightContent={<IconArrowIn />}
            onClick={() => {
                if (!!window.toastInstance) {
                    window.toastInstance.close();
                }
                window.toastInstance = Toast.toast('Click to see more');
            }}
        >
            Note that this is a reminder message.
        </NoticeBar>
    );
}
```
