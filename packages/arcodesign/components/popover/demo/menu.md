## 气泡菜单 @en{Popover Menu}
#### 4

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    const menu = [
        'Bubble menu text content 1',
        'Bubble menu text content 2',
    ];
    return (
        <div className="menu-demo-wrapper">
            <Popover.Menu
                style={{marginRight: 66}}
                direction="bottomLeft"
                onSelect={value => console.log('select', value)}
                menu={menu}
                theme="white"
                key="white"
            >
                <Button>White</Button>
            </Popover.Menu>
            <Popover.Menu
                direction="bottomRight"
                onSelect={value => console.log('select', value)}
                menu={menu}
                key="black"
            >
                <Button>Black</Button>
            </Popover.Menu>
        </div>
    );
}
```
