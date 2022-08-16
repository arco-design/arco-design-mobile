## 自定义颜色

#### 6

```js
import { SwipeAction, Cell } from '@arco-design/mobile-react';

export default function SwipeActionDemo() {
    return (
        <Cell.Group bordered={false}>
            <SwipeAction
                rightActions={[
                    {
                        text: '取消置顶',
                        style: {
                            background: '#86909C',
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
                <Cell label="自定义颜色" />
            </SwipeAction>
        </Cell.Group>
    );
}
```
