## 组件调用 @en{Called by component}

#### 4

```js
import { Notify, Cell } from '@arco-design/mobile-react';
import { useState, useEffect, useRef } from 'react';
export default function NotifyDemo() {
    const [visible, setVisible] = useState(false);
    const divRef = useRef(null);
    return (
        <Cell.Group bordered={false}>
            <Cell label="Called by component" showArrow onClick={() => setVisible(!visible)} />

            <Notify
                content='Called by component'
                type="success"
                visible={visible}
                close={() => {
                    setVisible(false);
                }}
            />
        </Cell.Group>
    );
}
```
