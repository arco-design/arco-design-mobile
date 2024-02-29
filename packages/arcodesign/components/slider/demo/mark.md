## 设置分段数 @en{Set the Number of Segments}

#### 4

```js
import { Slider } from '@arco-design/mobile-react';

export default function SliderDemo() {
    return (
        <Slider
            showMarks
            useMarkOnly
            max={20}
            marks={[0, 5, 10, 15, 20]}
            defaultValue={5}
        />
    );
}
```
