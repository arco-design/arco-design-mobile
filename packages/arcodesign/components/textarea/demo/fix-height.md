## 区域限制 @en{Limited Textarea Height}

#### 2

```js
import { Textarea } from '@arco-design/mobile-react';

export default function TextareaDemo() {
    return (<>
        <Textarea
            showStatistics={false}
            placeholder="Please enter the description of no less than 10 characters"
            border="none"
            textareaStyle={{ height: 55 }}
        />
    </>);
}
```
