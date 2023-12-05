## 自定义按钮  @en{Custom Button}

#### 10

```js
import { Slider } from '@arco-design/mobile-react';
import './index.less';

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

```less
.slider-custom-thumb-two {
    padding: 2px 8px;
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    .use-var(background, primary-color);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}
```
