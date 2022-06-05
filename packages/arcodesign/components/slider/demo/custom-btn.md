## 自定义按钮  @en{Custom Button}

#### 10

```js
import { Slider } from '@arco-design/mobile-react';

export default function SliderDemo() {
    return (
        <Slider
            showTooltip="never"
            defaultValue={32}
            renderThumb={value => <div className="slider-custom-thumb-two">{value}</div>}
        />
    );
}
```
