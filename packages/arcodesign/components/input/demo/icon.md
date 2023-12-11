## 图标文本框 @en{ Input with Icon}

#### 5

```js
import { Input } from '@arco-design/mobile-react';
import IconUser from '@arco-design/mobile-react/esm/icon/IconUser';

export default function InputDemo() {
    return (<>
        <Input
            label={<div className="demo-input-icon">
                <IconUser style={{ marginRight: 10, fontSize: 20, color: '#4E5969', verticalAlign: 'middle' }} />
                Username
            </div>}
            placeholder="please enter username"
            border="none"
        />
    </>);
}
```

```less
.demo-input-icon {
    display: flex;
    align-items: center;
}
```
