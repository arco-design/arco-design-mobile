## 禁用状态单选框与列表项 @en{Disabled Radio and Radio Group}

#### 5

```js
import { Cell, Radio } from '@arco-design/mobile-react';

export default function RadioDemo() {
    return (
        <Cell.Group className="demo-radio-cell-group" bordered={false}>
            <Radio.Group
                layout="block"
                disabled={true}
                defaultValue={1}
                className="demo-radio-no-padding"
            >
                <Cell>
                    <Radio value={1} style={{ height: 54 }}>Single option 1</Radio>
                </Cell>
                <Cell>
                    <Radio value={2} style={{ height: 54 }}>Single option 2</Radio>
                </Cell>
            </Radio.Group>
        </Cell.Group>
    );
}
```
