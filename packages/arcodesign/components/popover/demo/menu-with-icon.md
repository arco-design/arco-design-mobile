## 气泡图标菜单 @en{Popover Menu with Icon}
#### 7

```js
import { Popover, Button } from '@arco-design/mobile-react';
import IconHome from '@arco-design/mobile-react/esm/icon/IconHome';
import IconSearch from '@arco-design/mobile-react/esm/icon/IconSearch';
import IconScan from '@arco-design/mobile-react/esm/icon/IconScan';

export default function PopoverDemo() {
    const menu = [
        {
            text: 'Bubble menu text content 1',
            icon: <IconHome />
        },
        {
            text: 'Bubble menu text content 2',
            icon: <IconSearch />
        },
        {
            text: 'Bubble menu text content 3',
            icon: <IconScan />
        },
    ];
    return (
        <div className="menu-demo-wrapper">
            <Popover.Menu
                style={{marginRight: 66}}
                direction="bottomLeft"
                onSelect={value => console.log('select', value)}
                menu={menu}
                theme="white"
                key="vertical"
            >
                <Button style={{padding: 0}}>Vertical menu</Button>
            </Popover.Menu>
            <Popover.Menu
                direction="bottomRight"
                onSelect={value => console.log('select', value)}
                menu={[
                    {
                        text: 'Title 1',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 2',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 3',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 4',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 5',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 6',
                        icon: <IconHome />
                    },
                    {
                        text: 'Title 7',
                        icon: <IconHome />
                    },
                ]}
                key="horizontal"
                menuLayout="horizontal"
            >
                <Button style={{padding: 0}}>Horizontal menu</Button>
            </Popover.Menu>
        </div>
    );
}
```
