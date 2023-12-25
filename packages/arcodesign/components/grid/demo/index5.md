## 滑动宫格 @en{Slide Grid}

#### 5

```js
import { Grid } from '@arco-design/mobile-react';

const data = Array.from(new Array(20)).map(() => ({
    img: <div className="grid-demo-block"></div>,
    title: 'Title',
    itemStyle: {minWidth: 63}
}));

export default function GridDemo() {
    return (
        <Grid data={data} isSliding={true} />
    );
}
```

```less
.@{prefix}-grid-rows-item-title {
    .rem(font-size, 13);
}
.grid-demo-block {
    .use-var(background, lighter-primary-color);
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
```
