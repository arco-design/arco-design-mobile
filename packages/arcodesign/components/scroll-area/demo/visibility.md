## 滚动条显示方式 @en{Scrollbar visibility}

#### 4

```js
import { ScrollArea } from '@arco-design/mobile-react';

export default function ScrollAreaDemo() {
    const lines = Array.from({ length: 30 }, (_, i) => i + 1);
    const renderLines = () =>
        lines.map(line => (
            <div key={line} style={{ padding: '8px 12px' }}>
                Line {line}
            </div>
        ));

    return (
        <>
            <ScrollArea
                scrollbarVisibility="always"
                style={{ height: 120, margin: 12, border: '1px solid #e5e6eb' }}
            >
                {renderLines()}
            </ScrollArea>
            <ScrollArea
                hideDelay={300}
                style={{ height: 120, margin: 12, border: '1px solid #e5e6eb' }}
            >
                {renderLines()}
            </ScrollArea>
            <ScrollArea
                scrollbarVisibility="hidden"
                style={{ height: 120, margin: 12, border: '1px solid #e5e6eb' }}
            >
                {renderLines()}
            </ScrollArea>
        </>
    );
}
```
