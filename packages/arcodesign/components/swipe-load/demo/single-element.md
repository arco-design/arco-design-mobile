## 传入单个普通元素 @en{Input a single normal element}

#### 4

```js
import { SwipeLoad, Toast } from '@arco-design/mobile-react';

const renderLabel = offset => {
    return (
        <div className="mylabel-single" />
    );
};
export default function SwipeLoadDemo() {
    return (
        <SwipeLoad
            onConfirm={() => {
                Toast.toast('linking into another page...');
            }}
            maxElementOffset={54.5}
            minConfirmOffset={25}
            renderLabel={renderLabel}
            initPos={-100}
        >
            <div className="single-element" />
        </SwipeLoad>
    );
}
```

```less
.mylabel-single {
    width: 100px;
    height: 88px;
    .use-var(background, primary-disabled-color);
}

.single-element {
    height: 88px;
    .use-var(background, primary-disabled-color);
}
```
