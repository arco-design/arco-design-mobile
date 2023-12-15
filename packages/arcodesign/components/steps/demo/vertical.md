## 竖向步骤条 @en{Vertical Steps Bar}

#### 6

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps current={1} direction="vertical">
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
            <div className="divide" />
            <Steps current={1} direction="vertical" iconType="dot">
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
