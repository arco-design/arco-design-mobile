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
