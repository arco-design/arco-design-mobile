## 自定义滑块气泡  @en{Custom thumb popover}

#### 12

```js
import { Slider, Popover } from '@arco-design/mobile-react';

export default function SliderDemo() {
    return (
        <Slider
            showTooltip="always"
            useRange
            defaultValue={[10, 60]}
            style={{ paddingTop: 60 }}
            renderThumbPopover={({ value, visible, thumbEl, index }) => {
                if (index === 0) {
                    return thumbEl;
                }
                return (
                    <Popover
                        visible={visible}
                        content={`value: ${value}`}
                    >
                        {thumbEl}
                    </Popover>
                );
            }}
        />
    );
}
```
