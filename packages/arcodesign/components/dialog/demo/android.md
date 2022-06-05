## Android

#### 2

```js
import { Dialog, Cell } from '@arco-design/mobile-react';

export default function DialogDemo() {
    return (<div>
        <Cell.Group bordered={false}>
            <Cell label="Single Action Dialog" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    title: 'I am a single-line content of the body, left-aligned by default.',
                    okText: 'I know',
                    platform: 'android',
                });
            }} />
            <Cell label="Single Action Dialog (with title)" showArrow onClick={() => {
                window.modalInstance = Dialog.alert({
                    title: 'Dialog title',
                    children: 'I am text with multi-line content of the body, center-aligned by default.I am text with multi-line content  of the body, center-aligned by default.I am text with multi-line content  of the body, center-aligned by default.',
                    platform: 'android',
                    okText: 'I know',
                });
            }} />
            <Cell label="Dual Action Dialog" showArrow onClick={() => {
                window.modalInstance = Dialog.confirm({
                    title: 'Dialog title',
                    children: 'I am text with multi-line content of the body, center-aligned by default. I am text with multi-line content of the body, center-aligned by default. I am text with multi-line content of the body, center-aligned by default.',
                    platform: 'android',
                    okText: 'Turn on',
                    cancelText: 'Turn off',
                });
            }} />
        </Cell.Group>
    </div>);
}
```
