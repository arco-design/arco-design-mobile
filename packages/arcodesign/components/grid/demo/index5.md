## 滑动宫格 @en{Slide Grid}

#### 5

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

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
    .use-var(background, primary-disabled-color);
    opacity: .5;
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
```
