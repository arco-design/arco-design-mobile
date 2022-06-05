## 不同类型 @en{different Styles}

#### 3

```js
import { Radio } from '@arco-design/mobile-react';

function IconCheckedDot() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z"
                stroke="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function RadioDemo() {
    const [value, setValue] = React.useState(1)
    const dotIcon = {
        active: <IconCheckedDot />,
    }
    return (
        <Radio.Group
            layout="block"
            defaultValue={value}
            onChange={value => {
                setValue(value);
            }}
        >
            <Radio value={1} layout="block" icons={dotIcon}>Single option 1</Radio>
            <Radio value={2} layout="block" style={{ marginTop: 20 }}>Single option 2</Radio>
        </Radio.Group>
    );
}
```
