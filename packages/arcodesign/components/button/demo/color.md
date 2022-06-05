## 自定义颜色 @en{Custom color}

#### 7

```js
import { Button } from '@arco-design/mobile-react';

export default function ButtonDemo() {
    const colorConfig = {
        normal: "#FF5722",
        active: "#F53F3F",
        disabled: "#FBACA3",
    };

    const ghostBgColor = {
        normal: "#FFF",
        active: "#fbe1d9",
        disabled: "#FFF",
    }

    return (
        <>
            <Button
                inline
                style={{marginRight: 20 }}
                bgColor={colorConfig}
                borderColor={colorConfig}
            >Button</Button>
            <Button
                type="ghost"
                inline
                style={{marginRight: 20 }}
                color={colorConfig}
                bgColor={ghostBgColor}
                borderColor={colorConfig}
            >Button</Button>
            <Button
                inline
                type="default"
                bgColor="linear-gradient(278.7deg, #0578FF 5.08%, #15D5FF 108.09%)"
                color="white"
            >Gradient</Button>
        </>
    );
}
```
