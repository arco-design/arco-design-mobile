## 最多文字 @en{Maximum Length }

#### 3

```js
import { Input } from '@arco-design/mobile-react';

export default function InputDemo() {
    const [append, setAppend] = React.useState(0);
    const total = 10;
    return (<>
        <Input
            label="Title Text"
            placeholder="Up to 10 characters, truncated over long"
            maxLength={10}
            border="none"
        />
        <Input
            label="Title Text"
            placeholder="Up to 10 characters, extra long tips"
            border="none"
            onInput={e => setAppend(e.target.value.length)}
            suffix={<div className={`demo-input-maxlength ${append <= total ? '' : 'error'}`}>
                {append}/{total}
            </div>}
        />
    </>);
}
```
