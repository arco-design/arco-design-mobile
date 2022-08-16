## 单行数值

#### 1

```js
import { SwipeAction, Cell } from '@arco-design/mobile-react';

export default function SwipeActionDemo() {
    return (
        <Cell.Group bordered={false}>
            <SwipeAction
                rightActions={[
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
                closeOnTouchOutside={true}
                onOpen={() => {
                    console.log('onOpen');
                }}
                onClose={() => {
                    console.log('onClose');
                }}
            >
                <Cell label="单行数值" />
            </SwipeAction>
        </Cell.Group>
    );
}
```
