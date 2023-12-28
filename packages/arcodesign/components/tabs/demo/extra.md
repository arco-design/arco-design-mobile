## 多列+增加 @en{Multiple columns + Add}

#### 2

部分安卓机在动画和raf同时执行时会卡顿，如果是安卓机，且对滚动的时长和变化曲线无要求时，优先用原生顺滑滚动（`behavior: 'smooth'`）；当浏览器不支持原生顺滑滚动，或对上述滚动参数有要求，或滚动时机不与动画冲突时，使用raf模拟顺滑滚动。
@en{Some Android devices will freeze when animation and raf are executed at the same time. If there is no requirement for the scrolling duration and animation curve in Android devices, the native smooth scrolling (`behavior: 'smooth'`) is preferred. When the browser does not support native smooth scrolling, or requires the above scrolling parameters, or the scrolling timing does not conflict with animation, use raf to simulate smooth scrolling.}

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            defaultActiveTab={0}
            tabBarHasDivider={false}
            tabBarExtra={<div className="demo-tabs-add-extra">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <rect x="7" y="2" width="2" height="12" rx="0.5" fill="#86909C"/>
                    <rect x="14" y="7" width="2" height="12" rx="0.5" transform="rotate(90 14 7)" fill="#86909C"/>
                </svg>
            </div>}
            tabBarPadding={{ left: 22, right: 64 }}
            tabBarGutter={42}
            tabBarScrollChance="after-jump"
            autoHeight={true}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content" style={{ height: 150 }}>Content area</div>
            <div className="demo-tab-content" style={{ height: 200 }}>Content area</div>
            <div className="demo-tab-content" style={{ height: 170 }}>Content area</div>
            <div className="demo-tab-content" style={{ height: 110 }}>Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```

```less
.demo-tabs-add-extra {
    position: absolute;
    .set-prop-with-rtl(right, 0);
    top: 0;
    background: linear-gradient(270deg, #fff 66.04%, rgba(255, 255, 255, 0) 105%);
    .rem(width, 64);
    .rem(font-size, 13);
    .rem(padding-right, 14);
    .use-var(color, sub-info-font-color);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: bold;
    [dir="rtl"] & {
        justify-content: flex-start;
        transform: rotate(180deg);
    }
    .arco-theme-dark & {
        background: linear-gradient(270deg, #17171A 66.04%, rgba(#17171A, 0) 105%);
    }
}
.demo-tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rem(font-size, 15);
    .rem(height, 80);
    .use-var(color, sub-info-font-color);
}
```
