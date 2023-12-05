## 标签选项卡 @en{Tag Tab}

#### 8

```js
import { Tabs } from '@arco-design/mobile-react';
import './index.less';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="tag-divide"
            tabBarPadding={16}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <div className="demo-tab-content">
                Content area
            </div>
            <div className="demo-tab-content">
                Content area
            </div>
            <div className="demo-tab-content">
                Content area
            </div>
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
