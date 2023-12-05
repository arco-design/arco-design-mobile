## 控制监听时机 @en{Control the timing of listening}

#### 4

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';
import './index.less';

export default function ShowMonitorDemo() {
    const [show, setShow] = React.useState(true);
    const [disabled, setDisabled] = React.useState(true);

    function onVisibleChange(visible, node) {
        Toast.info({ content: visible ? 'Demo 4 enters the area' : 'Demo 4 leaves the area' });
    }
    React.useEffect(() => {
        setTimeout(() => {
            setDisabled(false);
        }, 3000);
    }, []);

    return (
        <ShowMonitor onVisibleChange={onVisibleChange} disabled={disabled}>
            <div className="show-monitor-content">Arco</div>
        </ShowMonitor>
    );
}
```

```less-global
#demo-show-monitor {
    #demo-order-4 {
        padding: 500px 16px 40px;
    }
}
```
