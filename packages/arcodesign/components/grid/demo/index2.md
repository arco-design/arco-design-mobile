## 圆形宫格 @en{Circle Grid}

#### 2

```js
import { Grid } from '@arco-design/mobile-react';

const data = Array.from(new Array(3)).map(() => ({
  img: <div className="grid-demo-block" style={{ borderRadius: '20px', width: 40, height: 40 }}></div>,
  title: 'Title Text',
}));

export default function GridDemo2() {
    return (
        <Grid data={data} shape='circle' />
    );
}
```
