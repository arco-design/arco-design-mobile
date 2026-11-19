## 基础用法 @en{Basic Usage}

#### 1

```js
import { ScrollArea } from '@arco-design/mobile-react';

export default function ScrollAreaDemo() {
    const lines = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <ScrollArea style={{ height: 200, margin: 12, border: '1px solid #e5e6eb' }}>
            {lines.map(line => (
                <div key={line} style={{ padding: '8px 12px' }}>
                    Line {line}
                </div>
            ))}
        </ScrollArea>
    );
}
```
