## 说明文字 @en{Description Text}

#### 7

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
                    <Radio value={1} style={{ height: 76 }}>
                        <div>
                            <div>Option Content 1</div>
                            <div className="demo-radio-desc">Description</div>
                        </div>
                    </Radio>
                </Cell>
                <Cell>
                    <Radio value={2} style={{ height: 76 }}>
                        <div>
                            <div>Option Content 2</div>
                            <div className="demo-radio-desc">Description</div>
                        </div>
                    </Radio>
                </Cell>
            </Radio.Group>
        </Cell.Group>
    );
}
```
