## 禁用样式 @en{Disabled Status}

#### 2

```js
import { Radio } from '@arco-design/mobile-react';
import IconCheck from '@arco-design/mobile-react/esm/icon/IconCheck';

export default function RadioDemo() {
    return (
        <Radio
            value={1}
            defaultCheck={true}
            disabled={true}
            layout="justify"
            icons={{
                active: <IconCheck />,
                activeDisabled: <IconCheck />,
            }}
        >Option Content</Radio>
    );
}
```
