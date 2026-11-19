## 基础用法 @en{Basic Usage}

#### 2

```js
import { Cell } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell label="List Content" showArrow clickable />
            <Cell label="List Content" showArrow clickable />
            <Cell label="List Content" showArrow clickable />
        </Cell.Group>
    </>);
}
```
