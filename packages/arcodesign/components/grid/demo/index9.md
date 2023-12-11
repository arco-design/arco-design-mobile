## 格子间距 @en{Grid Gutter}

#### 9

```js
import { Grid } from '@arco-design/mobile-react';

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

```less
.@{prefix}-grid-rows-item {
    .rem(width, 104);
    .rem(height, 96);
    .use-var(background, background-color);
}
.grid-demo-block {
    .use-var(background, lighter-primary-color);
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
```
