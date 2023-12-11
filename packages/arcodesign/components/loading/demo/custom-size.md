## 自定义加载大小/粗细 @en{Custom loading size/thickness}

#### 2

环形和弧线类型可定制线圈半径及粗细。 @en{ The coil radius and thickness of circle and arc types can be customized.}

```js
import { Loading } from '@arco-design/mobile-react';

export default function LoadingDemo() {
    return (
        <div className="loading-demo-basic">
            <Loading type="arc" radius={7} />
            <Loading type="circle" radius={15} stroke={1} />
            <Loading type="spin" stroke={1} />
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
