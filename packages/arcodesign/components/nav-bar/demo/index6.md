## 带按钮的导航 @en{NavBar with button}

#### 6

```js
import { NavBar } from '@arco-design/mobile-react';

export default function NavBarDemo() {
    return (
        <>
            <NavBar
                fixed={false}
                leftContent="Cancel"
                hasBottomLine={false}
                title="Message"
                rightContent={<span style={{
                    background: '#165DFF',
                    borderRadius: '26px',
                    width: '60px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#FFF'
                }}>Finish</span>}
            />
            <div className="gap-line"></div>
        </>
    );
}
```
