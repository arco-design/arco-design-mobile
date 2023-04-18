## 浮动的缩略符 @en{Floating Ellipsis Node}

#### 6

```js
import { Ellipsis } from '@arco-design/mobile-react';

export default function EllipsisDemo() {
    const [ellipsis, setEllipsis] = React.useState(true);
    const text =
        `This was long before digital audio: this was done with razor blades. Today, it's called sampling, and the influence of these bands is felt in nearly all branches of modern pop music.`;
    return (
        <Ellipsis
            text={text}
            maxLine={2}
            ellipsisNode={<span className="demo-link">展开</span>}
            collapseNode={<span className="demo-link">收起</span>}
            ellipsis={ellipsis}
            onCollapseNodeClick={() => setEllipsis(true)}
            onEllipsisNodeClick={() => setEllipsis(false)}
            floatEllipsisNode
        />
    );
}
```
