## 范围选择 @en{Range Select}

#### 4

```js
import { DatePicker, Button, Cell } from '@arco-design/mobile-react';

export default function DatePickerDemo() {
    const [pickerVisible, setPickerVisible] = React.useState(false);
    const [picker1Value, setPicker1Value] = React.useState(new Date('2020-02-29 18:23:15'.replace(/-/g, "/")).getTime());
    const [picker2Value, setPicker2Value] = React.useState(new Date('2020-02-29 20:20:10'.replace(/-/g, "/")).getTime());


    return (<>
        <Cell.Group bordered={false}>
            <Cell
                showArrow
                label="Select time"
                onClick={() => {setPickerVisible(true);}}
            />
            <DatePicker
                visible={pickerVisible}
                mode={"time"}
                typeArr={['hour', 'minute', 'second']}
                valueFilter={(type, value) => {
                    if (type === 'second') {
                        return value % 5 === 0;
                    }
                    return true;
                }}
                maskClosable
                currentTs={[picker1Value, picker2Value]}
                onHide={() => {
                    setPickerVisible(false);
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
        </Cell.Group>
        </>
    );
}
```
