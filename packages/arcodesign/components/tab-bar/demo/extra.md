## 徽标 @en{TabBar with badge}

#### 4

```js
import { TabBar, Badge } from '@arco-design/mobile-react';
import {
    IconUser,
    IconHome,
    IconSetting,
    IconNotice,
    IconStarFill,
} from '@arco-design/mobile-react/esm/icon';

export default function TabBarDemo() {
    const tabs = [
        {
            title: 'Home',
            icon: <IconHome />,
        },
        {
            title: 'Mine',
            icon: <IconUser />,
            extra: <Badge absolute text="100" className="tab-bar-badge" />,
        },
        {
            title: 'Notice',
            icon: <IconNotice />,
            extra: <Badge absolute text="2" className="tab-bar-badge" />,
        },
        {
            title: 'Settings',
            icon: <IconSetting />,
            extra: <Badge absolute dot className="tab-bar-badge" />,
        },
    ];
    return <TabBar dataSource={tabs} fixed={false} />;
}
```

```less
.tab-bar-badge {
    margin-left: 0;
    .rem(margin-top, 2);
}
```
