## 基础样式 @en{Basic Style}

#### 1

```js
import { NavBar } from '@arco-design/mobile-react';
import IconMore from '@arco-design/mobile-react/esm/icon/IconMore';
import './index.less';

export default function NavBarDemo() {
    // const [icon, setIcon] = React.useState('black');
    const navBarRef = React.useRef();

    return (<>
        <NavBar
            ref={navBarRef}
            fixed={false}
            title="Title"
            rightContent={<span style={{color: '#165DFF'}}>More</span>}
            hasBottomLine={false}
            onClickLeft={() => {
                console.info('---- navBarRef height ', navBarRef.current.navBar.getBoundingClientRect());
            }}
            onClickRight={() => {}}
        />
        <div className="gap-line" />
        <NavBar
            ref={navBarRef}
            fixed={false}
            title="Title"
            hasBottomLine={false}
        />
        <div className="gap-line" />
        <NavBar
            fixed={false}
            title="Message"
            style={{ color: 'white', background: '#165dff' }}
            hasBottomLine={false}
            rightContent={<IconMore />}
        />
    </>);
}
```

```less
.gap-line {
    height: 20px;
    .use-var(background, background-color);
}
```
