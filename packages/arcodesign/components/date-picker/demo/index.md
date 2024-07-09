## 基础样式 @en{Basic Style}

#### 1

默认可选单位为年、月、日、时、分、秒。
@en{The default optional units are year, month, day, hour, minute, and second.}
```js
import { DatePicker, Button, Cell } from '@arco-design/mobile-react';

export default function DatePickerDemo() {
    const [picker1Visible, setPicker1Visible] = React.useState(false);
    const [picker2Visible, setPicker2Visible] = React.useState(false);
    const [picker3Visible, setPicker3Visible] = React.useState(false);
    const [picker1Value, setPicker1Value] = React.useState(new Date('2020-02-21 10:10:08'.replace(/-/g, "/")).getTime());
    const [picker2Value, setPicker2Value] =  React.useState(new Date('2020-08-31 10:10:08'.replace(/-/g, "/")).getTime());
    const [picker3Value, setPicker3Value] =  React.useState(new Date('2020-02-29 10:10:08'.replace(/-/g, "/")).getTime());

    const [minTs, setMinTs] = React.useState(new Date('2020-02-28 20:20:10'.replace(/-/g, "/")).getTime());

    setTimeout(() => {
        console.log(123);
        setMinTs(new Date('2020-03-10 20:30:05'.replace(/-/g, "/")).getTime())
    }, 3000)

    return (<>
        <Cell.Group bordered={false}>
            <Cell
                showArrow
                label="Complete time format"
                onClick={() => {setPicker1Visible(true);}}
            />
            <Cell
                showArrow
                label="Select month, year and day"
                onClick={() => {setPicker2Visible(true);}}
            />
            <Cell
                showArrow
                label="Select month and day"
                onClick={() => {setPicker3Visible(true);}}
            />
            <DatePicker
                visible={picker1Visible}
                maskClosable
                disabled={false}
                minTs={new Date('2020-02-22 18:00:00'.replace(/-/g, "/")).getTime()}
                currentTs={picker1Value}
                title="year/month/day/hour/minute/second"
                onHide={() => {
                    setPicker1Visible(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change index', timestamp);
                    setPicker1Value(timestamp);
                }}
                touchToStop={true}
            />
            <DatePicker
                visible={picker2Visible}
                maskClosable
                disabled={false}
                currentTs={picker2Value}
                mode="date"
                onHide={() => {
                    setPicker2Visible(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change', timestamp);
                    setPicker2Value(timestamp);
                }}
                onOk={(timestamp, obj) => {
                    console.info('----- time onok demo date', obj, timestamp);
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
            <DatePicker
                visible={picker3Visible}
                maskClosable
                minTs={minTs}
                disabled={false}
                currentTs={picker3Value}
                mode="time"
                onHide={() => {
                    setPicker3Visible(false);
                }}
                onChange={(timestamp, obj) => {
                    console.info('---demo on change', timestamp);
                    setPicker3Value(timestamp);
                }}
                onOk={(timestamp, obj) => {
                    console.info('----- time onok demo date', obj, timestamp);
                }}
            />
        </Cell.Group>
        </>
    );
}
```
