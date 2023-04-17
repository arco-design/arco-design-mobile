## 设置最大/最小值 @en{Max/Min value}

#### 2

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="设置最大/最小值">
                <Stepper defaultValue={8} min={0} max={10} />
            </Cell>
        </Cell.Group>
    );
}
```
