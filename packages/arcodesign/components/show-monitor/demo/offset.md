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

```less
.show-monitor-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    color: #FFF;
    font-size: 14px;
    .use-var(background, primary-color);
}
```
