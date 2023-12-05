## 描述 @en{Description Text}

#### 4

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

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

```less-global
#demo-grid {
    #demo-order-4 {
        background: transparent;
        padding: 0;
    }
}
```

```less
.grid-demo-block {
    .use-var(background, primary-disabled-color);
    opacity: .5;
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
