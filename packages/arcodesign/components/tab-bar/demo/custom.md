## 自定义 @en{Custom}

#### 5

```js
import { TabBar, Badge } from '@arco-design/mobile-react';
import {
    IconUser,
    IconHome,
    IconSetting,
    IconNotice,
    IconStarFill,
    IconStar,
} from '@arco-design/mobile-react/esm/icon';
export default function TabBarDemo() {
    const tabs = [
        {
            title: 'Home',
            icon: <IconHome />,
        },
        {
            title: 'Mine',
            icon: active => (active ? <IconStarFill /> : <IconStar />),
        },
        {
            child: (
                <img
                    src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/tabbar-demo-img.png"
                    style={{ width: '48px', height: '40px' }}
                />
            ),
        },
        {
            title: active => (active ? 'Your Notice' : 'My Notice'),
            icon: <IconNotice />,
        },
        {
            title: 'Settings',
            icon: <IconSetting />,
        },
    ];
    return (
        <TabBar activeCustomStyle={{ color: '#FF5722' }} dataSource={tabs} fixed={false} />
    );
}
```
