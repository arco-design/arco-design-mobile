## 基本用法 @en{Basic usage}

#### 1

```js
import { TabBar, Button } from '@arco-design/mobile-react';
import { IconUser, IconHome, IconSetting, IconNotice } from '@arco-design/mobile-react/esm/icon';
export default function TabBarDemo() {
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
        <TabBar fixed={false}>
            {tabs.map((tab, index) => (
                <TabBar.Item title={tab.title} icon={tab.icon} key={index} />
            ))}
        </TabBar>
    );
}
```
