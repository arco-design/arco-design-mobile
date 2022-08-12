## 加载按钮 @en{Loading button}

#### 6

```js
import { Button } from '@arco-design/mobile-react';
import IconSetting from '@arco-design/mobile-react/esm/icon/IconSetting';

export default function ButtonDemo() {
    const [loadingStatus, setLoadingStatus] = React.useState(false);
    return (
        <>
        <Button loading inline style={{ marginRight: 11 }}>
            Primary
        </Button>

        <Button type="ghost" loading inline>
            Secondary
        </Button>

        <Button
            icon={<IconSetting />}
            type="ghost"
            coverIconWhenLoading
            loading={loadingStatus}
            inline
            onClick={() => {
                setLoadingStatus(true);
                setTimeout(() => {
                    setLoadingStatus(false);
                }, 1000)
            }}
            style={{ marginTop: 20 }}
        >
            Secondary
        </Button>
        </>
    );
}
```
