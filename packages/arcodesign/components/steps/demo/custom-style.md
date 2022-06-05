## 自定义样式  @en{Custom Style}

#### 7

```js
import { Steps } from '@arco-design/mobile-react';

export default function StepsDemo() {
    return (
        <div>
            <Steps defaultIndex="2" onChange={index => {console.log(index)}}>
                <Steps.Step title="Start" />
                <Steps.Step title="Step 2" />
                <Steps.Step title="In progress" />
                <Steps.Step title="Finish" />
            </Steps>
        </div>
    );
}
```
