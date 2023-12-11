## 自定义 @en{Custom}

#### 2

可通过传属性调用，也可通过`Popup.open`方法调用。
@en{It can be called by passing the property or by the `Popup.open` method.}

```js
import { Popup, Cell } from '@arco-design/mobile-react';

export default function PopupDemo() {
    const ref = React.useRef();
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Rounded corners" showArrow onClick={() => {
                window.modalInstance = Popup.open({
                    contentStyle: { borderRadius: '10px 10px 0 0' },
                    children: (
                        <div style={{ height: 330, width: 290 }}>
                            <div className="popup-demo-title">Title</div>
                            <div className="popup-demo-content">Content area</div>
                        </div>
                    ),
                });
            }} />
            <Cell label="Scroll in the popup" showArrow onClick={() => {
                window.modalInstance = Popup.open({
                    direction: 'right',
                    getScrollContainer: () => ref.current,
                    children: (
                        <div style={{ height: '100%', width: 290, overflow: 'auto' }} ref={ref}>
                            <div className="popup-demo-title">Title</div>
                            <div className="popup-demo-content" style={{ height: 2000 }}>Scrollable content</div>
                        </div>
                    ),
                });
            }} />
        </Cell.Group>
    </>);
}
```

```less-global
.popup-demo {
    &-title {
        .rem(line-height, 44);
        .rem(font-size, 18);
        .use-var(color, font-color);
        font-weight: bold;
        .rem(padding, 0, 16);
    }
    &-content {
        .use-var(color, font-color);
        .rem(font-size, 16);
        .use-var(color, sub-info-font-color);
        .rem(padding, 20, 16);
    }
}
```
