## 基础样式 @en{Basic Style}

#### 1

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    return (
        <div className="popover-base-demo-wrapper">
            <div className="base-item" key="white">
                <Popover
                    content="Bubble centered"
                    direction="topCenter"
                    theme="white"
                    bordered={false}
                    needShadow
                    touchOtherToClose
                    onChange={visible => {
                        console.log('The bubble state is switched to', visible);
                    }}
                >
                        <Button>White</Button>
                </Popover>
            </div>
            <div className="base-item" key="black">
                <Popover
                    content="Bubble centered"
                    direction="topCenter"
                    onChange={visible => {
                        console.log('The bubble state is switched to', visible);
                    }}
                >
                        <Button>Black</Button>
                </Popover>
            </div>
        </div>
    );
}
```
