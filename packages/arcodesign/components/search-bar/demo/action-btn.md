## 自定义右侧按钮 @en{Custom right button}

#### 2

```js
import { SearchBar } from '@arco-design/mobile-react';
import { useEffect, useState } from 'react';

export default function SearchBarDemo() {
    const [type, setType] = useState('default');

    const handleChange = newType => setType(newType);

    return <SearchBar actionButton={<span className="demo-search-btn">Search</span>} />;
}
```

```less
.demo-search-btn {
    .set-prop-with-rtl(margin-left, 16px);
    .use-var(color, primary-color);
    font-size: 15px;
}
```
