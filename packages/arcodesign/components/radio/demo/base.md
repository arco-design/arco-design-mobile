## 通栏样式 @en{Justify Style}

#### 1

```js
import { Radio } from '@arco-design/mobile-react';
import IconCheck from '@arco-design/mobile-react/esm/icon/IconCheck';

export default function RadioDemo() {
    return (
        <Radio
            value={1}
            defaultCheck={true}
            layout="justify"
            icons={{
                active: <IconCheck />,
                activeDisabled: <IconCheck />,
            }}
        >Option Content</Radio>
    );
}
```
