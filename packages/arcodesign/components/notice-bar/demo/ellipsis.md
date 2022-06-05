## 单行溢出样式 @en{Single Line Overflow Style}

#### 6

```js
import { NoticeBar } from '@arco-design/mobile-react';

export default function NoticeBarDemo() {
    return (
        <NoticeBar marquee="none" wrapable={false}>Note that this is a reminder message. This message is very long and will be omitted</NoticeBar>
    );
}
```
