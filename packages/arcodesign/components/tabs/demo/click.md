## 点击事件 @en{Click events}

#### 4

```js
import { Tabs, Toast } from '@arco-design/mobile-react';
import './index.less';

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
            tabBarHasDivider={false}
            onTabClick={(tab) => {
                Toast.info({
                    content: tab.title,
                    duration: 1000,
                });
            }}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```

```less
.demo-tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rem(font-size, 15);
    .rem(height, 80);
    .use-var(color, sub-info-font-color);
}
```
