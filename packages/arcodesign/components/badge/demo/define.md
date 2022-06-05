## 自定义 @en{Custom}

#### 2

```js
import { Badge } from '@arco-design/mobile-react';

export default function BadgeDemo2() {
    return (
        <div style={{display: 'flex',justifyContent: 'space-around',position: 'relative', padding: '0.32rem 0'}}>
            <div className="badge-demo-item">
                <div className="badge-demo-rectangle">
                    <Badge absolute dot style={{ background: '#ff5722' }} />
                </div>
                <div className="badge-demo-item-text">Custom Color</div>
            </div>
            <div className="badge-demo-item">
                <div className="badge-demo-rectangle">
                    <Badge absolute text="New" style={{borderRadius: "8px 8px 8px 0"}}/>
                </div>
                <div className="badge-demo-item-text">Custom style</div>
            </div>
            <div className="badge-demo-item">
                <div className="badge-demo-rectangle">
                    <Badge absolute text="Gradient" style={{background:"linear-gradient(277.15deg, #0678FF -0.2%, #14CDFF 97.54%)"}}/>
                </div>
                <div className="badge-demo-item-text">Custom color</div>
            </div>
            <div className="badge-demo-item">
                <div className="badge-demo-rectangle">
                    <Badge absolute text="2" style={{ background: '#ff5722' }} />
                </div>
                <div className="badge-demo-item-text">Custom color</div>
            </div>
        </div>
    );
}
```
