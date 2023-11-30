## 气泡菜单点击效果 @en{Popover Menu Click Effect}
#### 5

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    const menu = [
        'Bubble menu text content 1',
        'Bubble menu text content 2',
        'Bubble menu text content 3',
    ];
    return (
        <div className="menu-demo-wrapper">
            <Popover.Menu
                className="popover-with-margin"
                direction="bottomLeft"
                onSelect={value => console.log('select', value)}
                menu={menu}
                theme="white"
                key="white"
                useClickStatus
            >
                <Button>White</Button>
            </Popover.Menu>
            <Popover.Menu
                direction="bottomRight"
                onSelect={value => console.log('select', value)}
                menu={menu}
                key="black"
                useClickStatus
            >
                <Button>Black</Button>
            </Popover.Menu>
        </div>
    );
}
```
