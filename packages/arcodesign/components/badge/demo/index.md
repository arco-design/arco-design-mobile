## 不同类型 @en{Different types}

#### 1

```js
import { Badge } from '@arco-design/mobile-react';
import IconStarFill from '@arco-design/mobile-react/esm/icon/IconStarFill';
import './index.less';

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

```less
.badge-demo-item-wrap {
    .rem(padding, 16, 0);
    .rem(margin-top, 22);
    &:nth-child(1) {
        margin-top: 0;
    }
    .use-var(background, background-color);
}
.badge-demo-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.badge-demo-rectangle {
    .rem(width, 32);
    .rem(height, 32);
    background: #bedaff;
    border-radius: 2PX;
    position: relative;
}
.badge-demo-item-text {
    .rem(font-size, 14);
    .rem(line-height, 20);
    .rem(margin-top, 8);
    text-align: center;
}
.demo-icon {
    font-size: 16PX;
    padding: 2PX 1.5PX 3PX 2PX;
}
```
