## 自定义格式 @en{Custom Format}

#### 2

```js
import { CountDown } from '@arco-design/mobile-react';

export default function CountDownDemo2() {
    return (
        <div>
            <CountDown
                format="D day, HH : mm : ss"
                time={{days: 2, hours: 4,minutes: 36, seconds: 9}}
            />
        </div>
    );
}
```
