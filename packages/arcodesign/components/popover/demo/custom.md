## 特殊气泡样式 @en{Special Popover Style}
#### 9

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    return (
        <div className="custom-demo-wrapper">
            <Popover
                className="custom-popover"
                content="This is a special bubble style displayed for single line text"
                direction="topLeft"
                onChange={visible => {
                    console.log('The bubble state is switched to', visible);
                }}
            >
                <Button>Special bubble style</Button>
            </Popover>
        </div>
    );
}
```

```less
.center-box(@height: 100px) {
    height: @height;
    display: flex;
    align-items: center;
    justify-content: center;
}
.custom-demo-wrapper {
    .center-box();
}
.custom-popover {
    .@{prefix}-popover-inner .popover-bg {
        background: linear-gradient(278.7deg, #0578FF 5.08%, #15D5FF 108.09%);
    }
    .@{prefix}-popover-inner .popover-arrow {
        background-color: #2db1f8;
    }
}
```
