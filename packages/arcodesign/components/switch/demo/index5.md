## 直角 @en{Right angle}

#### 5

```js
import { Switch, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    return (
        <Cell label="Android Right Angle" bordered={false}>
            <Switch
                defaultChecked={false}
                platform="android"
                shape="semi"
            />
        </Cell>
    );
}
```
