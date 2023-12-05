## 手动控制 @en{Manual Control}

#### 7

```js
import { CountDown, Button } from '@arco-design/mobile-react';
import './index.less';

export default function CountDownDemo7() {
    const ref = React.useRef(null);
    const [paused, setPaused] = React.useState(true);
    const handleStart = React.useCallback(() => {
        ref.current.start();
        setPaused(false);
    }, []);
    const handlePause = React.useCallback(() => {
        ref.current.pause();
        setPaused(true);
    }, []);
    const handleReset = React.useCallback(() => {
        ref.current.reset();
        setPaused(true);
    }, []);
    return (
        <div className="count-down-demo-control">
            <CountDown
                className="count-down"
                ref={ref}
                format="HH:mm:ss"
                autoStart={false}
                time={{hours: 4,minutes: 36, seconds: 9}}
                onFinish={() => console.log('run over')}
            />
            <div className="btn-wrap">
                <Button onClick={handleReset}>Reset</Button>
                {paused && (
                    <Button onClick={handleStart}>Start</Button>
                )}
                {!paused && (
                    <Button onClick={handlePause}>Pause</Button>
                )}
            </div>
        </div>
    );
}
```

```less
.count-down-demo-control {
    display: flex;
    justify-content: space-between;
    .count-down {
        flex-basis: 300px;
    }
    .btn-wrap {
        display: flex;
        .@{prefix}-button.type-primary {
            display: flex;
            flex-direction: row;
            align-items: center;
            .rem(padding, 4, 16);
            width: auto;
            height: auto;
            border: .5px solid;
            .use-var(border-color, primary-color);
            background-color: transparent;
            .rem(border-radius, 20);
            .btn-text {
                .rem(font-size, 14);
                .use-var(color, primary-color);
            }
            &:last-child {
                .rem(margin-left, 10);
            }
        }
    }
}
```
