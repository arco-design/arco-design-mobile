## 滑动节能模式 @en{Swipe Energy-saving mode}

#### 6.5

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="line-divide"
            defaultActiveTab={0}
            useCaterpillar={true}
            tabBarHasDivider={false}
            swipeEnergySaving={true}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
