## 标题列表 @en{Title List}

#### 7

```js
import { Cell, Avatar } from '@arco-design/mobile-react';

export default function CellDemo() {
    return (<>
        <Cell.Group>
            <Cell label="List Content" desc="Description" showArrow />
            <Cell label="List Content" desc="Description" />
            <Cell label="List Content" desc="Description" text="Description" />
            <Cell label="List Content" desc="Description">
                <span className="demo-cell-span">+52.8</span>
            </Cell>
            <Cell icon={
                <Avatar
                    className="demo-cell-avatar-medium"
                    src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg"
                />
            } label="List Content" desc="Description" text="Description" />
        </Cell.Group>
    </>);
}
```

```less
.demo-cell-span {
    .use-var(color, font-color);
    .rem(font-size, 16);
    .use-var(-webkit-text-stroke, font-color, 0.3px);
    .use-var(text-stroke, font-color, 0.3px);
}
.demo-cell-avatar-medium {
    .rem(width, 40);
    .rem(height, 40);
}
```
