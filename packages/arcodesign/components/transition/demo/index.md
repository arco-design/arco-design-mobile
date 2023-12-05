## 基础用法 @en{Basic Usage}

#### 1

```js
import { Transition, Cell } from '@arco-design/mobile-react';
import './index.less';

export default function TransitionDemo() {
    const [visible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    return (<>
        <Cell.Group bordered={false}>
            <Cell label="Open custom mask" showArrow onClick={() => setVisible(true)} />
        </Cell.Group>
        <Transition
            in={visible}
            timeout={300}
            type="fade"
            mountOnEnter={true}
            unmountOnExit={true}
            nodeRef={domRef}
        >
            <div
                className="demo-transition-mask"
                onClick={() => setVisible(false)}
                ref={domRef}
            ></div>
        </Transition>
    </>);
}
```

```less
.demo-transition-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
```
