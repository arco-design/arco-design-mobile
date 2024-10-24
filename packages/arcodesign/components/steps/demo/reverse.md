## 顺序反转 @en{Reverse Order}

#### 9

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps reverseOrder current={1}>
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
            <div className="divide" />
            <Steps reverseOrder current={1} direction="vertical" iconType="dot">
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
        </div>
    );
}
```

```less
.divide {
    .rem(height, 8);
    .use-var(background, card-background-color);
}
```
