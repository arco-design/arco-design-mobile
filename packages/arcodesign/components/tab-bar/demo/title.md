## 仅标题 @en{Title only}

#### 3

```js
import { TabBar } from '@arco-design/mobile-react';
import { IconUser, IconHome, IconSetting, IconNotice } from '@arco-design/mobile-react/esm/icon';
export default function TabBarDemo() {
    const tabs = [
        {
            title: 'Home',
        },
        {
            title: 'Mine',
        },
        {
            title: 'Notice',
        },
        {
            title: 'Settings',
        },
    ];
    return <TabBar dataSource={tabs} fixed={false}></TabBar>;
}
```
