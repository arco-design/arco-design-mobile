## 竖排宫格 @en{Vertical grid}

#### 8

```js
import { Grid } from '@arco-design/mobile-react';

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
