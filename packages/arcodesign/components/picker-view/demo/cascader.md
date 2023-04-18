## 级联选择器视图 @en{Cascading PickerView}

#### 2

```js
import { PickerView } from '@arco-design/mobile-react';

export default function PickerViewDemo() {
    const [value, setValue] = React.useState(['Beijing', 'Beijing', 'Haidian']);
    const data = [{
        label: 'Beijing',
        value: 'Beijing',
        children: [{
            label: 'Beijing',
            value: 'Beijing',
            children: [{
                label: 'Chaoyang',
                value: 'Chaoyang'
                },
                {
                    label: 'Haidian',
                    value: 'Haidian'
                },
                {
                    label: 'Dongcheng',
                    value: 'Dongcheng'
                },
                {
                    label: 'Xicheng',
                    value: 'Xicheng'
                }
            ]
        }]
    }
    , {
        label: 'Liaoning',
        value: 'Liaoning',
        children: [{
            label: 'Shenyang',
            value: 'Shenyang',
            children: [{
                    label: 'Shenhe',
                    value: 'Shenhe'
                },
                {
                    label: 'Hunnan',
                    value: 'Hunnan'
                },
                {
                    label: 'Shenbei',
                    value: 'Shenbei'
                }
            ]
        }, {
            label: 'Benxi',
            value: 'Benxi',
            children: [{
                    label: 'Xihu',
                    value: 'Xihu'
                },
                {
                    label: 'Dongming',
                    value: 'Dongming'
                },
                {
                    label: 'Huanren',
                    value: 'Huanren'
                }
            ]
        }]
    }, {
        label: 'Yunnan',
        value: 'Yunnan',
        children: [{
            label: 'Kunming',
            value: 'Kunming',
        }]
    },
    ];

    return (
        <PickerView
            cascade={true}
            data={data}
            value={value}
            cols={3}
            onPickerChange={(value, index, data) => {
                console.log('value: ' + value, index, data);
                setValue(value);
            }}
        />
    );
}
```
