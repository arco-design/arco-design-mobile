## 相对滚动 @en{Relative scrolling}

#### 3

```js
import { Sticky, Button } from '@arco-design/mobile-react';

export default function StickyDemo3() {
    const container = React.useRef(null);
    const stickyEleRef = React.useRef(null);

    React.useEffect(() => {
        const scrollingWrapper = window;
        const update = () => {
            if (stickyEleRef.current) {
                stickyEleRef.current.recalculatePosition();
            }
        }

        scrollingWrapper.addEventListener('scroll', update);

        return () => {
            scrollingWrapper.removeEventListener('scroll', update);
        }
    }, [stickyEleRef]);

    return (<>
        <div
            style={{
                height: '300px',
                overflow: 'scroll',
            }}
            ref={container}
        >
            <div className="demo-sticky-container" style={{ height: 200 }}>My normal content</div>
            <Sticky
                getScrollContainer={() => container.current}
                ref={stickyEleRef}
            >
                <Button>Relative scroll content</Button>
            </Sticky>
            <div className="demo-sticky-container" style={{ height: 500 }}>My normal content</div>
        </div>
    </>);
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
