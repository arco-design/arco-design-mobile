## 图标+文字 @en{Icon + Text}

#### 6

```js
import { Cell } from '@arco-design/mobile-react';
import IconUser from '@arco-design/mobile-react/esm/icon/IconUser';
import IconSound from '@arco-design/mobile-react/esm/icon/IconSound';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell icon={<IconUser />} label="List Content" showArrow />
            <Cell icon={<IconSound />} label="List Content" showArrow />
        </Cell.Group>
    </>);
}
```
