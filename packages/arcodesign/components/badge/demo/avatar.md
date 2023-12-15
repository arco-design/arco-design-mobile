## 头像徽标 @en{Avatar badge}

#### 5

```js
import { Badge, Avatar } from '@arco-design/mobile-react';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';

export default function BadgeDemo5() {
    return (
        <div className="badge-demo-avatar-wrap">
            <div className="badge-demo-avatar-box">
                <Avatar size="small" src={demoAvatarSrc}/>
                <Badge
                    dot
                    absolute
                    bordered
                    style={
                        {
                            marginLeft: '-8px',
                            marginTop: '4px'
                        }
                }/>
            </div>
        </div>
    );
}
```

```less
.badge-demo-avatar-wrap {
    .rem(padding, 30);
}
.badge-demo-avatar-box {
    position: relative;
    display: inline-block;
}
```
