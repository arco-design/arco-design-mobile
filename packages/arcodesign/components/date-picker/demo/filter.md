## 选项过滤 @en{Option Filtering}

#### 3

```js
import { DatePicker, Button, Cell } from '@arco-design/mobile-react';

export default function DatePickerDemo() {
    const [picker1Visible, setPicker1Visible] = React.useState(false);
    const [picker1Value, setPicker1Value] = React.useState(new Date('2020-02-29 10:10:08'.replace(/-/g, "/")).getTime());


    return (<>
        <Cell.Group bordered={false}>
            <Cell
                showArrow
                label="Select time"
                onClick={() => {setPicker1Visible(true);}}
            />
            <DatePicker
                visible={picker1Visible}
                mode={"time"}
                typeArr={['hour', 'minute', 'second']}
                valueFilter={(type, value) => {
                    if (type === 'second') {
                        return value % 5 === 0;
                    }
                    return true;
                }}
                maskClosable
                disabled={false}
                currentTs={picker1Value}
                onHide={() => {
                    setPicker1Visible(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change index', timestamp);
                    setPicker1Value(timestamp);
                }}
            />
        </Cell.Group>
        </>
    );
}
```
