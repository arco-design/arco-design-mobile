## 多行内容 @en{Multiline Content}

#### 8

```js
import { Cell, Avatar } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell
                label="List Content"
                prepend={<div style={{ fontSize: 12, lineHeight: '18px', marginBottom: -17, paddingTop: 16 }}>Description</div>}
                append={<div style={{ fontSize: 12, lineHeight: '18px', marginTop: -15, paddingBottom: 16 }}>Description</div>}
                showArrow
            >
                <div className="demo-cell-info">
                    <div className="info">Secondary information</div>
                    <div className="sub-info">Auxiliary information</div>
                </div>
            </Cell>
        </Cell.Group>
    </>);
}
```

```less
.demo-cell-info {
    text-align: right;
    .info {
        .use-var(color, font-color);
        .rem(font-size, 16);
    }
    .sub-info {
        .use-var(color, cell-desc-color);
        .rem(font-size, 14);
    }
}
```
