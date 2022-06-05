## 按钮类型 @en{Button type}

#### 9

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    const dangerBgColor = {
        normal: "#F53F3F",
        active: "#CB2634",
        disabled: "#FBACA3",
    };
    const dangerTextColor = {
        normal: '#fff',
        active: '#fff',
        disabled: '#FFECE8',
    };
    const warningBgColor = {
        normal: "#FF7D00",
        active: "#D25F00",
        disabled: "#FFCF8B",
    };
    const warningTextColor = {
        normal: '#fff',
        active: '#fff',
        disabled: '#FFF7E8',
    };

    return (
        <>
            <div className="button-inline-flex">
                <Button needActive>
                    Information
                </Button>
                <Button disabled>
                    Disabled
                </Button>
            </div>
            <div className="button-inline-flex">
                <Button needActive type="danger" bgColor={dangerBgColor} borderColor={dangerBgColor} color={dangerTextColor}>
                    Information
                </Button>
                <Button disabled type="danger" bgColor={dangerBgColor} borderColor={dangerBgColor} color={dangerTextColor}>
                    Disabled
                </Button>
            </div>
            <div className="button-inline-flex">
                <Button needActive type="warning" bgColor={warningBgColor} borderColor={warningBgColor} color={warningTextColor}>
                    Information
                </Button>
                <Button disabled type="warning" bgColor={warningBgColor} borderColor={warningBgColor} color={warningTextColor}>
                    Disabled
                </Button>
            </div>
        </>
    );
}
```
