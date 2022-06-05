## 大小 @en{Size}

#### 2

```js
import { Avatar } from '@arco-design/mobile-react';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';

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
