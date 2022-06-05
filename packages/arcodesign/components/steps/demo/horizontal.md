## 横向步骤条 @en{Horizontal Steps Bar}

#### 1

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    const items = [{
        title: 'Start',
    }, {
        title: 'In progress',
    }, {
        title: 'Step 3',
    }, {
        title: 'Finish',
    }];
    return (
        <div>
            <Steps current={1} items={items} onClick={(index) => { console.log(index); }} />
        </div>
    );
}
```
