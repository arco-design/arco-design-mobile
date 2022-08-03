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
