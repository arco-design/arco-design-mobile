## 传入单个滚动元素 @en{Input a single scroll element}

#### 1

```js
import { SwipeLoad, Toast } from '@arco-design/mobile-react';
import './index.less';

export default function SwipeLoadDemo() {
    return (
        <SwipeLoad
            onConfirm={() => {
                Toast.toast('linking into another page...');
            }}
            maxElementOffset={54.5}
            maxLabelOffset={38.5}
            minConfirmOffset={25}
        >
            <div
                className="list-container"
                style={{ overflowX: 'auto' }}
            >
                <div className="course-list">
                    {[1, 2, 3, 4, 5].map(item => {
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

```less
.list-container {
    width: 100%;
    .use-var(background, line-color);
    &::-webkit-scrollbar {
        display: none;
    }
}
.course-list {
    display: inline-flex;
    align-items: flex-start;
    padding: 12px 0;
}
.list-item {
    height: 72px;
    margin-right: 10px;
    .use-var(background, background-color);
}
```
