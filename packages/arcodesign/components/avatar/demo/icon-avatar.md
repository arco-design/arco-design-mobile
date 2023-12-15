## icon头像 @en{Icon avatar}

#### 6

```js
import { Avatar } from '@arco-design/mobile-react';
import IconUserFill from '@arco-design/mobile-react/esm/icon/IconUserFill';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box custom-icon">
            <Avatar size="small" decoration={(
                <img className="bottom-edit-icon" src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/avatar-edit.png" />
            )}>
                <IconUserFill className="custom-avatar-icon" />
            </Avatar>
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
.custom-avatar-icon {
    font-size: 15px;
}
```
