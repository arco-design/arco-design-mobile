## 滚动监听模式 @en{Scroll Listening Mode}

#### 5

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
    { title: 'Example 5' },
];

export default function TabsDemo() {
    const [index, setIndex] = React.useState(0);
    return (
        <Tabs
            mode="scroll"
            tabs={tabData}
            useCaterpillar={true}
            // defaultActiveTab={1}
            tabBarPadding={22}
            activeTab={index}
            onChange={(_, index) => setIndex(index)}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
            // scrollOffset={44}
            tabPaneClass="demo-tab-pane-scroll"
            // renderTabBar={(TabBar) => <Sticky>{TabBar}</Sticky>}
            tabPaneStyle={{ height: 150, overflowY: 'auto' }}
            getScrollContainer={() => document.querySelector('.demo-tab-pane-scroll')}
        >
            <div className="demo-tab-scroll-content">
                <p onClick={() => setIndex(3)}>Example Content 1</p>
            </div>
            <div className="demo-tab-scroll-content">
                <p>Example Content 2</p>
            </div>
            <div className="demo-tab-scroll-content">
                <p>Example Content 3</p>
            </div>
            <div className="demo-tab-scroll-content">
                <p>Example Content 4</p>
            </div>
            <div className="demo-tab-scroll-content">
                <p>Example Content 5</p>
            </div>
        </Tabs>
    );
}
```
