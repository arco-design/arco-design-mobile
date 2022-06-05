## 简单分页器 @en{Simple Pagination}

#### 5

```js
import { Pagination } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);

    return (
        <Pagination
            type="none"
            current={current}
            total={50}
            onChange={({ current }) => setCurrent(current)}
        />
    );
}
```
