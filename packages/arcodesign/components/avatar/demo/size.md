## 大小 @en{Size}

#### 2

```js
import { Avatar } from '@arco-design/mobile-react';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';
import './index.less';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box">
            <div className="avatar-size-demo-box">
                <Avatar size="large" src={demoAvatarSrc} />
                <span className="size-text" style={{marginTop: 4}}>large</span>
            </div>
            <div className="avatar-size-demo-box avatar-left-margin">
                <Avatar size="medium" src={demoAvatarSrc} />
                <span className="size-text" style={{marginTop: 8}}>medium</span>
            </div>
            <div className="avatar-size-demo-box avatar-left-margin">
                <Avatar size="small" src={demoAvatarSrc} />
                <span className="size-text" style={{marginTop: 12}}>small</span>
            </div>
            <div className="avatar-size-demo-box avatar-left-margin">
                <Avatar size="smaller" src={demoAvatarSrc} />
                <span className="size-text" style={{marginTop: 16}}>smaller</span>
            </div>
            <div className="avatar-size-demo-box avatar-left-margin">
                <Avatar size="ultra-small" src={demoAvatarSrc} />
                <span className="size-text" style={{marginTop: 20}}>ultra-small</span>
            </div>
        </div>
    );
}
```

```less
.avatar-demo-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.avatar-left-margin {
    .set-prop-with-rtl(margin-left, 24px);
}
.avatar-size-demo-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 77px;
    .size-text {
        font-size: 12px;
        line-height: 17px;
        color: #939AA3;
    }
}
```
