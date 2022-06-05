## 描述 @en{Description Text}

#### 4

```js
import { Grid } from '@arco-design/mobile-react';

const data = Array.from(new Array(2)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
  content: 'Description Text'
}));

const data2 = Array.from(new Array(3)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
  content: 'Description Text'
}));

export default function GridDemo() {
    return (<>
        <Grid data={data} className="demo-multi-grid" direction="horizontal" columns={2} />
        <Grid data={data2} className="demo-multi-grid" />
    </>);
}
```
