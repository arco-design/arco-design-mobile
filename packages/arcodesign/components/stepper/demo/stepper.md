## 自定义步长 @en{Custom step}

#### 4

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="自定义步长">
                <Stepper defaultValue={5} step={5} />
            </Cell>
        </Cell.Group>
    );
}
```
