## 复选框组 @en{Checkbox Group}

#### 3

```js
import { Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const [value, setValue] = React.useState([2])

    return (
        <Checkbox.Group
            layout='block'
            defaultValue={value}
            onChange={value => {
                setValue(value);
            }}
        >
            <Checkbox value={1} style={{height: 42}}>Option content 1</Checkbox>
            <Checkbox value={2} style={{height: 42}}>Option content 2</Checkbox>
            <Checkbox value={3} style={{height: 42}}>Option content 3</Checkbox>
        </Checkbox.Group>
    );
}
```
