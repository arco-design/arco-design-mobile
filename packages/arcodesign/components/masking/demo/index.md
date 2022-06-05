## 基础用法 @en{Basic Usage}

#### 1

```js
import { Masking, Cell } from '@arco-design/mobile-react';

export default function MaskingDemo() {
    const [visible, setVisible] = React.useState(false);
    const ref = React.useRef();
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Open popup" showArrow onClick={() => setVisible(true)} />
            <Cell label="Open the popup through the Open method" showArrow onClick={() => {
                window.modalInstance = Masking.open({
                    className: 'demo-masking-img',
                    contentAtCenter: true,
                    onOpen: () => console.log('onOpen'),
                    onClose: (scene) => console.log('onClose', scene),
                    children: (
                        <img
                            src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/miss-prize.png"
                            alt=""
                            onClick={() => window.modalInstance.close()}
                        />
                    ),
                });
            }} />
            <Cell label="Scroll in the popup" showArrow onClick={() => {
                window.modalInstance = Masking.open({
                    contentAtCenter: true,
                    onOpen: () => console.log('onOpen'),
                    onClose: (scene) => console.log('onClose', scene),
                    getScrollContainer: () => ref.current,
                    children: (
                        <div className="demo-masking-scroll" ref={ref}>
                            <div style={{ height: 1000 }}>This is a scrollable container, try swiping up</div>
                        </div>
                    ),
                });
            }} />
        </Cell.Group>
        <Masking
            className="demo-masking-img"
            visible={visible}
            close={() => setVisible(false)}
            mountOnEnter={false}
            unmountOnExit={false}
            onOpen={() => console.log('onOpen')}
            onClose={(scene) => console.log('onClose', scene)}
            contentAtCenter={true}
        >
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/get-prize.png" alt="" />
        </Masking>
    </>);
}
```
