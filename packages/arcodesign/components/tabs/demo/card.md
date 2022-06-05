## 分段器标签页 @en{Tab pages}

#### 11

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Tab 1' },
    { title: 'Tab 2' },
    { title: 'Tab 3' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            onChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
            className="demo-tabs-card"
            type='card'
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
