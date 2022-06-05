## 徽标动画 @en{Badge animation}

#### 4

```js
import { Badge, Button, Cell } from '@arco-design/mobile-react';

export default function BadgeDemo5() {
    const [visible, setVisible] = React.useState(true);
    return (
        <div>
            <Cell.Group>
                <Cell
                    label={
                        <div style={{position:'relative'}}>
                            <span className="badge-demo-cell-label">
                                List content
                                <Badge visible={visible} style={{marginLeft: 0}} dot absolute/>
                            </span>
                        </div>}
                    showArrow
                />
                <Cell
                    label={
                        <div style={{position:'relative'}}>
                            <span className="badge-demo-cell-label">
                                List content
                                <Badge visible={visible} style={{marginLeft: '2px'}} text="2" absolute/>
                            </span>
                        </div>}
                    showArrow
                />
                <Cell
                    label={
                        <div style={{position:'relative'}}>
                            <span className="badge-demo-cell-label">
                                List content
                                <Badge visible={visible} style={{marginLeft: '2px'}} text="100" absolute/>
                            </span>
                        </div>}
                    showArrow
                />
            </Cell.Group>
            <Button onClick={() => setVisible(pre => !pre)}>{visible?'Close Badge':'Open Badge'}</Button>
        </div>
    );
}
```
