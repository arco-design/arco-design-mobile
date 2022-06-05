## 带icon通知 @en{Notice with Icon}

#### 2

```js
import { NoticeBar } from '@arco-design/mobile-react';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';

export default function NoticeBarDemo() {
    return (
        <NoticeBar leftContent={<IconNotice />}>Note that this is a reminder message.</NoticeBar>
    );
}
```
