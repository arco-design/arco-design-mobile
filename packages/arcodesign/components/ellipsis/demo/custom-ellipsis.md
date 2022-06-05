## 控制展开收起 @en{Control Expand and Collapse}

#### 2

```js
import { Ellipsis } from '@arco-design/mobile-react';

export default function EllipsisDemo() {
    const text =
        `This wasn't the first time ''natural'' sounds had been used in musical compositions; that sort of thing had been going on at least as far back as the 19th century, and the surrealists and futurists of the 1920s and 1930s were way into this kind of thing.`;
    const [ellipsis, setEllipsis] = React.useState(true);
    const collapseNode = <span className="demo-link">Collapse</span>;

    return (
        <Ellipsis
            ellipsis={ellipsis}
            text={text}
            maxLine={2}
            ellipsisNode={
                <span>
                    ...<span className="demo-link">Expand</span>
                </span>
            }
            collapseNode={collapseNode}
            reflowOnResize={true}
            onEllipsisNodeClick={() => {
                setEllipsis(false);
            }}
            onCollapseNodeClick={() => {
                setEllipsis(true);
            }}
        />
    );
}
```
