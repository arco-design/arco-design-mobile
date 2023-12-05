## 更多 @en{show more item}

#### 6

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

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
.grid-item-more {
    img {
        .rem(width, 24);
        .rem(height, 24);
        .rem(margin, 4);
    }
}
```
