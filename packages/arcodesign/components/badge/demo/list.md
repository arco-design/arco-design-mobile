## 列表徽标数-右 @en{Badge List - Right}

#### 3

```js
import { Badge,Cell } from '@arco-design/mobile-react';

export default function BadgeDemo4() {
    return (<>
        <Cell.Group>
            <Cell label="List content" showArrow >
                <Badge dot/>
            </Cell>
            <Cell label="List content" showArrow >
                <Badge text="2"/>
            </Cell>
            <Cell label="List content" showArrow >
                <Badge text="100"/>
            </Cell>
        </Cell.Group>
    </>);
}
```
