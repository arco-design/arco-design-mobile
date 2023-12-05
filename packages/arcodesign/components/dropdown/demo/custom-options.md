## 使用 Options 子组件自定义下拉内容 @en{Use the Options component to customize the dropdown content}

#### 5

```js
import { Dropdown, Button } from '@arco-design/mobile-react';
import './index.less';

export default function DropdownDemo() {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [value, setValue] = React.useState([]);

    return (
        <div>
            <Button size="huge" className="select-wrapper" onClick={() => setShowDropdown(!showDropdown)}>Click to expand</Button>
            <Dropdown
                showDropdown={showDropdown}
                onCancel={() => setShowDropdown(false)}
                direction="up"
            >
                <div className="demo-dropdown-option-desc">Group 1</div>
                <Dropdown.Options
                    useColumn={3}
                    multiple={true}
                    selectedValue={value[0] || []}
                    onOptionClick={() => { console.info('click 1'); }}
                    onOptionChange={(val, item) => {
                        console.info('change 1', val, item);
                        setValue((oldValue) => {
                            oldValue[0] = val;
                            return [...oldValue];
                        });
                    }}
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
                    },
                    {
                        label: 'Option 4',
                        value: 3,
                    }
                    ]}
                ></Dropdown.Options>
                <div className="demo-dropdown-option-desc">Group 2</div>
                <Dropdown.Options
                    useColumn={3}
                    multiple={true}
                    selectedValue={value[1] || []}
                    onOptionClick={() => { console.info('click 2'); }}
                    onOptionChange={(val, item) => {
                        console.info('change 2', val, item);
                        setValue((oldValue) => {
                            oldValue[1] = val;
                            return [...oldValue];
                        });
                    }}
                    options={[
                    {
                        label: 'Option 5',
                        value: 0,
                        disabled: false,
                    },
                    {
                        label: 'Option 6',
                        value: 1,
                    }]}
                ></Dropdown.Options>
            </Dropdown>
        </div>
    );
}
```

```less-global
.demo-dropdown-option-desc {
    .rem(font-size, 16);
    .rem(padding, 16);
    font-weight: bold;
}
```
