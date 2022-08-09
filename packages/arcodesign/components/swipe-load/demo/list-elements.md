## 传入多个元素 不推荐使用 @en{Input multiple elements(Not recommended)}

#### 3

```js
import { SwipeLoad, Toast } from '@arco-design/mobile-react';
export default function SwipeLoadDemo() {
    return (
        <SwipeLoad
            onConfirm={() => {
                Toast.toast('linking into another page...');
            }}
            maxElementOffset={54.5}
            minConfirmOffset={25}
            bounceWhenBumpBoundary
        >
            {[1, 2, 3, 4, 5].map(item => {
                return (
                    <div
                        key={item}
                        className="list-item-color"
                        style={{ minWidth: 96 }}
                    />
                );
            })}
        </SwipeLoad>
    );
}
```
