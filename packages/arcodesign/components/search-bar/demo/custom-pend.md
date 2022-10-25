## 自定义插入内容 @en{Custom Insert}

#### 5

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
                City <IconArrowDown style={iconStyle} />
            </div>
        );
    };

    const renderAppend = focusing => {
        return <Avatar size="ultra-small" style={{ marginLeft: 13 }} />;
    };

    return <SearchBar prepend={renderPrepend()} append={renderAppend} actionButton={null} />;
}
```
