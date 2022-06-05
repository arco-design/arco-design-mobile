## 异步更新结束时间(10s后倒计时变为06:06:06) @en{Update end time asynchronously (countdown becomes 06:06:06 after 10s)}

#### 6

```js
import { CountDown } from '@arco-design/mobile-react';

export default function CountDownDemo6() {
    const [time, setTime] = React.useState({hours: 4,minutes: 36, seconds: 9});
    const timerRef = React.useRef();

    React.useEffect(() => {
        timerRef.current = setTimeout(() => {
            setTime({hours: 6,minutes: 6, seconds: 6})
        }, 10000);
        return () => {
            timerRef.current && clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <CountDown
            format="HH:mm:ss"
            time={time}
            autoStart
        />
    );
}
```
