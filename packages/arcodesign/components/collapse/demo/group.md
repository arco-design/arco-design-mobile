## 组合折叠面板--手风琴样式 @en{Collapse Group--Accordion Style}

#### 3

```js
import { Collapse, Tabs } from '@arco-design/mobile-react';

export default function CollapseItemDemo() {
    return (
        <Collapse.Group
            useAccordion
            items={[
                {
                    header: 'Title 1',
                    value: '1',
                    content:
                        'here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area',
                },
                {
                    header: 'Title 2',
                    value: '2',
                    content:
                        'here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area',
                },
                {
                    header: 'Title 3',
                    value: '3',
                    content:
                        'here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area',
                },
            ]}
        />
    );
}
```
