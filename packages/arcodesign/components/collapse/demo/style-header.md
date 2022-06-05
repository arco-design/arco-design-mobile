## 自定义标题 @en{Custom Title}

#### 4

```js
import { Collapse } from '@arco-design/mobile-react';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';
import IconQuestionCircle from '@arco-design/mobile-react/esm/icon/IconQuestionCircle';

export default function CollapseItemDemo() {
    return (
        <Collapse.Group
            items={[
                {
                    header: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconNotice style={{ marginRight: '8px' }} />
                            Title 1
                        </div>
                    ),
                    value: '1',
                    content:
                        'here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area',
                },
                {
                    header: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            Title 2
                            <IconQuestionCircle
                                style={{ color: '#86909C', margin: '-1px 0 0 5px' }}
                            />
                        </div>
                    ),
                    value: '2',
                    content:
                        'here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area',
                },
            ]}
        />
    );
}
```
