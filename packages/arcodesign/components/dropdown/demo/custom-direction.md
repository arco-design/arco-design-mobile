## 自定义方向 @en{Custom Direction}

#### 3

```js
import { Dropdown, Button } from '@arco-design/mobile-react';

export default function DropdownDemo() {
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <div>
            <Button size="huge" className="select-wrapper" onClick={() => setShowDropdown(!showDropdown)}>Click to expand</Button>
            <Dropdown
                options={[
                {
                    label: 'Option 1',
                    value: 0,
                    disabled: false,
                },
                {
                    label: 'Option 2',
                    value: 1,
                },
                {
                    label: 'Option 3',
                    value: 2,
                    disabled: true,
                }
                ]}
                direction="up"
                showDropdown = {showDropdown}
                onOptionClick={() => { console.info('click'); }}
                onOptionChange={(value, item) => {
                    console.info(value,item);
                    setShowDropdown(false);
                }}
                onCancel={() => setShowDropdown(false)}
            />
        </div>
    );
}
```
