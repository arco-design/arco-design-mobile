## 自定义轮播滑块宽度 @en{Custom carousel slider width}

#### 6

自定义滑块宽度时，不支持循环轮播。
@en{When customizing the slider width, circular rotation is not supported.}

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel width={300} bounceWhenNoLoop>
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg" alt="" />
        </Carousel>
    );
}
```
