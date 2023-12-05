## 分割宫格 @en{Bordered Grid}

#### 3

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

const data = Array.from(new Array(3)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
  itemStyle: {padding: 16}
}));

export default function GridDemo3() {
    return (
        <Grid data={data} border={true} />
    );
}
```

```less-global
#demo-grid {
    #demo-order-3 {
        padding: 0;
    }
}
```

```less
.grid-demo-block {
    .use-var(background, primary-disabled-color);
    opacity: .5;
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
```
