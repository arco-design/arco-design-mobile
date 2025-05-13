## 绝对定位 @en{Absolute Position}

#### 5

```js
import { Sticky, Button } from '@arco-design/mobile-react';

export default function StickyDemo() {
    const container = React.useRef(null);
    const stickyEleRef = React.useRef(null);

    return (
        <div style={{ position: 'relative', border: '12px solid #e5e6eb', padding: 12 }}>
            <div
                style={{
                    height: '300px',
                    overflow: 'scroll',
                    border: '4px solid #e5e6eb',
                }}
                ref={container}
            >
                <div className="demo-sticky-container" style={{ height: 200 }}>My normal content</div>
                <Sticky
                    getScrollContainer={() => container.current}
                    stickyStyle="absolute"
                    ref={stickyEleRef}
                >
                    <Button>Absolute scroll content</Button>
                </Sticky>
                <div className="demo-sticky-container" style={{ height: 500 }}>My normal content</div>
            </div>
        </div>
    );
}
```

```less
.demo-sticky-container {
    height: 200px;
    .use-var(background, card-background-color);
    line-height: 80px;
    font-size: 14px;
    color: #939aa3;
    text-align: center;
}
```
