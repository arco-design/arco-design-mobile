## 基础用法 @en{Basic Usage}

#### 1

可通过传属性调用，也可通过`PopupSwiper.open`方法调用。
@en{It can be called by passing a property or by the `PopupSwiper.open` method.}

```js
import { PopupSwiper, Cell } from '@arco-design/mobile-react';

export default function PopupSwiperDemo() {
    const [value, setValue] = React.useState('bottom');
    const [visible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Left" showArrow onClick={() => { setVisible(true); setValue('left'); }} />
            <Cell label="Right" showArrow onClick={() => { setVisible(true); setValue('right'); }} />
            <Cell label="Top" showArrow onClick={() => { setVisible(true); setValue('top'); }} />
            <Cell label="Bottom" showArrow onClick={() => {
                window.modalInstance = PopupSwiper.open({
                    getScrollContainer: () => domRef.current,
                    children: (<>
                        <div className="popup-demo-title">Title</div>
                        <div
                            className="popup-demo-content"
                            style={{ height: 286, overflow: 'auto' }}
                            ref={domRef}
                        >
                            <div style={{ height: 1000 }}>Scrollable content area, gesture swipe to close</div>
                        </div>
                    </>),
                });
            }} />
        </Cell.Group>
        <PopupSwiper visible={visible} close={() => setVisible(false)} direction={value}>
            <div style={{ height: 330, width: 290 }}>
                <div className="popup-demo-title">Title</div>
                <div className="popup-demo-content">Content area, gesture swipe to close</div>
            </div>
        </PopupSwiper>
    </>);
}
```
