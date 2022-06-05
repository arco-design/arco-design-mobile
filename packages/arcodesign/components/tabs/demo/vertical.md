## 纵向选项卡 @en{Vertical Tab}

#### 7

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: <span>Example 1</span> },
    { title: <span>Example 2</span> },
    { title: <span>Example 3</span> },
    { title: <span>Example 4</span> },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            tabBarPosition="left"
            tabBarHasDivider={false}
        >
            <div />
            <div />
            <div />
            <div />
        </Tabs>
    );
}
```
