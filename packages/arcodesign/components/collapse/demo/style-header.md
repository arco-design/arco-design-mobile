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
                            <IconNotice className='header-icon-notice'/>
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
                                className='header-icon-question-circle'
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
