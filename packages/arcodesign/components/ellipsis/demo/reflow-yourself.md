## 自行触发重排 @en{Manually Trigger Reflow}

#### 5

```js
import { Ellipsis, Button } from '@arco-design/mobile-react';

export default function EllipsisDemo() {
    const ref = React.useRef(null);
    const text =
        `This wasn't the first time ''natural'' sounds had been used in musical compositions; that sort of thing had been going on at least as far back as the 19th century, and the surrealists and futurists of the 1920s and 1930s were way into this kind of thing.`;
    return (
        <div>
            <Ellipsis
                ref={ref}
                text={text}
                maxLine={2}
                ellipsisNode="..."
                onReflow={(ellipsis, text) => {
                    console.info('reflow => ', ellipsis, text);
                }}
            />
            <Button
                style={{ marginTop: 32 }}
                onClick={() => {
                    ref.current.reflow();
                }}
            >
                Click to trigger reflow
            </Button>
        </div>
    );
}
```
