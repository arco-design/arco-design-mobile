## 特殊输入格式 @en{Special Input Format}

#### 8

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    const [input, setInput] = React.useState('');
    return (<>
        <Input
            prefix={<div className="demo-input-money">¥</div>}
            placeholder="0.00"
            type="number"
            border="none"
        />
        <Input
            label="Tel"
            placeholder="Please enter the phone number"
            type="tel"
            border="none"
            value={input}
            maxLength={13}
            onInput={(_, value) => {
                const newValue = (value || '').replace(/ /g, '');
                setInput(`${newValue.slice(0, 3)} ${newValue.slice(3,7)} ${newValue.slice(7)}`.trim());
            }}
        />
        <Input
            label="Password"
            placeholder="Please enter password"
            type="password"
            border="none"
        />
    </>);
}
```
