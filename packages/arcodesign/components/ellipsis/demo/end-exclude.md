## 自适应 + 尾部字符过滤 @en{Adaptive + Tail Character Filtering}

#### 3

```js
import { Ellipsis } from '@arco-design/mobile-react';

export default function EllipsisDemo() {
    const text =
        `This was long before digital audio: this was done with razor blades. Today, it's called sampling, and the influence of these bands is felt in nearly all branches of modern pop music.`;
    return (
        <div>
            <Ellipsis text={text} maxLine={2} reflowOnResize={true} endExcludes={['，', '。']} />
        </div>
    );
}
```
