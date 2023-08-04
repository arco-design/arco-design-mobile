## 基础用法 @en{Basic Usage}

#### 1

```js
import { Dropdown, Button } from '@arco-design/mobile-react';

export default function DropdownDemo() {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const options = [];
    for (let i = 0; i < 100; i++) {
        options.push({
            label: `Option ${i}`,
            value: 1,
        });
    }

    return (
        <div>
            <Button
                size="huge"
                className="select-wrapper"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                Click to expand
            </Button>
            <Dropdown
                options={options}
                showDropdown={showDropdown}
                onOptionClick={() => {
                    console.info('click');
                }}
                onOptionChange={(value, item) => {
                    console.info(value, item);
                    setShowDropdown(false);
                }}
                onCancel={() => setShowDropdown(false)}
            />
        </div>
    );
}
```
