## 自定义配置 @en{Customize configuration}

#### 3

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
        div.classList.add('notify-last-div');
        ref.current = div;
        const demo = document.querySelector('.arcodesign-mobile-demo');
        const title = document.querySelector('.arcodesign-mobile-title');
        demo.insertBefore(ref.current, title);
    }, []);
    return (
        <Cell.Group bordered={false}>
            <Cell
                label="Custom color"
                showArrow
                onClick={() =>
                    notify('info', {
                        content: 'Custom color',
                        style: {
                            background: '#E8F3FF',
                            color: '#165DFF',
                        },
                        getContainer: () => ref.current,
                    })
                }
            />
            <Cell
                label="Custom disappearing time"
                showArrow
                onClick={() =>
                    notify('success', {
                        duration: 5000,
                        content: 'I disappeared after 5 seconds',
                        getContainer: () => ref.current,
                    })
                }
            />
            <Cell
                label="Custom content"
                showArrow
                onClick={() =>
                    notify('info', {
                        content: <div className={'notify-custom-content'}>1 information recommendation</div>,
                        getContainer: () => ref.current,
                        style:{
                            color:'#165DFF',
                        },
                    })
                }
            />
            <Cell
                label="Fixed top display"
                showArrow
                onClick={() =>
                    notify('success', {
                        content: 'Fixed top display',
                        getContainer: () => ref.current,
                        style:{
                            position: 'fixed',
                            top: 44,
                        },
                    })
                }
            />
        </Cell.Group>
    );
}
```

```less-global
.notify-last-div + .arcodesign-mobile-title {
    .rem(padding-top, 8);
}
.notify-custom-content {
    .rem(border-radius, 18);
    .rem(padding, 0, 16);
    .rem(height, 36);
    color: inherit;
    border: 0.5px solid;
    .use-var(border-color, line-color);
    display: flex;
    justify-content: center;
    align-items: center;
    .rem(font-size, 14);
    .rem(margin, 10, 0);
}
```
