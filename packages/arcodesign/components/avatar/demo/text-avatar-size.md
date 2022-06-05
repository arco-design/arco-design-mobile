## 文字头像大小，英文字母为首字母为主，中文建议文字在3个字以下，取后两个文字 @en{The size of the text avatar, the English letter is the first letter, It is recommended that the Chinese text be less than 3 characters, and the last two words are taken}

#### 4

```js
import { Avatar } from '@arco-design/mobile-react';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';

export default function AvatarDemo() {
    return (
        <>
            <div className="avatar-demo-box">
                <Avatar size="large" textAvatar="Nietzsche" />
                <Avatar size="medium" textAvatar="Nietzsche" className="avatar-left-margin"/>
                <Avatar size="small" textAvatar="Nietzsche" className="avatar-left-margin"/>
                <Avatar size="smaller" textAvatar="Nietzsche" className="avatar-left-margin"/>
                <Avatar size="ultra-small" textAvatar="Nietzsche" className="avatar-left-margin"/>
            </div>
            <div className="avatar-group-demo">
                <div className="demo-sub-title">
                    Stacking in middle size
                </div>
                <Avatar.Group size="small">
                    <Avatar textAvatar="Nietzsche" avatarStyle={{backgroundColor: '#7BC616'}} />
                    <Avatar textAvatar="M" avatarStyle={{backgroundColor: '#14C9C9'}} />
                    <Avatar textAvatar="X" avatarStyle={{backgroundColor: '#168CFF'}} />
                    <Avatar textAvatar="Z" avatarStyle={{backgroundColor: '#FF7D00'}} />
                    <Avatar textAvatar="JD" avatarStyle={{backgroundColor: '#FFC72E'}} />
                </Avatar.Group>
            </div>
            <div className="avatar-group-demo">
                <div className="demo-sub-title">
                    Stacking in small size
                </div>
                <Avatar.Group size="ultra-small" zIndexOrder="asc">
                    <Avatar textAvatar="T" avatarStyle={{backgroundColor: '#7BC616'}} />
                    <Avatar textAvatar="M" avatarStyle={{backgroundColor: '#14C9C9'}} />
                    <Avatar  textAvatar="X" avatarStyle={{backgroundColor: '#168CFF'}} />
                    <Avatar  textAvatar="Z" avatarStyle={{backgroundColor: '#FF7D00'}} />
                    <Avatar  textAvatar="JD" avatarStyle={{backgroundColor: '#FFC72E'}} />
                </Avatar.Group>
            </div>
        </>
    );
}
```
