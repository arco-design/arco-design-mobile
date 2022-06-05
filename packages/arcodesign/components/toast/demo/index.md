## 基础用法 @en{Basic Usage}

#### 1

```js
import { Toast, Cell } from '@arco-design/mobile-react';

export default function ToastDemo() {

    function toast(func, options) {
        if (!!window.toastInstance) {
            window.toastInstance.close();
        }
        window.toastInstance = Toast[func](options);
    }

    return (
        <Cell.Group bordered={false}>
            <Cell label="Basic usage" showArrow onClick={() => {
                if (!!window.toastInstance) {
                    window.toastInstance.close();
                }
                window.toastInstance = Toast.toast('Tips');
            }} />
            <Cell label="Multiline prompt" showArrow onClick={() => toast('toast', {
                content: 'Multi-line long text prompts, wrapping when the number of characters exceeds the number of characters. Displaying too much content here is generally not recommended!',
            })} />
        </Cell.Group>
    );
}
```
