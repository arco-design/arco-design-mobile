## 局部滚动 & 边界阈值 @en{Local Scroll & Boundary Threshold}

#### 1

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';

export default function ShowMonitorDemo() {
    function onVisibleChange(visible, node) {
        Toast.info({ content: visible ? 'Demo 1 enters the area' : 'Demo 1 leaves the area' });
    }
    return (
        <div className="show-monitor-demo-1-wrapper">
            <div className="show-monitor-demo-title">Please swipe within the grey area</div>
            <div className="show-monitor-demo-scroller" style={{ overflowY: 'auto' }}>
                <div className="show-monitor-demo-scroller-inner">
                    <ShowMonitor overflow={true} onVisibleChange={onVisibleChange} threshold={0.7}>
                        <div className="show-monitor-content">Arco</div>
                    </ShowMonitor>
                </div>
            </div>
        </div>
    );
}
```
