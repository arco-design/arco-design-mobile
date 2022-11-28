## 设置固定小数点 @en{Fixed decimal point}

#### 3

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="设置小数点">
                <Stepper min={0} defaultValue={0.99} max={2.5} digits={1} step={0.1} />
            </Cell>
        </Cell.Group>
    );
}
```
