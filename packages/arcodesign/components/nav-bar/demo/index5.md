## tab

#### 4

```js
import { NavBar, Tabs } from '@arco-design/mobile-react';
import IconMore from '@arco-design/mobile-react/esm/icon/IconMore';

const tabData = [
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' },
];

export default function NavBarDemo() {
    return (
        <NavBar
            fixed={false}
            hasBottomLine={false}
            rightContent={<IconMore />}
        >
            <div style={{
                width: '100%',
                padding: '1px 46px',
            }}>
                <Tabs
                    tabs={tabData}
                    type="line-divide"
                    defaultActiveTab={0}
                    tabBarHasDivider={false}
                ></Tabs>
            </div>
        </NavBar>
    );
}
```

