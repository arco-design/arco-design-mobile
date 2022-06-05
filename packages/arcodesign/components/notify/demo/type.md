## 通知类型 @en{Notification type}

#### 2

```js
import { Notify, Cell } from '@arco-design/mobile-react';
import { useRef, useEffect } from 'react';

export default function NotifyDemo() {
    const notify = (func, options) => {
        if (!!window.NotifyInstance) {
            window.NotifyInstance.close();
        }
        window.NotifyInstance = Notify[func](options);
    };
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
                label="General notification"
                showArrow
                onClick={() =>
                    notify('info', {
                        content: 'General notification',
                        getContainer: () => ref.current,
                    })
                }
            />
            <Cell
                label="Success notification"
                showArrow
                onClick={() =>
                    notify('success', {
                        content: 'Success notification',
                        getContainer: () => ref.current,
                    })
                }
            />
            <Cell
                label="Warning notification"
                showArrow
                onClick={() =>
                    notify('warn', {
                        content: 'Warning notification',
                        getContainer: () => ref.current,
                    })
                }
            />
            <Cell
                label="Error notification"
                showArrow
                onClick={() =>
                    notify('error', {
                        content: 'Error notification',
                        getContainer: () => ref.current,
                    })
                }
            />
        </Cell.Group>
    );
}
```
