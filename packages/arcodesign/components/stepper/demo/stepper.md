## 设置递增值（+5 递增）

#### 4

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="设置递增值">
                <Stepper defaultValue={5} step={5} />
            </Cell>
        </Cell.Group>
    );
}
```
