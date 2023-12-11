## 内嵌文字 @en{Inline text}

#### 4

```js
import { Switch, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    const [checked, setChecked] = React.useState(false);
    return (
        <Cell label="Open/Close" bordered={false}>
            <Switch
                className="demo-4"
                checked={checked}
                platform="ios"
                text={{ on: 'ON', off: 'OFF' }}
                onChange={(value) => {
                    setChecked(value);
                }}
                onTouchStart={() => console.log('start')}
                onTouchEnd={() => console.log('end')}
                onClick={() => console.log('click')}
            />
        </Cell>
    );
}
```

```less
.demo-4 {
    &.checked {
        .use-var(background, primary-color);
    }
}
```
