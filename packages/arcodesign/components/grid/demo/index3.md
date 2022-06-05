## 分割宫格 @en{Bordered Grid}

#### 3

```js
import { Grid } from '@arco-design/mobile-react';

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
