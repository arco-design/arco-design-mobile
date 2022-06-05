## 列表组合-右勾选 @en{Group-Right Check}

#### 8

```js
import { Cell, Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    return (
        <Cell.Group className="demo-checkbox-cell-group" bordered={false}>
            <Checkbox.Group layout="justify" defaultValue={[1, 3]}>
                <Cell>
                    <Checkbox value={1} style={{ height: 54 }}>Option content</Checkbox>
                </Cell>
                <Cell>
                    <Checkbox value={2} style={{ height: 54 }}>Option content</Checkbox>
                </Cell>
                <Cell>
                    <Checkbox value={3} style={{ height: 54 }}>Option content</Checkbox>
                </Cell>
                <Cell>
                    <Checkbox value={4} style={{ height: 54 }}>Option content</Checkbox>
                </Cell>
            </Checkbox.Group>
        </Cell.Group>
    );
}
```
