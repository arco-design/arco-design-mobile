## 自定义 icon

#### 3

```js
import { SearchBar } from '@arco-design/mobile-react';
import { IconSetting } from '@arco-design/mobile-react/esm/icon';

export default function SearchBarDemo() {
    const style = { marginTop: 20 };

    return (
        <div>
            <SearchBar prefix={null} placeholder="无按钮" appendBtnText="搜索" />
            <SearchBar
                style={style}
                prefix={<IconSetting style={{ color: '#86909c' }} />}
                placeholder="自定义按钮"
            />
        </div>
    );
}
```
