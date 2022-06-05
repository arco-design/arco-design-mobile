## 基础用法 @en{Basic Usage}

#### 1

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    const theRef = React.useRef();
    return (
        <Tabs
            ref={theRef}
            tabs={tabData}
            type="line-divide"
            defaultActiveTab={0}
            tabBarHasDivider={false}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
            translateZ={false}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```
