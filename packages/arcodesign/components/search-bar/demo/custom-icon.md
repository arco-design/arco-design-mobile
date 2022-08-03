## 自定义 Icon @en{Custom Icon}

#### 3

```js
import { SearchBar } from '@arco-design/mobile-react';
import { IconSetting } from '@arco-design/mobile-react/esm/icon';

export default function SearchBarDemo() {
    const style = { marginTop: 20 };

    return (
        <div>
            <SearchBar prefix={null} appendBtnText="Search" />
            <SearchBar style={style} prefix={<IconSetting style={{ color: '#86909c' }} />} />
        </div>
    );
}
```
