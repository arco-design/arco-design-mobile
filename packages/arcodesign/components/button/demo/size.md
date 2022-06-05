## 按钮尺寸 @en{Button size}

#### 5

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    return (
        <>
            <Button size="huge">Huge button</Button>
            <Button inline style={{ marginRight: 40, marginTop: 20 }}> Regular</Button>
            <Button inline size="medium" style={{ marginRight: 40 }}>Middle</Button>
            <Button inline size="small">Small button</Button>
            <Button inline size="mini" style={{ marginTop: 20 }}>Mini</Button>
        </>
    );
}
```
