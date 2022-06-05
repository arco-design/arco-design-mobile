## iOS

#### 1

```js
import { Dialog, Cell } from '@arco-design/mobile-react';

export default function DialogDemo() {
    const [visible, setVisible] = React.useState(false);
    return (<div>
        <Cell.Group bordered={false}>
            <Cell label="Single Action Dialog" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    title: 'Dialog Title',
                    children: 'I am a single-line content of the body, center-aligned by default.',
                    platform: 'ios',
                    okText: 'I know',
                });
            }} />
            <Cell label="Single Action Dialog(Without title)" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    title: 'I am a multiline content of the body, center-aligned by default. I am a multiline content of the body, center-aligned by default.',
                    platform: 'ios',
                    okText: 'I know',
                });
            }} />
            <Cell label="Dual Action Dialog" showArrow onClick={() => {
                window.modalInstance = Dialog.confirm({
                    title: 'Dialog Title',
                    children: 'I am a multiline content of the body, center-aligned by default. I am a multiline content of the body, center-aligned by default.',
                    platform: 'ios',
                    okText: 'Primary',
                    cancelText: 'Auxiliary',
                });
            }} />
            <Cell label="Choose Dialog" showArrow onClick={() => setVisible(true)} />
        </Cell.Group>
        <Dialog
            visible={visible}
            close={() => setVisible(false)}
            platform="ios"
            title="Dialog Title"
            footer={[
                { content: 'Option 1' },
                { content: 'Option 2' },
                { content: 'Option 3' },
            ]}
        >'I am a single-line content of the body, center-aligned by default.</Dialog>
    </div>);
}
```
