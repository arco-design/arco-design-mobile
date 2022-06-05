## 异步控制，二次确认 @en{Asynchronous control, secondary confirmation}

#### 6

```js
import { Switch, Dialog, Cell } from '@arco-design/mobile-react';

export default function SwitchDemo() {
    const [checked, setChecked] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    return (
        <Cell label="Asynchronous control, secondary confirmation" bordered={false}>
            <Switch
                checked={checked}
                platform="ios"
                onChange={(value) => {
                    // eslint-disable-next-line
                    console.info('---current value', value);
                }}
                onClick={() => {
                    Dialog.confirm({
                        title: 'Determine to toggle switch status?',
                        onOk: () => {setChecked(!checked)},
                    })
                }}
            />
        </Cell>
    );
}
```
