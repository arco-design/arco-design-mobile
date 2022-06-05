## 禁用状态 @en{Disabled}

#### 2

```js
import { Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const disabledChecked = false;
    return (
        <>
          <Checkbox value={1} disabled={true} checked={disabledChecked} style={{width: '50%'}}>
              Unchecked but disabled
          </Checkbox>
          <Checkbox value={2} disabled={true} style={{width: '50%'}} defaultCheck={true}>Checked but disabled</Checkbox>
        </>
    );
}
```
