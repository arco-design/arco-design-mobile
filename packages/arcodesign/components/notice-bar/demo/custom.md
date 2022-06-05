## 自定义颜色/类型 @en{Custom Color/Type}

#### 10

```js
import { NoticeBar } from '@arco-design/mobile-react';
import IconSuccessCircle from '@arco-design/mobile-react/esm/icon/IconSuccessCircle';
import IconWarnCircle from '@arco-design/mobile-react/esm/icon/IconWarnCircle';

export default function NoticeBarDemo() {
    return (<>
        <NoticeBar
            style={{ color: '#FF5722', backgroundColor: '#FFF1E8' }}
            closeable={false}
            rightContent={<div style={{
                background: '#FF5722',
                lineHeight: '24px',
                color: 'white',
                fontSize: 13,
                borderRadius: 24,
                padding: '0 8px',
                marginTop: -2,
            }}>Turn on</div>}
        >
            Note that this is a notification message. The background color is customized here, and the gradient theme color will also be automatically set as the background color changes.
        </NoticeBar>
        <NoticeBar
            style={{ color: '#00B42A', backgroundColor: '#E8FFEA', marginTop: 12 }}
            closeable={false}
            leftContent={<IconSuccessCircle />}
        >
            File is uploaded successfully!
        </NoticeBar>
        <NoticeBar
            style={{ color: '#F53F3F', background: '#FFECE8', marginTop: 12 }}
            leftContent={<IconWarnCircle />}
        >
            The network connection is not available, please check the network settings.
        </NoticeBar>
    </>);
}
```
