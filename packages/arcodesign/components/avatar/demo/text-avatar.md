## 字体头像  @en{Text avatar}

#### 3

```js
import { Avatar } from '@arco-design/mobile-react';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box">
            <Avatar size="small" textAvatar="Nietzsche"/>
            <Avatar size="small" textAvatar="Z" className="avatar-left-margin" avatarStyle={{backgroundColor: '#FF7D00'}} />
            <Avatar size="small" shape="square" textAvatar="T" className="avatar-left-margin" avatarStyle={{backgroundColor: '#C9CDD4'}} />
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
```
