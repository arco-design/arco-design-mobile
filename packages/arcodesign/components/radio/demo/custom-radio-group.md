## 自定义选项单选组 @en{Custom options of radio group}

#### 6

```js
import { Radio } from '@arco-design/mobile-react';

export default function RadioDemo() {
    const options = [
        {
            label: 'Watermelon',
            value: 1,
        },
        {
            label: 'Banana',
            value: 2,
        },
        {
            label: 'Mango',
            value: 3,
        },
        {
            label: 'Apple',
            value: 4,
            disabled: true,
        },
        {
            label: 'Cherry',
            value: 5,
        },
        {
            label: 'Kiwi fruit',
            value: 6,
        },
    ];

    const [value, setValue] = React.useState(2)

    return (
        <Radio.Group
            className="demo-radio-custom-group"
            options={options}
            value={value}
            onChange={value => {
                setValue(value);
            }}
        />
    );
}
```
