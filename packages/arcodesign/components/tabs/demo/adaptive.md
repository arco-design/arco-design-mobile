## 下划线自适应 @en{Adaptive Underline}

#### 5.5

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Exam' },
    { title: 'Example' },
    { title: 'Ex' },
    { title: 'Exaaample' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            defaultActiveTab={0}
            underlineAdaptive={true}
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
