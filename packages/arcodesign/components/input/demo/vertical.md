## 标题输入框上下排布 @en{Title input arrange up and down}

#### 6

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    return (<>
        <Input
            prepend={<div className="demo-input-title">Title</div>}
            placeholder="please enter username"
            border="none"
        />
    </>);
}
```
