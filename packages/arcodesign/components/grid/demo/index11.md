## 自定义 @en{Custom}

#### 11

```js
import { Grid } from '@arco-design/mobile-react';
import './index.less';

const renderGrid = (item) => {
    return (
        <div className="grid-demo-rows-item">
            <img src={item.img} className="grid-demo-rows-item-icon"/>
            <div className="grid-demo-rows-item-text">
                <span className="grid-demo-rows-item-title">{item.title}</span>
            </div>
        </div>
    )
}

const data = Array.from(new Array(3)).map(() => ({
  img: <div className="grid-demo-block"></div>,
  title: 'Title Text',
  renderGrid: renderGrid,
}));

export default function GridDemo() {
    return (
        <Grid data={data} />
    );
}
```

```less
.grid-demo-rows-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .rem(font-size, 15);
    &-text {
        .rem(margin-top, 8);
    }
}
.grid-demo-block {
    .use-var(background, lighter-primary-color);
    border-radius: 2px;
    .rem(width, 32);
    .rem(height, 32);
    position: relative;
}
.@{prefix}-grid-rows-item-title {
    .rem(font-size, 15);
}
```
