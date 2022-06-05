## 图标分页器（居中对齐） @en{Icon Pagination (center align)}

#### 4

```js
import { Pagination } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);

    return (
        <Pagination
            current={current}
            total={60}
            icon
            justify="center"
            prevFieldText=""
            nextFieldText=""
            onChange={({ current }) => setCurrent(current)}
        />
    );
}
```
