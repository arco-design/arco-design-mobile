## 仅图标 @en{Icons only}

#### 2

```js
import { TabBar } from '@arco-design/mobile-react';
import { IconUser, IconHome, IconSetting, IconNotice } from '@arco-design/mobile-react/esm/icon';
export default function TabBarDemo() {
    const tabs = [
        {
            icon: <IconHome />,
        },
        {
            icon: <IconUser />,
        },
        {
            icon: <IconNotice />,
        },
        {
            icon: <IconSetting />,
        },
    ];
    return <TabBar dataSource={tabs} fixed={false} />;
}
```
