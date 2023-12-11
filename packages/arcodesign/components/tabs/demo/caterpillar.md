## 毛毛虫动效 @en{Caterpillar Animation}

#### 7.5

使用毛毛虫效果时，可以指定执行动画更改的属性，`scale`表示更改 transform: scale 值，`size`表示更改宽高值。 一般在避免border\-radius被scale拉伸的情况会使用`size`，但需注意其性能不如`scale`。
@en{When using the caterpillar effect, you can specify the properties that perform the animation, `scale` means changing the transform: scale value, `size` means changing the width and height. Generally, `size` is used to avoid border\-radius being stretched by scale, but it should be noted that its performance is not as good as `scale`.}

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
            useCaterpillar
            underlineSize={6}
            underlineThick={6}
            caterpillarMaxScale={6}
            underlineInnerStyle={{ borderRadius: 6 }}
            caterpillarProperty="size"
            tabBarPadding={22}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```


```less
.demo-tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rem(font-size, 15);
    .rem(height, 80);
    .use-var(color, sub-info-font-color);
}
```
