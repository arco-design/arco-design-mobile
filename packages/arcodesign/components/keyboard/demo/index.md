## 组件示例 1

#### 1

```js
import { Keyboard, Cell } from '@arco-design/mobile-react';

export default function KeyboardDemo() {
    const [visible, setVisible] = React.useState(false);
    const [type, setType] = React.useState('number');
    return (
        <>
            <Cell.Group bordered={false}>
                <Cell
                    label="number"
                    showArrow
                    onClick={e => {
                        setType('number');
                        setVisible(true);
                    }}
                />
                <Cell
                    label="tool"
                    showArrow
                    onClick={() => {
                        setType('tool');
                        setVisible(true);
                    }}
                />
                <Cell
                    label="confirm"
                    showArrow
                    onClick={() => {
                        setType('confirm');
                        setVisible(true);
                    }}
                />
            </Cell.Group>
            <Keyboard
                type={type}
                visible={visible}
                close={() => {
                    setVisible(false);
                }}
                maskClosable
                preventBodyScroll={false}
                // onClose={() => {
                //     alert('close');
                // }}
                // onOpen={() => {
                //     alert('open');
                // }}
                // onMaskClick={() => {
                //     alert('mask click');
                // }}
                onConfirm={() => {
                    console.log('confirm');
                }}
                onDelete={() => {
                    console.log('delete');
                }}
                onChange={(data) => {
                    console.log(data);
                }}
            />
        </>
    );
}
```
