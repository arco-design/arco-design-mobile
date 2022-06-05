## 加载按钮 @en{Loading button}

#### 6

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    return (
        <>
        <Button loading inline style={{ marginRight: 11 }}>
            Primary
        </Button>

        <Button type="ghost" loading inline>
            Secondary
        </Button>
        </>
    );
}
```
