## 自定义标签(根据 offset 渲染) 须同时传入初始位置 @en{Custom labels (rendered according to offset) should input the initial position}

#### 2

```js
import { SwipeLoad, Toast } from '@arco-design/mobile-react';
const renderLabel = offset => {
    return (
        <div className={`mylabel-start ${Math.abs(offset) > 30 ? 'end' : ''}`} />
    );
};
export default function SwipeLoadDemo() {
    return (
        <SwipeLoad
            onConfirm={() => {
                Toast.toast('linking into another page...');
            }}
            maxElementOffset={54.5}
            minConfirmOffset={30}
            renderLabel={renderLabel}
            initPos={-100}
        >
            <div
                className="list-container"
                style={{ overflowX: 'auto' }}
            >
                <div className="course-list">
                    {[6, 7, 8, 9, 10].map(item => {
                        return (
                            <div
                                key={item}
                                className="list-item"
                                style={{ width: 96 }}
                            />
                        );
                    })}
                </div>
            </div>
        </SwipeLoad>
    );
}
```
