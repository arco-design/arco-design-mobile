## 复杂样式 @en{Complex Style}

#### 4

```js
import { Picker, Cell } from '@arco-design/mobile-react';

export default function PickerDemo() {
    const [singleValue, setSingleValue] = React.useState(['orange']);

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
            <Picker
                cascade={false}
                data={single}
                maskClosable={true}
                value={singleValue}
                onChange={val => setSingleValue(val)}
                mountOnEnter={false}
                unmountOnExit={false}
                renderLinkedContainer={(_, data) => (
                    <Cell
                        label="Complex style selection"
                        showArrow
                        bordered={false}
                    >{data[0]?.label}</Cell>
                )}
            />
        </>
    );
}
```

```less-global
.demo-picker-color {
    i {
        width: 14px;
        height: 14px;
        border-radius: 2px;
        .set-prop-with-rtl(margin-right, 8px);
    }
    i, span {
        display: inline-block;
        vertical-align: middle;
    }
}
```
