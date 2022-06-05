## 自定义导航栏 @en{Custom Navigation Bar}

#### 3

```js
import { NavBar } from '@arco-design/mobile-react';
import IconMore from '@arco-design/mobile-react/esm/icon/IconMore';

export default function NavBarDemo() {
    return (
        <>
            <div className="gap-line"></div>
            <NavBar
                fixed={false}
                title="Title"
                hasBottomLine={false}
            />
            <div className="gap-line"></div>
            <NavBar
                fixed={false}
                onClickLeft={() => {}}
                rightContent={<div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{marginRight: '16px'}}>Edit</span>
                    <IconMore />
                </div>}
                title="Title"
                hasBottomLine={false}
            />
            <div className="gap-line"></div>
            <NavBar
                fixed={false}
                statusBarHeight={10}
                className="immersive-navbar"
                style={{
                    background: 'url(https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/navbar-demo-bg.png)',
                    color: 'white',
                }}
                title="I am Immersive Navbar Title"
            />
        </>
    );
}
```

