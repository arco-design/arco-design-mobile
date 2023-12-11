## 单选框与列表项 @en{Radio and Radio Group}

#### 4

```js
import { Cell, Radio } from '@arco-design/mobile-react';

export default function RadioDemo() {
    const [value, setValue] = React.useState(1)

    return (
        <Cell.Group className="demo-radio-cell-group" bordered={false}>
            <Radio.Group
                layout="block"
                defaultValue={value}
                onChange={value => {
                    setValue(value);
                }}
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

```less
.demo-radio-no-padding {
    .rem(margin, -16, 0);
}
.demo-radio-cell-group {
    .rem(margin, 0, -16);
}
```
