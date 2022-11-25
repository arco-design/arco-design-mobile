## 显示边框 @en{Bordered style}

#### 6

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="显示边框">
                <Stepper theme="square" />
            </Cell>
        </Cell.Group>
    );
}
```
