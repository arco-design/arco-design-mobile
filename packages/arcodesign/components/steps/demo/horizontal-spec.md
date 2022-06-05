## 横向步骤条-无文字 @en{Horizontal Steps Bar - No Text}

#### 3

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1} items={new Array(4).fill({})} />
        </div>
    );
}
```
