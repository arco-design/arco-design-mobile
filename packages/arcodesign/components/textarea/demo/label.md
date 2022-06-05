## 自定义标题 @en{Custom Title}

#### 4

```js
import { Textarea } from '@arco-design/mobile-react';

export default function TextareaDemo() {
    return (<>
        <Textarea
            prefix="Message"
            statisticsMaxlength={50}
            autosize
            placeholder="Please enter the description of no less than 10 characters"
            border="none"
            rows={2}
            renderStatistics={(cur, max) => `${cur}/${max}`}
        />
    </>);
}
```
