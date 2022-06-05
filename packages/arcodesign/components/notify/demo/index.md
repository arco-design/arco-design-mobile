## 基础用法 @en{Basic usage}

#### 1

```js
import { Notify, Cell } from '@arco-design/mobile-react';
import { useRef, useEffect } from 'react';
export default function NotifyDemo() {
    const ref = useRef();

    useEffect(() => {
        const div = document.createElement('div');
        ref.current = div;
        const demo = document.querySelector('.arcodesign-mobile-demo');
        const title = document.querySelector('.arcodesign-mobile-title');
        demo.insertBefore(ref.current, title);
    }, []);
    return (
        <Cell.Group bordered={false}>
            <Cell
                label="Basic usage"
                showArrow
                onClick={() => {
                    if (!!window.NotifyInstance) {
                        window.NotifyInstance.close();
                    }
                    window.NotifyInstance = Notify.success({
                        content: 'Basic usage',
                        getContainer: () => ref.current,
                    });
                }}
            />
        </Cell.Group>
    );
}
```
