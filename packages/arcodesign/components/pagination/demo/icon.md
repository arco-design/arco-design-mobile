## 图标分页器 @en{Icon Pagination}

#### 3

```js
import { Pagination } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(2);

    return (
        <Pagination current={current} total={50} icon onChange={({ current }) => setCurrent(current)}/>
    );
}
```
