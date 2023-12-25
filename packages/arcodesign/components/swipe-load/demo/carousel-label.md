## 联动 carousel @en{Use with carousel}

#### 5

```js
import { SwipeLoad, Carousel, Toast } from '@arco-design/mobile-react';

const renderLabel = () => {
    return (
        <div
            className="mylabel-start"
            style={{ height: 120 }}
        />
    );
};
export default function SwipeLoadDemo() {
    return (
        <Carousel loop={false} lazyloadCount={1}>
            <div style={{ height: 120, backgroundColor: '#94BFFF' }} />
            <div style={{ height: 120, backgroundColor: '#BEDAFF' }} />
            <SwipeLoad
                onConfirm={() => {
                    Toast.toast('linking into another page...');
                }}
                maxElementOffset={54.5}
                maxLabelOffset={40}
                minConfirmOffset={25}
                renderLabel={renderLabel}
                initPos={-100}
            >
                <div
                    style={{
                        height: 120,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            height: 120,
                            width: '150%',
                            backgroundColor: '#FFCF8B',
                        }}
                    ></div>
                </div>
            </SwipeLoad>
        </Carousel>
    );
}
```

```less
.mylabel-start {
    width: 100px;
    height: 96px;
    transition: background 0.2s;
    .use-var(background, background-color);

    &.end {
        .use-var(background, line-color);
    }
}
```
