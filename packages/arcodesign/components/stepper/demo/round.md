## 圆角风格 @en{Rounded style}

#### 7

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="圆角风格">
                <Stepper theme="round" />
            </Cell>
        </Cell.Group>
    );
}
```
