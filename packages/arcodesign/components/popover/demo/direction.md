
## 弹出位置 @en{Pop-up Position}
#### 2

```js
import { Popover, Button } from '@arco-design/mobile-react';
import './index.less';

export default function PopoverDemo() {
    const [popoverData, setPopoverData] = React.useState([
        {
            text: 'Top left',
            direction: 'topLeft',
            content: 'Top left direction',
        },
        {
            text: 'Top right',
            direction: 'topRight',
            content: 'Top right direction',
        },
        {
            text: 'Bottom left',
            direction: 'bottomLeft',
            content: 'Bottom left direction',
        },
        {
            text: 'Bottom right',
            direction: 'bottomRight',
            content: 'Bottom right direction',
        },
        {
            text: 'Top center',
            direction: 'topCenter',
            content: 'Top center direction',
        },
        {
            text: 'Bottom center',
            direction: 'bottomCenter',
            content: 'Bottom center direction',
        },
    ]);
    return (
        <div className="direction-demo-wrapper">
            {
                popoverData.map((item, index) => (
                    <div className="direction-item" key={item.text}>
                        <Popover
                            content={`This is a ${item.content} bubble`}
                            direction={item.direction}
                            clickSelfToClose={true}
                        >
                            <Button>{item.text}</Button>
                        </Popover>
                    </div>
                ))
            }
        </div>
    );
}
```

```less
.direction-demo-wrapper {
    height: 190px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    [dir="rtl"] & {
        flex-direction: row-reverse;
    }
    .direction-item {
        margin: 14px 0;
        &:nth-child(2n+1) {
            margin-right: 60px;
        }
    }
    .@{prefix}-button {
        width: 124px;
        &.size-large {
            padding: 0;
        }
    }
}
```
