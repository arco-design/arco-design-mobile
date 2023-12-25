## 自定义插入内容 @en{Custom Insert}

#### 5

```js
import { SearchBar, Avatar } from '@arco-design/mobile-react';
import { IconArrowDown } from '@arco-design/mobile-react/esm/icon';

export default function SearchBarDemo() {
    const renderPrepend = () => {
        return (
            <div className="demo-search-pend-wrapper">
                City <IconArrowDown className="demo-search-pend-icon" />
            </div>
        );
    };

    const renderAppend = focusing => {
        return <Avatar size="ultra-small" className="demo-search-pend-avatar" />;
    };

    return <SearchBar prepend={renderPrepend()} append={renderAppend} actionButton={null} />;
}
```

```less
.demo-search-pend-wrapper {
    display: flex;
    align-items: center;
    font-size: 14px;
    .set-prop-with-rtl(margin-right, 16px);
}
.demo-search-pend-icon {
    font-size: 10px;
    .set-prop-with-rtl(margin-left, 5px);
}
.demo-search-pend-avatar {
    .set-prop-with-rtl(margin-left, 13px);
}
```
