## 加载状态 @en{Loading status}

#### 3

```js
import { Switch, Loading, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    return (
        <Cell label="Loading Status" bordered={false}>
            <Switch
                className="demo-3"
                checked
                innerArea={<Loading type="circle" radius={6}/>}
                platform="ios"
            />
        </Cell>
    );
}
```
