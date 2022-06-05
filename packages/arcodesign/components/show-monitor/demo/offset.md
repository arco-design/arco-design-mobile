## 偏移量 @en{Offset}

#### 2

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';

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
