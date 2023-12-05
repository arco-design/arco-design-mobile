## 标题输入框上下排布 @en{Title input arrange up and down}

#### 6

```js
import { Input } from '@arco-design/mobile-react';
import './index.less';

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

```less
.demo-input-title {
    .rem(font-size, 13);
    .rem(line-height, 18);
    .rem(margin-bottom, -8);
    .rem(padding, 16, 16, 0, 16);
}
```
