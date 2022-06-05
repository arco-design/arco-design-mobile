## 自定义内容选项卡 @en{Custom Content}

#### 10

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="tag-divide"
            className="demo-tab-custom-bar"
            tabBarPadding={22}
            tabBarGutter={45}
            renderTabBarItem={(tab, _, { active }) => (
                <div className={`custom-bar-item ${active ? 'active' : ''}`}>
                    <div className="title">{tab.title}</div>
                    <div className="desc">description</div>
                </div>
            )}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
