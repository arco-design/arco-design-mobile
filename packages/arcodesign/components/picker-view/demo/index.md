## 普通选择器视图 @en{Normal PickerView}

#### 1

```js
import { PickerView } from '@arco-design/mobile-react';

export default function PickerViewDemo() {
    const [value, setValue] = React.useState(['Wednesday', 'Morning']);
    const data = React.useMemo(() => {
        return [
            [
                {label: 'Monday', value: 'Monday'},
                {label: 'Tuesday', value: 'Tuesday'},
                {label: 'Wednesday', value: 'Wednesday'},
                {label: 'Thursday', value: 'Thursday'},
                {label: 'Friday', value: 'Friday'},
                {label: 'Saturday', value: 'Saturday'},
                {label: 'Sunday', value: 'Sunday'},
            ], [
                {label: 'Morning', value: 'Morning'},
                {label: 'Afternoon', value: 'Afternoon'},
                {label: 'Evening', value: 'Evening'},
            ]
        ];
    }, []);
    return (
        <PickerView
            data={data}
            value={value}
            onPickerChange={(value, index, data) => {
                console.log('value: ' + value, index, data);
                setValue(value);
            }}
            cascade={false}
        />
    );
}
```
