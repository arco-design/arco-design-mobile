## 格子间距 @en{Grid Gutter}

#### 9

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

const data = Array.from(new Array(8)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
}));

export default function GridDemo() {
    return (
        <Grid data={data} gutter={16} border={true} />
    );
}
```

```less-global
#demo-grid {
    #demo-order-9 {
        background: transparent;
    }
}
```

```less
.@{prefix}-grid-rows-item {
    .rem(width, 104);
    .rem(height, 96);
    .use-var(background, background-color);
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
