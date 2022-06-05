## 复杂样式 @en{Complex Style}

#### 4

```js
import { Picker, Cell } from '@arco-design/mobile-react';


export default function PickerDemo() {
    const [singleVisible, setSingleVisible] = React.useState(false);
    const [singleValue, setSingeValue] = React.useState(['orange']);

    const single = React.useMemo(() => {
        return [
            [
                {label: <span className="demo-picker-color"><i style={{ background: 'grey' }} /><span>Grey</span></span>, value: 'grey'},
                {label: <span className="demo-picker-color"><i style={{ background: 'red' }} /><span>Red</span></span>, value: 'red'},
                {label: <span className="demo-picker-color"><i style={{ background: 'orange' }} /><span>Orange</span></span>, value: 'orange'},
                {label: <span className="demo-picker-color"><i style={{ background: 'yellow' }} /><span>Yellow</span></span>, value: 'yellow'},
                {label: <span className="demo-picker-color"><i style={{ background: 'green' }} /><span>Green</span></span>, value: 'green'},
                {label: <span className="demo-picker-color"><i style={{ background: 'cyan' }} /><span>Cyan</span></span>, value: 'cyan'},
                {label: <span className="demo-picker-color"><i style={{ background: 'blue' }} /><span>Blue</span></span>, value: 'blue'},
                {label: <span className="demo-picker-color"><i style={{ background: 'purple' }} /><span>Purple</span></span>, value: 'purple'},
                {label: <span className="demo-picker-color"><i style={{ background: 'black' }} /><span>Black</span></span>, value: 'black'},
            ]
        ];
    }, []);

    return (
        <>
            <Cell
                label="Complex style selection"
                showArrow
                onClick={() => {setSingleVisible(true);}}
                bordered={false}
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
