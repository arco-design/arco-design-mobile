## 基础样式 @en{Basic Style}

#### 1

```js
import { CountDown } from '@arco-design/mobile-react';

export default function CountDownDemo() {
    return (
        <CountDown
            format="HH:mm:ss"
            time={{hours: 4,minutes: 36, seconds: 9}}
        />
    );
}
```
