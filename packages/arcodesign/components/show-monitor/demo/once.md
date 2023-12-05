## 只触发一次 @en{Trigger only once}

#### 3

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';
import './index.less';

export default function ShowMonitorDemo() {
    const [show, setShow] = React.useState(true);
    function onVisibleChange(visible, node) {
        Toast.info({ content: visible ? 'Demo 3 enters the area' : 'Demo 3 leaves the area'});
    }
    return (
        <ShowMonitor onVisibleChange={onVisibleChange} once>
            <div className="show-monitor-content">Arco</div>
        </ShowMonitor>
    );
}
```

```less-global
#demo-show-monitor {
    #demo-order-3 {
        padding: 500px 16px 40px;
    }
}
```
