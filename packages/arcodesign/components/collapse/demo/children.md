## 组合折叠面板 @en{Collapse Group}

#### 2

```js
import { Collapse } from '@arco-design/mobile-react';

export default function CollapseItemDemo() {
    return (
        <Collapse.Group defaultActiveItems={['1']} useAccordion>
            <Collapse
                header="Title 1"
                value="1"
                content={
                    <Collapse.Group defaultActiveItems={['1']} useAccordion groupKey="sub-group">
                        <Collapse
                            header="Subtitle"
                            value="1"
                            content="here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area"
                        />
                    </Collapse.Group>
                }
            />
            <Collapse
                header="Title 2"
                active
                value="2"
                content="here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area"
            />
        </Collapse.Group>
    );
}
```
