## 更多 @en{show more item}

#### 6

```js
import { Grid } from '@arco-design/mobile-react';

const data = Array.from(new Array(4)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
}));

data.push({
    img: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/grid-demo-more.png',
    title: 'More',
    className: 'grid-item-more',
})

export default function GridDemo() {
    return (
        <Grid data={data} columns={5} />
    );
}
```
