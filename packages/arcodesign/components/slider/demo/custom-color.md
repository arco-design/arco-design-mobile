## 自定义颜色  @en{Custom Color}

#### 8

```js
import { Slider } from '@arco-design/mobile-react';
import './index.less';

export default function SliderDemo() {
    return (
        <Slider
            className="slider-custom-yellow"
            showTooltip="never"
            defaultValue={32}
        />
    );
}
```

```less
.slider-custom-yellow {
    .@{prefix}-slider-line.is-activated {
        background: #ffb400;
    }
}
```
