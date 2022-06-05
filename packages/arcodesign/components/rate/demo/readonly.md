## 受控 @en{Controlled}

#### 5

```js
import { Rate } from '@arco-design/mobile-react';
export default function BaseRateDemo5() {
    const [value, setValue] = React.useState(3);

    return (
        <Rate value={value} onChange={val => setValue(val)} />
    );
}
```
