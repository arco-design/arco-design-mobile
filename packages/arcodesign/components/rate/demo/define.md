## 自定义大小  @en{Custom Size}

#### 4

```js
import { Rate, Slider } from '@arco-design/mobile-react';
export default function BaseRateDemo4() {
    const [size, setSize] = React.useState(24);
    return (
        <>
            <Rate
                defaultValue={3}
                size={size}
            />
            <Slider
                style={{marginTop: '42PX', paddingLeft: 0, paddingRight: 0, paddingTop: 0}}
                min={20}
                max={36}
                marks={[20, 24, 28, 32, 36]}
                step={4}
                value={size}
                onChange={(val) => setSize(val)}
                showMarks
            />
        </>
    );
}
```
