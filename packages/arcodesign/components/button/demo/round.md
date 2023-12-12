## 按钮形状 @en{Button shape}

#### 8

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button inline shape="round" style={{marginRight: "20px", flex: 1 }}>Rounded</Button>
            <Button inline shape="square" style={{flex: 1}}>Right angle</Button>
        </div>
    );
}
```
