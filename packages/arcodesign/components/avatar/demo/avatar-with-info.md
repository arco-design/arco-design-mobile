## 加文字(单行文字时，文字与头像水平居中) @en{Add text (for single-line text, the text and the avatar are centered horizontally)}

#### 8

```js
import { Avatar } from '@arco-design/mobile-react';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';

export default function AvatarDemo() {
    return (
        <div style={{margin: '-16px 0'}}>
            <Avatar size="large" src={demoAvatarSrc} avatarName="Username" avatarDesc="Auxiliary information" />
            <div className="avatar-divider"/>
            <Avatar size="medium" src={demoAvatarSrc} avatarName="Username" avatarDesc="Auxiliary information" />
            <div className="avatar-divider"/>
            <Avatar size="small" src={demoAvatarSrc} avatarName="Username" avatarDesc="Auxiliary information" />
            <div className="avatar-divider"/>
            <Avatar size="smaller" src={demoAvatarSrc} avatarName="Username" avatarDesc="Auxiliary information" />
            <div className="avatar-divider"/>
            <Avatar size="ultra-small" src={demoAvatarSrc} avatarName="Username" avatarDesc="Auxiliary information" />
        </div>
    );
}
```

```less
.avatar-divider {
    height: 8px;
    .use-var(background-color, card-background-color);
    margin: 0 -16px;
}
```
