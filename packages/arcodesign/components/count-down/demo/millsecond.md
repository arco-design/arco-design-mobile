## 毫秒级渲染 @en{Rendering in milliseconds}

#### 4

```js
import { CountDown } from '@arco-design/mobile-react';

export default function CountDownDemo4() {
    return (
        <CountDown
            millisecond
            format="HH:mm:ss.SSS"
            time={{hours: 4,minutes: 36, seconds: 9, millseconds: 1}}
        />
    );
}
```
