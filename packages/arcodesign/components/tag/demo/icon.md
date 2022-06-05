## 图标标签 @en{Icon Tag}

#### 5

```js
import { Tag } from '@arco-design/mobile-react';
import IconStar from '@arco-design/mobile-react/esm/icon/IconStar';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';

export default function TagDemo() {
    return (<>
        <Tag borderStyle="none" icon={<IconStar />}>Tag</Tag>
        <Tag borderStyle="none" color="#FF7D00" bgColor="#FFF7E8" icon={<IconNotice />}>Tag</Tag>
    </>);
}
```
