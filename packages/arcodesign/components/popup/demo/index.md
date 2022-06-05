## 基础用法 @en{Basic Usage}

#### 1

可通过传属性调用，也可通过`Popup.open`方法调用。
It can be called by passing a property or by the `Popup.open` method.

```js
import { Popup, Cell } from '@arco-design/mobile-react';

export default function PopupDemo() {
    const [value, setValue] = React.useState('bottom');
    const [visible, setVisible] = React.useState(false);
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Left" showArrow onClick={() => { setVisible(true); setValue('left'); }} />
            <Cell label="Right" showArrow onClick={() => { setVisible(true); setValue('right'); }} />
            <Cell label="Top " showArrow onClick={() => { setVisible(true); setValue('top'); }} />
            <Cell label="Bottom" showArrow onClick={() => {
                window.modalInstance = Popup.open({
                    children: (
                        <div style={{ height: 330, width: 290 }}>
                            <div className="popup-demo-title">Title</div>
                            <div className="popup-demo-content">Content area</div>
                        </div>
                    ),
                });
            }} />
        </Cell.Group>
        <Popup visible={visible} close={() => setVisible(false)} direction={value}>
            <div style={{ height: 330, width: 290 }}>
                <div className="popup-demo-title">Title</div>
                <div className="popup-demo-content">Content area</div>
            </div>
        </Popup>
    </>);
}
```
