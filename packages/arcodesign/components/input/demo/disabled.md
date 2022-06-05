## 禁用状态 @en{Disabled Status}

#### 2

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    return (<>
        <Input
            label="Title Text"
            placeholder=""
            disabled
            border="none"
            value="Input disabled"
        />
        <Input
            label="Title Text"
            placeholder="Please enter nickname"
            readOnly
            border="none"
            value="Input readonly"
            inputStyle={{ color: '#86909C' }}
        />
    </>);
}
```
