## 吸底 @en{Fixed bottom}

#### 4

```js
import { Sticky, Button } from '@arco-design/mobile-react';

export default function StickyDemo() {
    return (
        <div>
            <Sticky position="bottom" bottomOffset={40}>
                <Button>Fixed bottom, global scrolling, 40px position relative to the bottom</Button>
            </Sticky>
        </div>
    );
}
```
