### 自定义头尾部内容  @en{Custom header and footer content}

#### 9

```js
import { Cell, Loading } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group
            header="Load Status"
            footer={
                <div className="demo-cell-loading-group">
                    <Loading type="circle" color="currentColor" radius={6} className="demo-cell-loading" />
                    Loading
                </div>
            }
            style={{ marginTop: 16 }}
        >
            <Cell label="List Content" showArrow />
            <Cell label="List Content" showArrow />
            <Cell label="List Content" showArrow />
        </Cell.Group>
    </>);
}
```

```less
.demo-cell-loading-group {
    text-align: center;
    .demo-cell-loading {
        vertical-align: middle;
        .rem-with-rtl(margin-right, 5);
    }
}
```
