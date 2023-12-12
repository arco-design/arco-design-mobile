## 气泡菜单禁用效果 @en{Popover Menu Disabled Effect}
#### 6

```js
import { Popover, Button } from '@arco-design/mobile-react';

export default function PopoverDemo() {
    const menu = [
        {
            text: 'Bubble menu text content 1'
        },
        {
            text: 'Bubble menu text content 2',
            disabled: true,
        },
        {
            text: 'Bubble menu text content 3'
        },
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

```less
.center-box(@height: 100px) {
    height: @height;
    display: flex;
    align-items: center;
    justify-content: center;
    [dir="rtl"] & {
        flex-direction: row-reverse;
    }
}
.menu-demo-wrapper {
    .center-box();
    .@{prefix}-button {
        width: 124px;
    }
}
.popover-with-margin {
    margin-right: 66px;
}
```
