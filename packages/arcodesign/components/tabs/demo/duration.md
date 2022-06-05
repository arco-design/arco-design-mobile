## 切换动画 @en{Switch Animation}

#### 6

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="line-divide"
            defaultActiveTab={0}
            useCaterpillar={true}
            tabBarHasDivider={false}
            duration={400}
            transitionDuration={400}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
