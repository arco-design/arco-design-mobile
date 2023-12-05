## 横排宫格 @en{Horizontal Grid}

#### 7

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

const data = Array.from(new Array(5)).map(() => ({
    img: <div className="grid-demo-block"></div>,
    title: 'Title Text',
    itemStyle: {padding: 16}
}));

export default function GridDemo() {
    return (
        <Grid data={data} columns={2} direction="horizontal" />
    );
}
```

```less-global
#demo-grid {
    #demo-order-7 {
        padding: 0;
    }
}
```

```less
.@{prefix}-grid-rows-item {
    justify-content: flex-start;
}
.grid-demo-block {
    .use-var(background, primary-disabled-color);
    opacity: .5;
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
```
