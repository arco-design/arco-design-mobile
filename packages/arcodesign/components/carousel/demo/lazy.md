## 懒加载 @en{Lazy loading}

#### 2

```js
import { Carousel } from '@arco-design/mobile-react';

export default function CarouselDemo() {
    return (
        <Carousel indicatorType="circle" lazyloadCount={1}>
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg" alt="" />
            <img src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg" alt="" />
        </Carousel>
    );
}
```
