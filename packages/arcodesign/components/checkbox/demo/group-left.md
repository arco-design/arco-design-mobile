## 列表组合-左勾选 @en{Group-Left Check}

#### 7

```js
import { Cell, Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const [value, setValue] = React.useState([1, 3]);

    return (
        <Cell.Group className="demo-checkbox-cell-group" bordered={false}>
            <Checkbox.Group layout='block' defaultValue={value}>
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

```less
.demo-checkbox-cell-group {
    .rem(margin, -16);
}
```
