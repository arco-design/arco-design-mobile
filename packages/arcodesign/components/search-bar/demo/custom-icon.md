## 自定义 Icon @en{Custom Icon}

#### 3

```js
import { SearchBar } from '@arco-design/mobile-react';
import { IconSetting } from '@arco-design/mobile-react/esm/icon';

export default function SearchBarDemo() {

    return (
        <SearchBar prefix={<IconSetting style={{ color: '#86909c' }} />} />
    );
}
```
