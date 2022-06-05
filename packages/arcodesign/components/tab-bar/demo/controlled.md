## 受控组件 @en{Controlled Component}

#### 6

```js
import { TabBar, Button } from '@arco-design/mobile-react';
import { IconUser, IconHome, IconSetting, IconNotice } from '@arco-design/mobile-react/esm/icon';
import { useState } from 'react';
export default function TabBarDemo() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = [
        {
            title: 'Home',
           icon: <IconHome />,
        },
        {
            title: 'Mine',
             icon: <IconUser />,
        },
        {
            title: 'Notice',
            icon: <IconNotice />,
        },
        {
            title: 'Settings',
            icon: <IconSetting />,
        },
    ];

    return (
        <TabBar
            activeIndex={activeIndex}
            onChange={index => {
                setActiveIndex(index);
            }}
            fixed={false}
        >
            {tabs.map((tab, index) => (
                <TabBar.Item title={tab.title} icon={tab.icon} key={index}></TabBar.Item>
            ))}
        </TabBar>
    );
}
```
