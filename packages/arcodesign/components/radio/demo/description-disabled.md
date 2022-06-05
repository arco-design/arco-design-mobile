## 说明文字-禁用 @en{Description Text - Disabled}

#### 8

```js
import { Radio } from '@arco-design/mobile-react';

export default function RadioDemo() {
    return (
      <Radio value={1} defaultCheck={true} disabled={true} layout="justify">
        <div>
          <div style={{ color: '#c9cdd4' }}>Option Content 2</div>
          <div className="demo-radio-desc">Description</div>
        </div>
      </Radio>
    );
}
```
