## 文字分页器 @en{Text Pagination}

#### 2

```js
import { Pagination } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);

    return (
        <Pagination
            current={current}
            total={50}
            type="text"
            onChange={({ current }) => setCurrent(current)}
        />
    );
}
```
