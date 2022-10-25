## 多行数值

#### 2

```js
import { SwipeAction, Cell } from '@arco-design/mobile-react';

export default function SwipeActionDemo() {
    return (
        <Cell.Group bordered={false}>
            <SwipeAction
                leftActions={[
                    {
                        text: '置顶',
                        style: {
                            background: '#C9CDD4',
                        },
                    },
                    {
                        text: '删除',
                        style: {
                            background: '#F53F3F',
                        },
                    },
                ]}
            >
                <Cell label="多行数值" desc="辅助文字" />
            </SwipeAction>
        </Cell.Group>
    );
}
```
