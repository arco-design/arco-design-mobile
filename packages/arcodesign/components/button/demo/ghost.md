## 线框按钮 @en{Wireframe button}

#### 3

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    return (
        <>
        <Button type="ghost">
            Wireframe
        </Button>

        <Button type="ghost" disabled style={{ marginTop: 20 }}>
            Disabled
        </Button>
        </>
    );
}
```
