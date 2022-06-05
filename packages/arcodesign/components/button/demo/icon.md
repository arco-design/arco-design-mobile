## 含图标按钮 @en{Button with icon}

#### 4

```js
import { Button  } from '@arco-design/mobile-react';
import IconSetting from '@arco-design/mobile-react/esm/icon/IconSetting';
import IconScan from '@arco-design/mobile-react/esm/icon/IconScan';

export default function ButtonDemo() {
    return (
        <>
            <Button inline icon={<IconSetting />} style={{marginRight: 20, width: '0.72rem', padding: 0}} />
            <Button inline icon={<IconScan />} style={{marginRight: 20}}>Button</Button>
            <Button inline icon={<IconScan />} type="ghost">Icon button</Button>
        </>
    );
}
```
