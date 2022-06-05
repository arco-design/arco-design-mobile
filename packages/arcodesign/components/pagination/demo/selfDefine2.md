## 线框分页器 @en{Wireframe Pagination}

#### 7


```js
import { Pagination, Button } from '@arco-design/mobile-react';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);

    return (
        <Pagination
            current={current}
            total={60}
            pageSize={pageSize}
            icon
            renderPrevField={({ current }) => (
                <Button
                    style={{ width: 'fit-content' }}
                    type="ghost"
                    color = "#1D2129"
                    borderColor = "#E5E6EB"
                    disabled={current <= 1}
                    onClick={() => setCurrent(Math.max(1, current - 1))}
                >{current === 1 ? 'None' : `Chapter ${current}`}</Button>
            )}
            renderNextField={({ current, pageNum }) => (
                <Button
                    style={{ width: 'fit-content' }}
                    type="ghost"
                    color="#165DFF"
                    borderColor="#BEDAFF"
                    disabled={current >= pageNum}
                    onClick={() => setCurrent(Math.min(60 / pageSize, current + 1))}
                >{current >= pageNum ? 'None' : `Chapter ${current}`}</Button>
            )}
            onChange={({ current }) => setCurrent(current)}
        />
    );
}
```
