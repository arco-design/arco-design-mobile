## 基础用法

#### 1

```js
import { Keyboard, Cell } from '@arco-design/mobile-react';
import { IconArrowDown } from '@arco-design/mobile-react/esm/icon';

export default function KeyboardDemo() {
    const [visible, setVisible] = React.useState(false);
    const [type, setType] = React.useState('number');
    const [title, setTitle] = React.useState(null);

    const close = () => {
        setVisible(false);
    };
    return (
        <>
            <Cell.Group bordered={false}>
                <Cell
                    label="弹出默认键盘"
                    showArrow
                    onClick={e => {
                        setType('number');
                        setVisible(true);
                        setTitle(null);
                    }}
                />
                <Cell
                    label="工具键盘"
                    showArrow
                    onClick={() => {
                        setType('tool');
                        setVisible(true);
                        setTitle(
                            <div
                                style={{
                                    fontSize: 13,
                                    lineHeight: '18px',
                                    color: '#86909C',
                                    marginBottom: 8,
                                    textAlign: 'center',
                                }}
                            >
                                安全信息提示
                            </div>,
                        );
                    }}
                />
                <Cell
                    label="弹出带按钮键盘"
                    showArrow
                    onClick={() => {
                        setType('confirm');
                        setVisible(true);
                        setTitle(
                            <div
                                style={{
                                    fontSize: 13,
                                    height: 20,
                                    marginBottom: 8,
                                    textAlign: 'right',
                                }}
                            >
                                <IconArrowDown onClick={close} style={{ fontSize: 20 }} />
                            </div>,
                        );
                    }}
                />
            </Cell.Group>
            <Keyboard
                type={type}
                visible={visible}
                close={close}
                needBottomOffset
                maskClosable
                preventBodyScroll={false}
                onConfirm={() => {
                    console.log('confirm');
                }}
                onDelete={() => {
                    console.log('delete');
                }}
                onChange={data => {
                    console.log(data);
                }}
                title={title}
            />
        </>
    );
}
```
