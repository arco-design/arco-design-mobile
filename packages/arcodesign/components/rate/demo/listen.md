## 监听事件(点击切换弹出toast) @en{Listen Events (pop up toast when clicking to toggle)}

#### 9

```js
import { Rate, Toast } from '@arco-design/mobile-react';
export default function BaseRateDemo8() {
    function toast(func, options) {
        if (!!window.toastInstance) {
            window.toastInstance.close();
        }
        window.toastInstance = Toast[func](options);
    }
    return (
        <Rate
            defaultValue={3}
            step={2}
            allowHalf
            onChange={(val) => toast('success', {content: val})}
        />
    );
}
```
