## 基础用法 @en{Basic Usage}

#### 1

```js
import { Sticky, Button } from '@arco-design/mobile-react';

export default function StickyDemo() {
    return (
        <div>
            <Sticky topOffset={64}>
                <Button>Global scrolling, positioned relative to the top 64px</Button>
            </Sticky>
        </div>
    );
}
```
