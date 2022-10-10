## 自定义右侧按钮 @en{Custom right button}

#### 2

```js
import { SearchBar } from '@arco-design/mobile-react';
import { useEffect, useState } from 'react';

const style = { padding: 16, backgroundColor: 'white' };
const actionBtnStyle = {
    marginLeft: 16,
    color: '#165DFF',
    fontSize: 15,
};

export default function SearchBarDemo() {
    const [type, setType] = useState('default');

    const handleChange = newType => setType(newType);

    return <SearchBar actionButton={<span style={actionBtnStyle}>Search</span>} />;
}
```
