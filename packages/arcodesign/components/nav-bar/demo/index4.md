## 更改左、右侧图标 @en{Change left and right icons}

#### 4

```js
import { NavBar } from '@arco-design/mobile-react';
import IconClose from '@arco-design/mobile-react/esm/icon/IconClose';
import IconSearch from '@arco-design/mobile-react/esm/icon/IconSearch';

export default function NavBarDemo() {
    return (
       <>
            <NavBar
                leftContent={<IconClose />}
                fixed={false}
                title="Title"
                hasBottomLine={false}
            />
            <div className="gap-line"></div>
            <NavBar
                fixed={false}
                hasBottomLine={false}
                title="Title"
                rightContent={<IconSearch style={{ fontSize: 18 }} />}
            />
        </>
    );
}
```

```less
.gap-line {
    height: 20px;
    .use-var(background, background-color);
}
```
