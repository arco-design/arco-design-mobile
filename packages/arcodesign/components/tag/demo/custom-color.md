## 自定义颜色 @en{Custom Color}

#### 6

```js
import { Tag } from '@arco-design/mobile-react';

export default function TagDemo() {
    return (<>
        <Tag type="solid" bgColor="#FF5722">Tag</Tag>
        <Tag type="solid" bgColor="linear-gradient(277.15deg, #0678FF -0.2%, #14CDFF 97.54%)">Tag</Tag>
        <Tag borderStyle="none" color="#0FC6C2" bgColor="#E8FFFB">Tag</Tag>
        <Tag borderStyle="none" color="#B71DE8" bgColor="#FDE8FF">Tag</Tag>
    </>);
}
```
