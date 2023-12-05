## 徽标文字 @en{Badge Text}

#### 10

```js
import { Grid, Badge } from '@arco-design/mobile-react';

const renderGrid0 = (item, colIndex) => {
    return (
        <div className="grid-demo-rows-item" key={colIndex}>
            <div className="grid-demo-block">
                <Badge dot absolute />
            </div>
            <div className="grid-demo-rows-item-text" >
                <span className="grid-demo-rows-item-title">{item.title}</span>
            </div>
        </div>
    )
}

const renderGrid1 = (item, colIndex) => {
    return (
        <div className="grid-demo-rows-item" key={colIndex}>
            <div className="grid-demo-block">
                <Badge absolute text="New" />
            </div>
            <div className="grid-demo-rows-item-text">
                <span className="grid-demo-rows-item-title">{item.title}</span>
            </div>
        </div>
    )
}

const renderGrid2 = (item, colIndex) => {
    return (
        <div className="grid-demo-rows-item" key={colIndex}>
            <div className="grid-demo-block">
                <Badge absolute text="100" />
            </div>
            <div className="grid-demo-rows-item-text">
                <span className="grid-demo-rows-item-title">{item.title}</span>
            </div>
        </div>
    )
}

const data = [
    {
        title: 'Title Text',
        renderGrid: renderGrid0,
    },
    {
        title: 'Title Text',
        renderGrid: renderGrid1,
    },
    {
        title: 'Title Text',
        renderGrid: renderGrid2,
    }
]

export default function GridDemo() {
    return (
        <Grid data={data} />
    );
}
```
