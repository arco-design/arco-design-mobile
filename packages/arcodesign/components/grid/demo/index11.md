## 自定义 @en{Custom}

#### 11

```js
import { Grid } from '@arco-design/mobile-react';

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
