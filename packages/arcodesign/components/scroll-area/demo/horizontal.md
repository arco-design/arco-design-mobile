## 横向滚动 @en{Horizontal}

#### 2

```js
import { ScrollArea } from '@arco-design/mobile-react';

export default function ScrollAreaDemo() {
    const cards = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <ScrollArea direction="horizontal" style={{ margin: 12, border: '1px solid #e5e6eb' }}>
            <div style={{ display: 'flex', padding: 12 }}>
                {cards.map(card => (
                    <div
                        key={card}
                        style={{
                            flex: 'none',
                            width: 120,
                            height: 56,
                            marginRight: 12,
                            lineHeight: '56px',
                            textAlign: 'center',
                            background: '#f2f3f5',
                        }}
                    >
                        Card {card}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
```
