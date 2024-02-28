## 设置分段数 @en{Set the Number of Segments}

#### 4

```js
import { Slider } from '@arco-design/mobile-react';

export default function SliderDemo() {
    const [fontSize, setFontSize] = React.useState(0);
    return (
        <Slider
            showTooltip="never"
            value={fontSize}
            marks={[0, 1, 2]}
            max={2}
            onAfterChange={(value) => {
                if (typeof value === 'number') {
                    setFontSize(value);
                }
            }}
        />
    );
}
```
