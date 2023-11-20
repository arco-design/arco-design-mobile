## 自定义标题 @en{Custom Title}

#### 4

```js
import { Collapse } from '@arco-design/mobile-react';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';
import IconQuestionCircle from '@arco-design/mobile-react/esm/icon/IconQuestionCircle';
import { GlobalContext } from '@arco-design/mobile-react/esm/context-provider';
import { useContext } from 'react';
export default function CollapseItemDemo() {
    const { useRtl } = useContext(GlobalContext);
    const getIconNoticeStyle = () => {
        if(useRtl) {
            return {
                marginLeft: '8px'
            }
        }
        return {
            marginRight: '8px'
        }
    }
    const getIconQuestionCircleStyle = () => {
        if(useRtl) {
            return {
                color: '#86909C', margin: '-1px 5px 0 0'
            }
        }
        return {
            color: '#86909C', margin: '-1px 0 0 5px'
        }
    }
    const iconNoticeStyle = getIconNoticeStyle()
    const iconQuestionCircleStyle = getIconQuestionCircleStyle()
    return (
        <Collapse.Group
            items={[
                {
                    header: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconNotice style={iconNoticeStyle} />
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
                                style={iconQuestionCircleStyle}
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
