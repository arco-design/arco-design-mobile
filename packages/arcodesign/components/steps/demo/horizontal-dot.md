## 迷你版 @en{Mini}

#### 4

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1} iconType="dot" items={new Array(5).fill({})} />
        </div>
    );
}
```
