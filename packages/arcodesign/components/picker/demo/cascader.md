## 级联选择 @en{Cascade selection}

#### 3

```js
import { Picker, Cell } from '@arco-design/mobile-react';

export default function PickerDemo() {
    const [visible, setVisible] = React.useState(false);
    const [pickerValue, setPickerValue] = React.useState(['Beijing', 'Beijing']);
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
                    label="Choose a location"
                    showArrow
                    onClick={() => {setVisible(true);}}
                >{pickerValue.join('-')}</Cell>
            </Cell.Group>
            <Picker
                ref={pickerRef}
                visible={visible}
                cascade={true}
                data={data}
                maskClosable={true}
                hideEmptyCols={true}
                onHide={() => {
                    console.log('------cell status', pickerRef.current.getCellMovingStatus());
                    setVisible(false);
                }}
                onOk={(value) => {
                    console.log('on ok', value);
                    setPickerValue(value)
                }}
                onPickerChange={() => {
                    if (pickerRef.current) {
                        console.info('-----demo getAllColumnValues', pickerRef.current.getAllColumnValues());
                    }
                }}
                value={pickerValue}
                cols={3}
                needBottomOffset={true}
            />
        </>
    );
}
```
