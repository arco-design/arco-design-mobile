## 不同类型 @en{Different types}

#### 1

```js
import { Badge } from '@arco-design/mobile-react';
import IconStarFill from '@arco-design/mobile-react/esm/icon/IconStarFill';

export default function BadgeDemo() {
    return (
        <div>
            <div className="badge-demo-item-wrap">
                <div style={{display: 'flex',justifyContent: 'space-around',position: 'relative'}}>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute dot/>
                        </div>
                        <div className="badge-demo-item-text">Dot badge</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="12"/>
                        </div>
                        <div className="badge-demo-item-text">Number badge</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="2"/>
                        </div>
                        <div className="badge-demo-item-text">Odd badge</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="100"/>
                        </div>
                        <div className="badge-demo-item-text">Maximum display</div>
                    </div>
                </div>
            </div>
            <div className="badge-demo-item-wrap">
                <div style={{display: 'flex',justifyContent: 'space-around',position: 'relative'}}>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="New"/>
                        </div>
                        <div className="badge-demo-item-text">Text badge</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="On Sale"/>
                        </div>
                        <div className="badge-demo-item-text">Multiple text</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute style={{ padding: 0, width: 16, height: 16 }}>
                                <IconStarFill className="demo-icon" />
                            </Badge>
                        </div>
                        <div className="badge-demo-item-text">Icon badge</div>
                    </div>
                    <div className="badge-demo-item">
                        <div className="badge-demo-rectangle">
                            <Badge absolute text="New"/>
                        </div>
                        <div className="badge-demo-item-text">Title text</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
