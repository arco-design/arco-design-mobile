## 自定义颜色 @en{Custom Color}

#### 2

```js
import { CircleProgress } from '@arco-design/mobile-react';

export default function CircleProgressDemo() {
    return (
        <>
            <CircleProgress className="circle-progress-demo-custom" progressColor="#FF5722" percentage={75} />
            <CircleProgress className="circle-progress-demo-custom" progressColorStart="#14CAFF" progressColorEnd="#4776E6" percentage={100} />
        </>
    );
}
```

```less
.circle-progress-demo-custom {
    display: inline-block;
    &:nth-child(2) {
        .rem(margin-left, 48);
    }
}
```
