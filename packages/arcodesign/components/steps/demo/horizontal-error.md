## 运行错误 @en{Error Status}

#### 5

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    const items = [{
        title: 'Start'
    }, {
        title: 'Error',
        status: 'error',
    }, {
        title: 'Step 3'
    }, {
        title: 'Finish'
    }]
    return (
        <div>
            <Steps current={1} items={items} />
        </div>
    );
}
```
