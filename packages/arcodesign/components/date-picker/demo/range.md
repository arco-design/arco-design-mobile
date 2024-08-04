## 范围选择 @en{Range Select}

#### 4

```js
import { DatePicker, Button, Cell } from '@arco-design/mobile-react';

export default function DatePickerDemo() {
    const [pickerVisible1, setPickerVisible1] = React.useState(false);
    const [pickerVisible2, setPickerVisible2] = React.useState(false);
    const [picker1Value, setPicker1Value] = React.useState(new Date('2020-02-29 18:23:15'.replace(/-/g, "/")).getTime());
    const [picker2Value, setPicker2Value] = React.useState(new Date('2020-02-29 20:20:10'.replace(/-/g, "/")).getTime());
    const [picker3Value, setPicker3Value] = React.useState(new Date('2020-02-29 18:23:15'.replace(/-/g, "/")).getTime());
    const [picker4Value, setPicker4Value] = React.useState(new Date('2020-02-29 20:20:10'.replace(/-/g, "/")).getTime());

    return (<>
        <Cell.Group bordered={false}>
            <Cell
                showArrow
                label="Select time range"
                onClick={() => {setPickerVisible1(true);}}
            />
            <Cell
                showArrow
                label="Select date range"
                onClick={() => {setPickerVisible2(true);}}
            />
            <DatePicker
                visible={pickerVisible1}
                mode={"time"}
                maskClosable
                currentTs={[picker1Value, picker2Value]}
                onHide={() => {
                    setPickerVisible1(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change index', timestamp);
                    setPicker1Value(timestamp[0]);
                    setPicker2Value(timestamp[1]);
                }}
                formatter={(value, type) => {
                    if (type === 'hour') {
                        return `${value}时`;
                    } else if (type === 'minute') {
                        return `${value}分`;
                    } else if (type === 'second') {
                        return `${value}秒`;
                    }
                }}
            />
            <DatePicker
                visible={pickerVisible2}
                mode={"date"}
                maskClosable
                currentTs={[picker3Value, picker4Value]}
                onHide={() => {
                    setPickerVisible2(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change index', timestamp);
                    setPicker3Value(timestamp[0]);
                    setPicker4Value(timestamp[1]);
                }}
                formatter={(value, type) => {
                    if (type === 'year') {
                        return `${value}年`;
                    } else if (type === 'month') {
                        return `${value}月`;
                    } else if (type === 'date') {
                        return `${value}日`;
                    }
                }}
            />
        </Cell.Group>
        </>
    );
}
```
