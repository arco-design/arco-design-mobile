## 列表头像 @en{Avatar List}

#### 4

```js
import { Cell, Avatar } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell label={<div className="demo-cell-avatar-label">
                <Avatar src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg" />
                <span>List Content</span>
            </div>} />
            <Cell label="List Content" showArrow className="demo-cell-avatar" text={
                <Avatar
                    src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg"
                />
            } />
        </Cell.Group>
    </>);
}
```

```less
.demo-cell-avatar-label {
    display: flex;
    align-items: center;
    .@{prefix}-avatar {
        .rem(width, 32);
        .rem(height, 32);
        .rem-with-rtl(margin-right, 12);
    }
}
.demo-cell-avatar {
    .cell-text {
        font-size: 0;
    }
    .@{prefix}-avatar {
        .rem(width, 24);
        .rem(height, 24);
        display: inline-block;
    }
}
```
