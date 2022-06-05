## 基础分页器 @en{Basic Pagination}

#### 1

```js
import { Pagination } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);
    const [currentP, setCurrentP] = React.useState(1);
    return (
        <div>
            <Pagination current={current} total={60} onChange={({ current }) => setCurrent(current)}/>
            <Pagination current={currentP} total={60} type="primary" onChange={({ current }) => setCurrentP(current)}/>
        </div>
    );
}
```
