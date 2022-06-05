## 自定义图标  @en{Custom Icon}

#### 8

```js
import { Rate } from '@arco-design/mobile-react';
import IconSmileFill from '@arco-design/mobile-react/esm/icon/IconSmileFill';

export default function BaseRateDemo5() {
    return (
        <Rate
            defaultValue={3}
            icons={{ active: <IconSmileFill />, normal: <IconSmileFill /> }}
        />
    );
}
```
