## 偏移量 @en{Offset}

#### 2

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';
import './index.less';

export default function ShowMonitorDemo() {
    function onVisibleChange(visible, node) {
        Toast.info({ content: visible ? 'Demo 2 enters the area' : 'Demo 2 leaves the area' });
    }
    return (
        <ShowMonitor onVisibleChange={onVisibleChange} offset={[100, 30]}>
            <div className="show-monitor-content">Arco</div>
        </ShowMonitor>
    );
}
```

```less-global
#demo-show-monitor {
    #demo-order-2 {
        padding: 400px 16px 40px;
    }
}
```
