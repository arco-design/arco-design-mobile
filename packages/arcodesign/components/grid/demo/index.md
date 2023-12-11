## 基础样式 @en{Basic Style}

#### 1

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

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

```
#demo-grid {
    #demo-order-1 {
        background: transparent;
        padding: 0;
    }
}
```

```less
.grid-demo-block {
    .use-var(background, lighter-primary-color);
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
.demo-multi-grid {
    .use-var(background, background-color);
    .rem(padding, 16);
    &:not(:first-child) {
        .rem(margin-top, 16);
    }
    &.col-2 {
        .@{prefix}-grid-rows-item-title {
            .rem(font-size, 16);
        }
    }
    &.col-4 {
        .@{prefix}-grid-rows-item-title {
            .rem(font-size, 14);
        }
    }
    &.col-5 {
        .@{prefix}-grid-rows-item-title {
            .rem(font-size, 13);
        }
    }
}
```
