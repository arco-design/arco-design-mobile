## 吸顶效果 @en{Fixed to the top}

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
];

export default function StickyTabs() {
    return (
        <div id='sticky-tabs-wrapper'>
            <div className='placeholder'>placeholder</div>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) => (
                    <Sticky getScrollContainer={() => document.getElementById('sticky-tabs-wrapper')} topOffset={44}>{TabBar}</Sticky>
                )}
            >
                <div className="demo-tab-content">Content area</div>
                <div className="demo-tab-content">Content area</div>
                <div className="demo-tab-content">Content area</div>
                <div className="demo-tab-content">Content area</div>
                <div className="demo-tab-content">Content area</div>
                <div className="demo-tab-content">Content area</div>
            </Tabs>
        </div>
    );
}
```
