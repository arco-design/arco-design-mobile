## 自定义分页器 @en{Custom Pagination}

#### 6


```js
import { Pagination, Button } from '@arco-design/mobile-react';
import './index.less';

export default function PaginationDemo() {
    const [current, setCurrent] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);
    const ghostBtnStyles = {
        primary: {
            color: '#165DFF',
            borderColor: '#BEDAFF'
        },
        default: {
            color: '#1D2129',
            borderColor: '#E5E6EB'
        }
    }

    return (
        <Pagination
            current={current}
            total={60}
            pageSize={pageSize}
            renderPrevField={({ current }) => (
                <div
                    className="demo-btn"
                    onClick={() => setCurrent(Math.max(1, current - 1))}
                >
                    {current === 1 ? '' : `Chapter ${current}`}
                </div>
            )}
            renderNextField={({ current, pageNum }) => (
                <div
                    className="demo-btn"
                    onClick={() => setCurrent(Math.min(60 / pageSize, current + 1))}
                >
                    {current >= pageNum ? '' : `Chapter ${current}`}
                </div>
            )}
            onChange={({ current }) => setCurrent(current)}
        />
    );
}
```

```less
.demo-btn {
    font-size: 16px;
}
```
