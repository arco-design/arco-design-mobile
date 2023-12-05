## 默认 @en{Default}

#### 1

```js
import { Avatar } from '@arco-design/mobile-react';
import './index.less';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box">
            <Avatar size="small"/>
            <Avatar size="small" shape="square" className="avatar-left-margin"/>
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
