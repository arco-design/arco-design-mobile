## 限制最大可选数（最多可选两项） @en{Limit the maximum number of choices (up to two choices)}

#### 5

```js
import { Checkbox } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
    const [value, setValue] = React.useState([2,3])
    const maxSelect = 2;
    return (
        <Checkbox.Group
            layout='block'
            value={value}
            onChange={value => {
                if(value.length > maxSelect) return;
                setValue(value);
            }}
            max={maxSelect}
        >
            <Checkbox value={1} style={{height: 42}}>Option content 1</Checkbox>
            <Checkbox value={2} style={{height: 42}}>Option content 2</Checkbox>
            <Checkbox value={3} style={{height: 42}}>Option content 3</Checkbox>
        </Checkbox.Group>
    );
}
```
