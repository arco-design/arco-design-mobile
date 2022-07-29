## 自定义插入内容

#### 4

```js
import { SearchBar, Avatar } from '@arco-design/mobile-react';
import { IconArrowDown } from '@arco-design/mobile-react/esm/icon';

export default function SearchBarDemo() {
    const renderPrepend = () => {
        const wrapperStyle = {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            marginRight: 10,
        };
        const iconStyle = { marginLeft: 5, fontSize: 10 };

        return (
            <div style={wrapperStyle}>
                城市 <IconArrowDown style={iconStyle} />
            </div>
        );
    };

    // 可以根据focusing的true或false选择渲染不同的内容
    const renderAppend = focusing => {
        return <Avatar size="ultra-small" style={{ marginLeft: 13 }} />;
    };

    return <SearchBar prepend={renderPrepend()} append={renderAppend} />;
}
```
