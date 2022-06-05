## 辅助按钮 @en{Auxiliary button}

#### 2

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    return (
        <>
        <Button type="default" needActive>
            Auxiliary
        </Button>

        <Button type="default" disabled style={{ marginTop: 20 }}>
            Disabled
        </Button>
        </>
    );
}
```
