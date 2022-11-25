## 自定义对齐方式 @en{Custom Alignment}

#### 6.5

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1} direction="horizontal" align="start" style={{ marginLeft: 20 }}>
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
            <div className="divide"></div>
            <Steps current={1} direction="vertical" align="center">
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
        </div>
    );
}
```
