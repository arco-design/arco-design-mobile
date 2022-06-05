## 标签选项卡（可滚动） @en{Tag Tab (scrollable)}

#### 9

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="tag"
            tabBarPadding={16}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
