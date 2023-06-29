## 动效 @en{Animation}

#### 5

```js
import { Cell, Checkbox, Radio, Skeleton, Switch } from '@arco-design/mobile-react';

const options = [
    { label: 'gradient', value: 'gradient' },
    { label: 'breath', value: 'breath' },
];

const themes = [
    { label: 'light', value: 'light' },
    { label: 'dark', value: 'dark' },
];

export default function SkeletonDemo() {
    const [type, setType] = React.useState('gradient');
    const [theme, setTheme] = React.useState('light');
    return (
        <div className={theme}>
            <Radio.Group options={options} value={type} onChange={setType} />
            <Radio.Group
                options={themes}
                value={theme}
                onChange={setTheme}
                style={{ marginBottom: 20 }}
            />
            <Skeleton animation={type} />
        </div>
    );
}
```
