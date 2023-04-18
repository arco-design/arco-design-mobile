## 标题样式 @en{Title Style}

#### 2

```js
import { Picker, Cell } from '@arco-design/mobile-react';

export default function PickerDemo() {
    const [visible, setVisible] = React.useState(false);
    const pickerRef = React.useRef();

    const data = [{
        label: 'Beijing',
        value: 'Beijing',
        children: [{
            label: 'Beijing',
            value: 'Beijing',
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
                    label: 'Shenbei New',
                    value: 'Shenbei New'
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
            children: [{
                label: 'Wuhua',
                value: 'Wuhua'
            }, {
                label: 'Guandu',
                value: 'Guandu'
            }, {
                label: 'Chenggong',
                value: 'Chenggong'
            }]
        }]
    },
    ];


    return (
        <>
            <Cell.Group bordered={false}>
                <Cell
                    label="Title style"
                    showArrow
                    onClick={() => {setVisible(true);}}
                />
            </Cell.Group>
            <Picker
                ref={pickerRef}
                title="Select region"
                visible={visible}
                cascade={true}
                data={data}
                maskClosable={true}
                onHide={() => {
                    setVisible(false);
                }}
                onOk={(value) => {
                    console.log('on ok', value);
                }}
                onPickerChange={() => {
                    if (pickerRef.current) {
                        console.info('-----demo getAllColumnValues', pickerRef.current.getAllColumnValues());
                    }
                }}
                value={[]}
                cols={3}
                needBottomOffset={true}
            />
        </>
    );
}
```
