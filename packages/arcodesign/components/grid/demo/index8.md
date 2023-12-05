## 竖排宫格 @en{Vertical grid}

#### 8

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

const data = Array.from(new Array(9)).map(() => ({
    img: <div className="grid-demo-block"></div>,
    title: 'Title Text',
    itemStyle: {padding: 10}
}));

export default function GridDemo() {
    return (
        <Grid data={data} />
    );
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
