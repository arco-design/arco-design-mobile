## 左右都有

#### 4

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
                <Cell label="左右滑动" />
            </SwipeAction>
        </Cell.Group>
    );
}
```
