## 自定义详细信息 @en{Custom Description}

#### 5

```js
import { Cell, Switch } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell label="List Content" showArrow>
                <Switch platform="ios" defaultChecked={true} />
            </Cell>
        </Cell.Group>
    </>);
}
```
