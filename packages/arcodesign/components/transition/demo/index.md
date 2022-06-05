## 基础用法 @en{Basic Usage}

#### 1

```js
import { Transition, Cell } from '@arco-design/mobile-react';

export default function TransitionDemo() {
    const [visible, setVisible] = React.useState(false);
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
        >
            <div
                className="demo-transition-mask"
                onClick={() => setVisible(false)}
            ></div>
        </Transition>
    </>);
}
```
