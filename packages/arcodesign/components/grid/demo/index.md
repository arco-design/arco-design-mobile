## 基础样式 @en{Basic Style}

#### 1

```js
import { Grid } from '@arco-design/mobile-react';

const getData = count => Array.from(new Array(count)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
}));

export default function GridDemo() {
    const arr = [3, 4, 5];
    return (<>
        <Grid data={getData(2)} className="demo-multi-grid col-2" direction="horizontal" columns={2} />
        {arr.map((count, index) => (
            <Grid key={index} className={`demo-multi-grid col-${count}`} data={getData(count)} columns={count} />
        ))}
    </>);
}
```
