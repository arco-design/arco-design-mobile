## 双向滚动 @en{Both directions}

#### 3

```js
import { ScrollArea } from '@arco-design/mobile-react';

export default function ScrollAreaDemo() {
    const rows = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <ScrollArea
            direction="both"
            scrollbarVisibility="always"
            style={{ height: 200, margin: 12, border: '1px solid #e5e6eb' }}
        >
            {rows.map(row => (
                <div key={row} style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                    Row {row}: this line is intentionally much wider than the container so that it can be scrolled horizontally as well.
                </div>
            ))}
        </ScrollArea>
    );
}
```
