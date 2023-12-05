## 说明文字-禁用 @en{Description Text - Disabled}

#### 8

```js
import { Radio } from '@arco-design/mobile-react';
import './index.less';

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

```less
.demo-radio-desc {
    .rem(font-size, 12);
    .rem(line-height, 16);
    .rem(margin-top, 6);
    .use-var(color, sub-info-font-color);
}
```
