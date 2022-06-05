## 单个折叠面板 @en{Single Collapse}

#### 1

```js
import { Collapse } from '@arco-design/mobile-react';
import { useEffect, useState } from 'react';

export default function CollapseItemDemo() {
    const [list, setList] = useState([]);
    const node = (
        <>
            {list.map(item => (
                <div>{item.name}</div>
            ))}
        </>
    );

    useEffect(() => {
        // 模拟请求数据
        setTimeout(
            () =>
                setList([
                    { name: 'here is content area' },
                    { name: 'here is content area' },
                    { name: 'here is content area' },
                    { name: 'here is content area' },
                ]),
            300,
        );
    }, []);

    return (
        <>
            <Collapse header="Title 1" value="1" defaultActive content={node} />
            <Collapse
                header="Title 2"
                value="2"
                content="here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area"
            />
            <Collapse
                header="Disabled"
                value="3"
                disabled
                content="here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is content area, here is the content area"
            />
        </>
    );
}
```
