## 只读（仅只读状态没有光标显示）

#### 5

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="只读">
                <Stepper defaultValue={5} inputReadonly />
            </Cell>
        </Cell.Group>
    );
}
```
