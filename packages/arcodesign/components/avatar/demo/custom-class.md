## 自定义样式 @en{Custom Avatar}

#### 7

```js
import { Avatar } from '@arco-design/mobile-react';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box">
            <Avatar avatarClass="avatar-1" />
            <Avatar shape="square" avatarClass="avatar-2" className="avatar-left-margin" />
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
.avatar-1 {
    border-radius: 10px;
    background-color: coral;
}
.avatar-2 {
    width: 1rem;
}
```
