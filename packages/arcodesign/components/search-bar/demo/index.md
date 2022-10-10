## 基础样式 @en{Basic Style}

#### 1

```js
import { SearchBar, Radio, Toast } from '@arco-design/mobile-react';
import { useEffect, useState } from 'react';

const style = { padding: 16, backgroundColor: 'white' };
const options = [
    { label: 'square', value: 'square' },
    { label: 'round', value: 'round' },
];

export default function SearchBarDemo() {
    const [shape, setShape] = useState('square');

    const handleChange = newShape => setShape(newShape);
    const handleClick = inputValue => {
        Toast.toast('Click cancel');
    };

    return (
        <div>
            <Radio.Group style={style} options={options} value={shape} onChange={handleChange} />
            <SearchBar shape={shape} onCancel={handleClick} />
        </div>
    );
}
```
