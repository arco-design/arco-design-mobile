## 自定义图标  @en{Custom Icon}

#### 11

```js
import { Slider } from '@arco-design/mobile-react';
import IconNoticeOff from '@arco-design/mobile-react/esm/icon/IconNoticeOff';
import IconNotice from '@arco-design/mobile-react/esm/icon/IconNotice';

export default function SliderDemo() {
    const [v, setV] = React.useState(27);

    return (
        <Slider
            showTooltip="never"
            prefixLabel={<IconNoticeOff />}
            suffixLabel={<IconNotice />}
            value={v}
            onAfterChange={v => {
                setV(v);
            }}
        />
    );
}
```
