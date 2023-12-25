## 自定义对齐方式 @en{Custom Alignment}

#### 7

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <>
            <Steps current={1} direction="horizontal" align="start" className='steps-custom-align'>
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
            <div className="divide" />
            <Steps current={1} direction="vertical" align="center">
                <Steps.Step title="Start" description="Details" />
                <Steps.Step title="Step 2" description="Details" />
                <Steps.Step title="Step 3" description="Details" />
                <Steps.Step title="Finish" description="Details" />
            </Steps>
        </>
    );
}
```

```less
.divide {
    .rem(height, 8);
    .use-var(background, card-background-color);
}
.steps-custom-align {
    .set-prop-with-rtl(margin-left, 20px);
}
```
