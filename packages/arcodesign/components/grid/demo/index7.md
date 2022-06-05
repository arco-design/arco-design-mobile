## 横排宫格 @en{Horizontal Grid}

#### 7

```js
import { Grid } from '@arco-design/mobile-react';

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
