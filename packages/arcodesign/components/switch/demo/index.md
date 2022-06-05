## iOS

#### 1

```js
import { Switch, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    const [checked, setChecked] = React.useState(true);

    return (
        <Cell.Group bordered={false}>
            <Cell label="IOS ON/OFF">
                <Switch
                    checked={checked}
                    platform="ios"
                    onChange={(value) => {
                        setChecked(value);
                    }}
                />
            </Cell>
            <Cell label="IOS ON/Disabled">
                <Switch
                    checked
                    disabled
                    platform="ios"
                    onChange={(value) => {
                        // eslint-disable-next-line
                        console.info('---onChange', value);
                    }}
                />
            </Cell>
            <Cell label="IOS OFF/Disabled">
                <Switch
                    checked={false}
                    disabled
                    platform="ios"
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
