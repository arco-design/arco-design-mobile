## 不同线框 @en{Different Wireframes}

#### 3

```js
import { Tag } from '@arco-design/mobile-react';

export default function TagDemo() {
    return (<div className="demo-tag-border">
        <Tag type="hollow" size="small" borderStyle="solid" halfBorder={false} color="#165DFF" borderColor="#94BFFF">Tag</Tag>
        <Tag type="hollow" size="small" borderStyle="solid" color="#00B42A" borderColor="#7BE188">Tag</Tag>
        <Tag type="hollow" size="small" borderStyle="dashed" halfBorder={false} color="#FF7D00" borderColor="#FFCF8B">Tag</Tag>
        <Tag type="hollow" size="small" borderStyle="dashed" color="#F53F3F" borderColor="#FBACA3">Tag</Tag>
        <Tag type="hollow" size="small" borderStyle="dotted" color="#4E5969" borderColor="#C9CDD4">Tag</Tag>
    </div>);
}
```
