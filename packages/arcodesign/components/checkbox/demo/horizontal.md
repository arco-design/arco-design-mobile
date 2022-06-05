## 水平排列 @en{Horizontal Arrangement}

#### 4

```js
import { Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const options = [
        {
            label: 'Option 1',
            value: 1,
        },
        {
            label: 'Option 2',
            value: 2,
        },
        {
            label: 'Option 3',
            value: 3,
            disabled: true,
        },
    ];

    const [value, setValue] = React.useState([2, 3])

    return (
        <Checkbox.Group
            style={{lineHeight: 1.5, display: 'flex', justifyContent: 'space-between'}}
            options={options}
            value={value}
            onChange={value => {
                setValue(value);
            }}
        />
    );
}
```
