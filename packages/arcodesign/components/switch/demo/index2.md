## Android

#### 2

```js
import { Switch, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    const [checked, setChecked] = React.useState(true);
    return (
        <Cell.Group bordered={false}>
            <Cell label="Android ON/OFF">
                <Switch
                    checked={checked}
                    platform="android"
                    onChange={(value) => {
                        setChecked(value);
                    }}
                    onTouchStart={() => console.log('start')}
                    onTouchEnd={() => console.log('end')}
                    onClick={() => console.log('click')}
                />
            </Cell>
            <Cell label="Android ON/Disabled">
                <Switch
                    checked
                    disabled
                    platform="android"
                    onChange={(value) => {
                        // eslint-disable-next-line
                        console.info('---onChange', value);
                    }}
                />
            </Cell>
            <Cell label="Android OFF/Disabled">
                <Switch
                    checked={false}
                    disabled
                    platform="android"
                    onChange={(value) => {
                        // eslint-disable-next-line
                        console.info('---onChange', value);
                    }}
                />
            </Cell>
        </Cell.Group>
    );
}
```
