## 吸顶+懒加载 @en{Fixed to the top + lazyload}

#### 3

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
    { title: 'Very long first Example' },
    { title: 'Very long second Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            lazyloadCount={1}
            tabBarPadding={22}
            defaultActiveTab={0}
            tabBarArrange="center"
            tabBarHasDivider={false}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
            onTabBarOverflowChange={(o) => console.log('overflow', o)}
            renderTabBar={(TabBar) => (
                <Sticky topOffset={44}>{TabBar}</Sticky>
            )}
        >
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
