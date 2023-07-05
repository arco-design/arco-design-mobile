## 动效 @en{Animation}

#### 5

```js
import { Cell, Checkbox, Radio, Skeleton, Switch } from '@arco-design/mobile-react';

const options = [
    { label: 'gradient', value: 'gradient' },
    { label: 'breath', value: 'breath' },
];

const color = 'rgba(148, 191, 255, 20%)';

export default function SkeletonDemo() {
    const [type, setType] = React.useState('gradient');
    const [checked, setChecked] = React.useState(true);
    return (
        <div>
            <Cell.Group>
                <Cell label="show animation">
                    <Switch checked={checked} onChange={setChecked} />
                </Cell>
                {checked && (
                    <Cell label="type">
                        <Radio.Group options={options} value={type} onChange={setType} />
                    </Cell>
                )}
            </Cell.Group>
            <Skeleton
                showAnimation={checked}
                animation={type}
                animationGradientColor={color}
                backgroundColor={type === 'breath' ? color : ''}
            />
        </div>
    );
}
```
