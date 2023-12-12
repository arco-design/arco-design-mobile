## 自定义索引器展示 @en{Custom Indicator}

#### 5

可通过`renderIndicator`属性实现自定义轮播索引。
@en{The custom carousel indicator can be implemented through the `renderIndicator`.}

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel
            indicatorPos="end"
            loop
            autoPlay={false}
            renderIndicator={(current, total) =>
                <span
                    className="radius-num-indicator"
                >{current + 1}/{total}</span>
        }>
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg" alt="" />
        </Carousel>
    );
}
```

```less
.radius-num-indicator {
    display: inline-block;
    background: rgba(0, 0, 0, 0.3);
    .rem(border-radius, 20);
    .rem(font-size, 12);
    .rem(padding, 2, 6);
    .rem(margin-right, -8);
    .rem(margin-bottom, -4);
    color: #ffffff;
}
```
