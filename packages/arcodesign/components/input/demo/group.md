## 输入框组合 @en{Input Group}

#### 9

```js
import { Input, Cell } from '@arco-design/mobile-react';

export default function InputDemo() {
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Name">
                <Input placeholder="Please enter name" border="none" />
            </Cell>
            <Cell label="Phone">
                <Input placeholder="Please enter the phone number" border="none" />
            </Cell>
            <Cell label="Email">
                <Input placeholder="Please input your email" border="none" />
            </Cell>
            <Cell label="Remark">
                <Input placeholder="Please enter remark" border="none" />
            </Cell>
        </Cell.Group>
    </>);
}
```
