## 局部滚动 & 边界阈值 @en{Local Scroll & Boundary Threshold}

#### 1

```js
import { ShowMonitor, Toast } from '@arco-design/mobile-react';
import './index.less';

export default function ShowMonitorDemo() {
    function onVisibleChange(visible, node) {
        Toast.info({ content: visible ? 'Demo 1 enters the area' : 'Demo 1 leaves the area' });
    }
    return (
        <div className="show-monitor-demo-1-wrapper">
            <div className="show-monitor-demo-title">Please swipe within the grey area</div>
            <div className="show-monitor-demo-scroller">
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

```less
.show-monitor-demo-1-wrapper {
    position: relative;
    .use-var(background, card-background-color);
    overflow: hidden;
    height: 255px;
    .show-monitor-demo-title {
        position: relative;
        font-size: 14px;
        .use-var(color, sub-info-font-color);
        top: 16px;
        text-align: center;
    }
    .show-monitor-demo-scroller {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        .show-monitor-demo-scroller-inner {
            padding-top: 500px;
            padding-bottom: 72px;
        }
        .@{prefix}-show-monitor {
            bottom: 72px;
            width: 100%;
        }
    }
}
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
