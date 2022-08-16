## 自定义样式

#### 5

```js
import { SwipeAction, Cell } from '@arco-design/mobile-react';
import { IconStar, IconDelete } from '@arco-design/mobile-react/esm/icon';

export default function SwipeActionDemo() {
    return (
        <Cell.Group bordered={false}>
            <SwipeAction
                rightActions={[
                    {
                        text: '收藏',
                        icon: <IconStar />,
                        style: {
                            background: '#FFB400',
                        },
                    },
                    {
                        text: '删除',
                        icon: <IconDelete />,
                        style: {
                            background: '#F53F3F',
                        },
                    },
                ]}
            >
                <Cell label="自定义样式" />
            </SwipeAction>
        </Cell.Group>
    );
}
```
