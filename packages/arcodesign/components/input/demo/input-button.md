## 按钮文本框 @en{Input with Button}

#### 7

```js
import { Input, Button } from '@arco-design/mobile-react';

export default function InputDemo() {
    const inputRef = React.useRef();
    return (
        <Input
            label="Verification code"
            placeholder="Please enter verification code"
            type="tel"
            validator={(val) => val.length <= 4}
            className="demo-input-btn-input"
            clearable
            suffix={<div className="demo-input-btn-wrap">
                <Button inline shape="round" size="medium" onClick={() => {
                    inputRef.current && inputRef.current.input.focus();
                }}>Send</Button>
            </div>}
            border="none"
            ref={inputRef}
        />
    );
}
```

```less
.demo-input-btn-input .@{prefix}-input-wrap {
    height: auto;
}
.demo-input-btn-wrap {
    .rem(padding, 11, 0);
}
```
