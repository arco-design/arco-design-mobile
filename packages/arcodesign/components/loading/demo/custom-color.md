## 自定义加载颜色/透明度 @en{Custom loading color/transparent}

#### 3

旋转和圆点类型可定制内部元素透明度。@en{Inner element transparency of spin and dot types can be customized.}

```js
import { Loading } from '@arco-design/mobile-react';
import './index.less';

export default function LoadingDemo() {
    return (
        <div className="loading-demo-basic">
            <Loading type="arc" color="#ff5722" />
            <Loading type="circle" color="#ff5722" />
            <Loading type="spin" color="#ff5722" list={[1, 0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85]} />
            <Loading type="dot" color="#606a78" list={[0.1, 0.3, 0.5]} />
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
