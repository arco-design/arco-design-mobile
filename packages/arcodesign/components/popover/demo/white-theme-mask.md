
## 白色气泡（带有遮罩） @en{White Popover with Mask}
#### 3

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    return (
        <div className="white-theme-mask-demo-wrapper">
            <Popover
                content="Bubble centered"
                direction="topCenter"
                clickSelfToClose={true}
                theme="white"
                mode="global"
                showMask={true}
                onChange={visible => {
                    console.log(visible);
                }}
            >
                <Button>White bubble with mask</Button>
            </Popover>
        </div>
    );
}
```
