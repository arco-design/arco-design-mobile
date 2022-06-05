## 切换监听 @en{Switch event listener}

#### 7

```js
import { TabBar, Button, NavBar, Toast } from '@arco-design/mobile-react';
import { IconUser, IconHome, IconSetting, IconNotice } from '@arco-design/mobile-react/esm/icon';
import { useRef, useState } from 'react';
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
    const ref = useRef();
    const [showToast, setShowToast] = useState(false);
    return (
        <div className="tab-bar-toast-content">
            <TabBar
                onChange={() => {
                    setShowToast(true);
                }}
                fixed={false}
            >
                {tabs.map((tab, index) => (
                    <TabBar.Item title={tab.title} icon={tab.icon} key={index}></TabBar.Item>
                ))}
            </TabBar>
            <div className="tab-bar-notify-content" ref={ref}>
                <Toast
                    visible={showToast}
                    content="Notice"
                    getContainer={() => ref.current}
                    close={() => setShowToast(false)}
                />
            </div>
        </div>
    );
}
```
