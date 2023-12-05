## 自定义样式 @en{Custom Style}

#### 3

```js
import { CountDown, Button } from '@arco-design/mobile-react';
import './index.less';

const initTime = {hours: 4, minutes: 36, seconds: 9}
export default function CountDownDemo3() {
    const [timeData, setTimeData] = React.useState({hours: 4, minutes: 36, seconds: 9});

    function padZero(time) {
        return time >= 10 ? time : `0${time}`;
    }

    return (
        <div className="count-down-demo-define-style">
            <CountDown
                time={initTime}
                renderChild={(timeData) => (
                    <>
                        <span className="block">{padZero(timeData.hours)}</span>
                        <span className="colon">:</span>
                        <span className="block">{padZero(timeData.minutes)}</span>
                        <span className="colon">:</span>
                        <span className="block">{padZero(timeData.seconds)}</span>
                    </>
                )}
            />
        </div>
    );
}
```

```less
.count-down-demo-define-style {
    .colon {
        display: inline-block;
        .rem(margin, 0, 6);
        color: #165dff;
    }
    .block {
        .rem(width, 25);
        .rem(font-size, 14);
        .rem(line-height, 24);
        font-weight: 500;
        color: #165dff;
        background: #e8f3ff;
        border-radius: 2PX;
        display: inline-block;
        text-align: center;
    }
}
```
