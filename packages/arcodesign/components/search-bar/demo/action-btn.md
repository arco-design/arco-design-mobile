## 右侧按钮展现时机 @en{Right Button Display Timing}

#### 2

```js
import { SearchBar, Radio } from '@arco-design/mobile-react';
import { useEffect, useState } from 'react';

const style = { padding: 16, backgroundColor: 'white' };
const options = [
    { label: 'default', value: 'default' },
    { label: 'always', value: 'always' },
    { label: 'none', value: 'none' },
    { label: 'value', value: 'value' },
    { label: 'focus', value: 'focus' },
];

export default function SearchBarDemo() {
    const [type, setType] = useState('default');

    const handleChange = newType => setType(newType);

    return (
        <div>
            <Radio.Group style={style} options={options} value={type} onChange={handleChange} />
            <SearchBar actionBtnShowType={type} />
        </div>
    );
}
```
