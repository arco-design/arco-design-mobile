## 去除圆角 @en{No fillet}

#### 4

```js
import { Loading } from '@arco-design/mobile-react';

export default function LoadingDemo() {
    return (
        <div className="loading-demo-basic">
            <Loading type="arc" filleted={false} />
            <Loading type="circle" filleted={false} />
            <Loading type="spin" filleted={false} />
            <Loading type="dot" filleted={false} />
        </div>
    );
}
```

```less
.loading-demo-basic {
    .@{prefix}-loading {
        .rem(margin-right, 20);
        vertical-align: middle;
    }
}
```
