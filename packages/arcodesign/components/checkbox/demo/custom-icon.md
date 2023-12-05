## 自定义图标 @en{Custom Icon}

#### 9

```js
import { Checkbox } from '@arco-design/mobile-react';
import IconCheck from '@arco-design/mobile-react/esm/icon/IconCheck';
import IconSquareChecked from '@arco-design/mobile-react/esm/icon/IconSquareChecked';
import IconSquareUnchecked from '@arco-design/mobile-react/esm/icon/IconSquareUnchecked';
import IconSquareDisabled from '@arco-design/mobile-react/esm/icon/IconSquareDisabled';
import './index.less';

export default function CheckboxDemo() {
    const checkIcon = {
        normal: <IconCheck />,
        active: <IconCheck />,
        disabled: <IconCheck />,
        activeDisabled: <IconCheck />,
    };
    const squareIcon = {
        normal: <IconSquareUnchecked />,
        active: <IconSquareChecked />,
        disabled: <IconSquareDisabled />,
        activeDisabled: <IconSquareChecked />,
    }
    return (
        <>
            <div style={{marginBottom: 16}}>
                <Checkbox
                    value={1}
                    defaultCheck={true}
                    style={{width: '50%'}}
                    icons={squareIcon}
                >Custom shape</Checkbox>
                <Checkbox
                    value={2}
                    defaultCheck={true}
                    style={{width: '50%'}}
                    className="custom-color"
                >Custom color</Checkbox>
            </div>
            <div>
                <Checkbox
                    value={3}
                    defaultCheck={true}
                    className="custom-size"
                    style={{width: '50%'}}
                >Custom size</Checkbox>
                <Checkbox
                    value={1}
                    defaultCheck={false}
                    style={{width: '50%'}}
                    icons={checkIcon}
                >Custom icon</Checkbox>
            </div>
        </>
    );
}
```

```less
.custom-color {
    .checkbox-icon {
        color: #FF5722;
    }
}
.custom-size {
    .checkbox-icon {
        svg {
            width: 20px;
            height: 20px;
        }
    }
}
```

