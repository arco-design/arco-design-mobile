## 默认 @en{Default}

#### 1

```js
import { Stepper, Cell } from '@arco-design/mobile-react';

export default function StepperDemo() {
    return (
        <Cell.Group bordered={false}>
            <Cell label="单边禁用">
                <Stepper />
            </Cell>
            <Cell label="可用状态">
                <Stepper defaultValue={1} min={-1} max={2} step={1} digits={1}/>
            </Cell>
            <Cell label="禁用状态">
                <Stepper disabled/>
            </Cell>
        </Cell.Group>
    );
}
```
