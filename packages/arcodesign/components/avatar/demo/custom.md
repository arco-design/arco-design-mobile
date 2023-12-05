## 自定义头像 @en{Custom Avatar}

#### 7

```js
import { Avatar } from '@arco-design/mobile-react';
import './index.less';

export default function AvatarDemo() {
    return (
        <div className="avatar-demo-box">
            <Avatar size="small" src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"/>
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
```
