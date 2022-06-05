## 自定义下拉框节点 @en{Custom Dropdown Node}

#### 4

```js
import { Dropdown, Button } from '@arco-design/mobile-react';

export default function DropdownDemo() {
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleOptionChange = (value, item) => {
        setShowDropdown(false);
    }

    return (
        <div>
            <Button size="huge" className="select-wrapper" onClick={() => setShowDropdown(!showDropdown)}>Click to expand</Button>
            <Dropdown
                showDropdown = {showDropdown}
                onOptionChange={handleOptionChange}
                onCancel={() => setShowDropdown(false)}
                getScrollContainer={() => document.getElementById('test')}
            >
                <div id="test" style={{fontSize: '16px', padding: 16, height: 100, overflowY: 'auto'}}>
                    <div style={{ height: 1000 }}>Here is the dropdown box content</div>
                </div>
            </Dropdown>
        </div>
    );
}
```
