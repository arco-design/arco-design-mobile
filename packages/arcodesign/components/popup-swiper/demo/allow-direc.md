## 指定可手势滑动关闭的方向 @en{Specify the direction of the gestural swipe to close}

#### 2

支持指定多个方向，默认为滑入方向。
@en{Supports specifying multiple directions, the default is the sliding direction.}

```js
import { PopupSwiper, Cell } from '@arco-design/mobile-react';

export default function PopupSwiperDemo() {
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Rounded corners" showArrow onClick={() => {
                window.modalInstance = PopupSwiper.open({
                    contentStyle: { borderRadius: '10px 10px 0 0' },
                    allowSwipeDirections: ['right', 'bottom'],
                    exitDirection: 'bottom',
                    children: (
                        <div style={{ height: 560 }}>
                            <div className="popup-demo-title">Title</div>
                            <div className="popup-demo-content">Content area, swipe down or right to close the popup</div>
                        </div>
                    ),
                });
            }} />
        </Cell.Group>
    </>);
}
```
