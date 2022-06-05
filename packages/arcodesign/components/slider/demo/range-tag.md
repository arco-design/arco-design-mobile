## 范围标签 @en{Range Label}

#### 6

```js
import { Slider } from '@arco-design/mobile-react';

export default function SliderDemo() {
    return (
        <Slider
            useRange
            prefixLabel
            suffixLabel
            max={10}
            showTooltip="always"
            defaultValue={[1, 6]}
            formatTooltip={(value) => `${value} thousand`}
            style={{ paddingTop: 41 }}
        />
    );
}
```
