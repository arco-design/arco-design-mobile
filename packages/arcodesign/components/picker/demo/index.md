## 基础样式 @en{Basic Style}

#### 1

```js
import { Picker, Cell } from '@arco-design/mobile-react';


export default function PickerDemo() {
    const [visible, setVisible] = React.useState(false);
    const [singleVisible, setSingleVisible] = React.useState(false);
    const [value, setValue] = React.useState(['Wednesday', 'Morning']);
    const [singleValue, setSingeValue] = React.useState(['Beijing']);
    const pickerRef = React.useRef();

    const data = React.useMemo(() => {
        return [
            [
                {label: 'Monday', value: 'Monday'},
                {label: 'Tuesday', value: 'Tuesday'},
                {label: 'Wednesday', value: 'Wednesday'},
                {label: 'Thursday', value: 'Thursday'},
                {label: 'Friday', value: 'Friday'},
                {label: 'Saturday', value: 'Saturday'},
                {label: 'Sunday', value: 'Sunday'},
            ], [
                {label: 'Morning', value: 'Morning'},
                {label: 'Afternoon', value: 'Afternoon'},
                {label: 'Evening', value: 'Evening'},
            ]
        ];
    }, []);

    const single = React.useMemo(() => {
        return [
            [
                {label: 'Hubei', value: 'Hubei'},
                {label: 'Henan', value: 'Henan'},
                {label: 'Hunan', value: 'Hunan'},
                {label: 'Beijing', value: 'Beijing'},
                {label: 'Shanghai', value: 'Shanghai'},
                {label: 'Guangdong', value: 'Guangdong'},
                {label: 'Chongqing', value: 'Chongqing'},
                {label: 'Sichuan', value: 'Sichuan'}
            ]
        ];
    }, []);

    return (
        <>
            <Cell.Group bordered={false}>
                <Cell
                    label="Multiple selection"
                    showArrow
                    onClick={() => {setVisible(true);}}
                />
                <Cell
                    label="Single selection"
                    showArrow
                    onClick={() => {setSingleVisible(true);}}
                />
            </Cell.Group>
            <Picker
                ref={pickerRef}
                visible={visible}
                cascade={false}
                data={data}
                maskClosable={true}
                onHide={(scene) => {
                    console.log('------cell status', pickerRef.current.getCellMovingStatus());
                    console.log('------demo onHide', scene);
                    setVisible(false);
                }}
                onDismiss={() => {
                    console.log('------demo onDismiss');
                }}
                onOk={(val) => {
                    console.log('------demo onOk', val);
                }}
                onPickerChange={(value) => {
                    console.info('-----demo onPickerChange', value);
                    if (pickerRef.current) {
                        console.info('-----demo getAllColumnValues', pickerRef.current.getAllColumnValues());
                    }
                }}
                onChange={(value) => {
                    console.log('------demo onChange', value);
                    setValue(value);
                }}
                value={value}
            />
            <Picker
                visible={singleVisible}
                cascade={false}
                data={single}
                maskClosable={true}
                onHide={() => {
                    setSingleVisible(false);
                }}
                value={singleValue}
            />
        </>
    );
}
```
