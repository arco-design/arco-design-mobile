## 横向步骤条-多行文字 @en{Horizontal Steps Bar - Multiline Text}

#### 2

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1}>
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="In progress" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
        </div>
    );
}
```
