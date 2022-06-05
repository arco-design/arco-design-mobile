## 气泡操作样式 @en{Popover Operation Style}
#### 8

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    return (
        <div className="suffix-demo-wrapper">
            <Popover
                content="This is a single line of text with a close action style"
                direction="topLeft"
                showCloseIcon
                onChange={visible => {
                    console.log('The bubble state is switched to', visible);
                }}
                onClickCloseIcon={() => {
                    console.log('click icon');
                }}
            >
                <Button>Close Action</Button>
            </Popover>
            <Popover
                content="This is a single line of text with an action button"
                direction="topLeft"
                textSuffix={<div className="custom-suffix-btn">Action</div>}
                onChange={visible => {
                    console.log('The bubble state is switched to', visible);
                }}
                onClickTextSuffix={() => {
                    console.log('click suffix');
                }}
            >
                <Button>Button Action</Button>
            </Popover>
            <Popover
                content="This is a single line of text with a button action"
                direction="topLeft"
                textSuffix={<span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    borderBottom: '1px solid white',
                }}>Go see</span>}
                onChange={visible => {
                    console.log('The bubble state is switched to', visible);
                }}
                onClickTextSuffix={() => {
                    console.log('click suffix');
                }}
            >
                <Button>Text Action</Button>
            </Popover>
        </div>
    );
}
```
