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
